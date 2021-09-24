import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, tap} from 'rxjs/operators';

import * as ProcessoEtiquetaViewActions from '../actions/processo-etiqueta-view.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';

@Injectable()
export class ProcessoEtiquetaViewEffect {
    routerState: any;
    /**
     * Set imprimirProcessoEtiqueta
     *
     * @type {Observable<any>}
     */
    imprimirProcessoEtiqueta: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoEtiquetaViewActions.GetProcessoEtiqueta>(ProcessoEtiquetaViewActions.GET_PROCESSO_ETIQUETA),
        switchMap(() => {
            let handle = {
                id: '',
                value: ''
            };
            const routeParams = of('processoHandle');
            routeParams.subscribe((param) => {
                if (this.routerState.params[param]) {
                    handle = {
                        id: param,
                        value: this.routerState.params[param]
                    };
                }
            });

            return this._processoService.imprimirEtiqueta(handle.value);
        }),
        tap((response) => {
            this._store.dispatch(new ProcessoEtiquetaViewActions.GetProcessoEtiquetaSuccess({
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle,
                    componenteDigital: response
                }
            }));
        }),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoEtiquetaViewActions.GetProcessoEtiquetaFailed(err));
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
