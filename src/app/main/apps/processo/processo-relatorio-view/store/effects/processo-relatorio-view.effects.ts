import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, tap} from 'rxjs/operators';

import * as ProcessoRelatorioViewActions from '../actions/processo-relatorio-view.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {HttpParams} from "@angular/common/http";

@Injectable()
export class ProcessoRelatorioViewEffect {
    routerState: any;

    /**
     * Get metadadosProcessoRelatorio
     *
     * @type {Observable<any>}
     */
    getMetadadosProcessoRelatorio: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoRelatorioViewActions.GetMetadadosProcessoRelatorio>(ProcessoRelatorioViewActions.GET_METADADOS_PROCESSO_RELATORIO),
        tap((response) => {
            this._store.dispatch(new ProcessoRelatorioViewActions.GetMetadadosProcessoRelatorioSuccess({
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle,
                    componenteDigital: response
                }
            }));
        }),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoRelatorioViewActions.GetMetadadosProcessoRelatorioFailed(err));
        })
    ), {dispatch: false});

    /**
     * Set imprimirProcessoRelatorio
     *
     * @type {Observable<any>}
     */
    imprimirProcessoRelatorio: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoRelatorioViewActions.GetProcessoRelatorio>(ProcessoRelatorioViewActions.GET_PROCESSO_RELATORIO),
        switchMap(action => {
            let handle = {
                id: '',
                value: '',
                metadados: {},
            };
            const routeParams = of('processoHandle');
            routeParams.subscribe((param) => {
                if (this.routerState.params[param]) {
                    handle = {
                        id: param,
                        value: this.routerState.params[param],
                        metadados: action.payload,
                    };
                }
            });

            return this._processoService.imprimirRelatorio(handle.value, JSON.stringify(handle.metadados));
        }),
        tap((response) => {
            this._store.dispatch(new ProcessoRelatorioViewActions.GetProcessoRelatorioSuccess({
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle,
                    componenteDigital: response
                }
            }));
        }),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoRelatorioViewActions.GetProcessoRelatorioFailed(err));
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
