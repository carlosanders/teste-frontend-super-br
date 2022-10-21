import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
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
        const loadedValue = [this.routerState.params['generoHandle'], this.routerState.params['typeHandle'], this.routerState.params['targetHandle']].join('_');
        return this._store.pipe(
            select(fromStore.getLoaded),
            withLatestFrom(this._store.pipe(select(tarefaStore.getSelectedTarefas))),
            tap(([loaded, tarefas]) => {
                if (loaded !== loadedValue && tarefas?.length) {
                    const params = {
                        limit: 10,
                        offset: 0,
                        filter: {
                            'documentoRemessa.tarefaOrigem.id': `in:${tarefas.map((tarefa) => tarefa.id).join(',')}`,
                            'documentoRemessa.juntadaAtual': 'isNull',
                            'dataHoraRemessa': 'isNull',
                        },
                        populate: [
                            'populateAll',
                            'documentoRemessa.tarefaOrigem'
                        ],
                        sort: {
                            'criadoEm': 'ASC'
                        }
                    };

                    this._store.dispatch(new fromStore.GetOficios(params));
                }
            }),
            filter(([loaded, tarefas]) => loaded === loadedValue && tarefas?.length),
            take(1)
        );
    }
}
