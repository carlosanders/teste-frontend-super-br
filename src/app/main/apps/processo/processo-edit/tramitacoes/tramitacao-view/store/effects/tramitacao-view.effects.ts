import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, tap} from 'rxjs/operators';

import * as TramitacaoViewActions from '../actions/tramitacao-view.actions';

import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';

@Injectable()
export class TramitacaoViewEffect {
    routerState: any;

    /**
     * Set imprimirGuiaTramitacao
     *
     * @type {Observable<any>}
     */
    imprimirGuiaTramitacao: any = createEffect(() => this._actions.pipe(
        ofType<TramitacaoViewActions.GetGuiaTramitacao>(TramitacaoViewActions.GET_GUIA_TRAMITACAO),
        switchMap(() => {
            let handle = {
                id: '',
                value: ''
            };
            const routeParams = of('tramitacaoHandle');
            routeParams.subscribe((param) => {
                if (this.routerState.params[param]) {
                    handle = {
                        id: param,
                        value: this.routerState.params[param]
                    };
                }
            });

            return this._tramitacaoService.imprimirGuia(handle.value);
        }),
        tap((response) => {
            this._store.dispatch(new TramitacaoViewActions.GetGuiaTramitacaoSuccess({
                loaded: {
                    id: 'tramitacaoHandle',
                    value: this.routerState.params.tramitacaoHandle,
                    componenteDigital: response
                }
            }));
        }),
        catchError((err) => {
            console.log(err);
            return of(new TramitacaoViewActions.GetGuiaTramitacaoFailed(err));
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _tramitacaoService: TramitacaoService,
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
