import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {ComponenteDigitalAppState, ComponenteDigitalState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getComponenteDigitalState} from '../';
import {getDocumento} from '../../../store';
import * as DocumentoActions from '../../../store/actions/documento.actions';

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;

    /**
     *
     * @param _store
     * @param _router
     * @param _activatedRoute
     */
    constructor(
        private _store: Store<ComponenteDigitalAppState>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
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
        if (this.getRouterDefault(route)) {
            return this.getComponenteDigital().pipe(
                switchMap(() => of(true)),
                catchError((err) => {
                    console.log(err);
                    return of(false);
                })
            );
        }
    }

    /**
     * Get ComponenteDigital
     *
     * @returns
     */
    getComponenteDigital(): any {
        if (Number(this.routerState.params['componenteDigitalHandle']) === 0) {
            return of(true);
        } else {
            return this._store.pipe(
                select(getComponenteDigitalState),
                tap((state: ComponenteDigitalState) => {
                    if (!state.loading && (state.componenteDigitalId !== this.routerState.params['componenteDigitalHandle'])) {
                        this._store.dispatch(new fromStore.DownloadComponenteDigital());
                    }
                }),
                filter((state: ComponenteDigitalState) => state.componenteDigitalId === this.routerState.params['componenteDigitalHandle']),
                take(1)
            );
        }
    }

    getRouterDefault(route: ActivatedRouteSnapshot): boolean {
        if (route.params['componenteDigitalHandle'] === 'default') {
            this._store.pipe(
                select(getDocumento),
                take(1)
            ).subscribe((documento) => {
                let primary: string;
                primary = 'componente-digital/';
                const componenteDigital = documento.componentesDigitais[0];
                primary += componenteDigital?.id;
                const stepHandle = route.params['stepHandle'];
                this._router.navigate([
                    'apps/tarefas/' + route.params.generoHandle + '/' + route.params.typeHandle + '/'
                    + route.params.targetHandle + '/tarefa/' + route.params['tarefaHandle'] + '/processo/'
                    + route.params['processoHandle'] + '/visualizar/' + stepHandle + '/documento/' + documento.id,
                    {
                        outlets: {
                            primary: primary
                        }
                    }
                ]).then(() => {
                    this._store.dispatch(new DocumentoActions.SetCurrentStep({
                        id: componenteDigital.id,
                        editavel: (documento.documentoAvulsoRemessa && !documento.documentoAvulsoRemessa.dataHoraRemessa) || documento.minuta
                    }));
                });
            });
            return false;
        }
        return true;
    }
}
