import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import * as fromStore from 'app/main/apps/processo/processo-edit/juntadas/desentranhamento-create-bloco/store';
import {getRouterState} from 'app/store/reducers';
import {getJuntadaListLoaded} from 'app/main/apps/processo/processo-edit/juntadas/desentranhamento-create-bloco/store/selectors';
import {DesentranhamentoCreateBlocoAppState} from '../reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<DesentranhamentoCreateBlocoAppState>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getJuntadas().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Juntadas
     *
     * @returns
     */
    getJuntadas(): any {
        return this._store.pipe(
            select(getJuntadaListLoaded),
            tap((loaded: any) => {
                let processoId = null;

                const routeParams = of('processoHandle');
                routeParams.subscribe((param) => {
                    processoId = `eq:${this.routerState.params[param]}`;
                });

                const params = {
                    filter: {
                        'volume.processo.id': processoId,
                        'ativo': 'eq:1'
                    },
                    gridFilter: {},
                    limit: 10,
                    offset: 0,
                    sort: {numeracaoSequencial: 'DESC'},
                    populate: [
                        'volume',
                        'volume.processo',
                        'documento',
                        'documento.tipoDocumento'
                    ]
                };

                this._store.dispatch(new fromStore.GetJuntadas(params));
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}
