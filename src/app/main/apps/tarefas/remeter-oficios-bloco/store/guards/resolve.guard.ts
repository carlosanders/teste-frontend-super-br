import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {combineLatest, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {getTarefaGroup} from '../../store';
import * as fromStore from '../../store';
import * as tarefaStore from '../../../store';
import {getRouterState, RouterStateUrl} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: RouterStateUrl;

    constructor(
        private _store: Store<fromStore.RemeterOficiosBlocoAppState>,
        private _loginService: LoginService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    checkStore(): any {
        return combineLatest([
            this._store.pipe(select(tarefaStore.getSelectedTarefas)),
            this._store.pipe(select(fromStore.getAnyLoading)),
            this._store.pipe(select(fromStore.getAllLoaded)),
            this._store.pipe(select(fromStore.getTarefaGroup)),
        ]).pipe(
            tap(([tarefas, loading, loaded, tarefasGroup]) => {
                if (tarefas.length && !loading && !loaded && Object.values(tarefasGroup).length === 0) {
                    tarefas
                        .sort((a, b) => a.processo.id < b.processo.id ? -1 : a.processo.id > b.processo.id ? 1 : 0)
                        .forEach((tarefa) => this._store.dispatch(new fromStore.GetOficios({
                                tarefa: tarefa,
                                more: true,
                                pagination: {
                                    limit: 10,
                                    offset: 0,
                                    filter: {
                                        'documentoRemessa.tarefaOrigem.id': `eq:${tarefa.id}`,
                                        'documentoRemessa.juntadaAtual': 'isNull',
                                        'dataHoraRemessa': 'isNull',
                                    },
                                    populate: [
                                        'populateAll',
                                        'documentoRemessa.tipoDocumento',
                                        'documentoRemessa.tarefaOrigem',
                                    ],
                                    sort: {
                                        'criadoEm': 'ASC'
                                    }
                                }
                            }))
                        );
                }
            }),
            filter(([, loading, loaded,]) => !loading && loaded),
            take(1)
        );
    }
}
