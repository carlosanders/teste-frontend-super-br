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
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@cdk/angular/material';

@Injectable()
export class ResolveGuard implements CanActivate {
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    routerState: any;

    /**
     *
     * @param _store
     * @param _router
     * @param _activatedRoute
     * @param snackBar
     */
    constructor(
        private _store: Store<ComponenteDigitalAppState>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar
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
                switchMap((retorno: any) => {
                    if (!retorno.errors) {
                        return of(true)
                    } else {
                        if (retorno.errors.status === 422) {
                            const error = (retorno.errors.error.message || retorno.errors.statusText || 'Erro desconhecido!').replace('Unknown Error', 'Erro Desconhecido!');
                            this.snackBar.open(error, 'Fechar', {
                                horizontalPosition: this.horizontalPosition,
                                verticalPosition: this.verticalPosition,
                                panelClass: ['danger-snackbar'],
                                duration: 30000
                            });
                        }
                        this._store.dispatch(new fromStore.UnloadComponenteDigital());
                        this._store.dispatch(new DocumentoActions.UnloadDocumento());
                        return of(false);
                    }
                }),
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
                    if (!state.errors && !state.loading && (state.componenteDigitalId !== parseInt(this.routerState.params['componenteDigitalHandle'], 10))) {
                        this._store.dispatch(new fromStore.DownloadComponenteDigital());
                    }
                }),
                filter((state: ComponenteDigitalState) => !state.loading && (state.componenteDigitalId === parseInt(this.routerState.params['componenteDigitalHandle'], 10) || state.errors)),
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
