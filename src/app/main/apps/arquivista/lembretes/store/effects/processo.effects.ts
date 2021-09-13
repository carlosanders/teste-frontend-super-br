import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {AddData} from '@cdk/ngrx-normalizr';

import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from '../../../../../auth/login/login.service';

import {getRouterState, State} from '../../../../../../store';
import * as ProcessoActions from '../actions/processo.actions';

@Injectable()
export class ProcessoEffects {
    routerState: any;
    setorAtual: number;
    /**
     * Get Processos with router parameters
     *
     * @type {Observable<any>}
     */
    getProcessos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.GetProcessos>(ProcessoActions.GET_PROCESSOS),
        switchMap(action => this._processoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.listFilter,
                ...action.payload.etiquetaFilter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate))),
        mergeMap(response => [
            new AddData<Processo>({data: response['entities'], schema: processoSchema}),
            new ProcessoActions.GetProcessosSuccess({
                entitiesId: response['entities'].map(processo => processo.id),
                loaded: {
                    id: 'unidadeHandle_typeHandle',
                    value: this.routerState.params.unidadeHandle + '_' +
                        this.routerState.params.typeHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoActions.GetProcessosFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _processoService: ProcessoService,
        private _loginService: LoginService,
        private _router: Router
    ) {
        this.initRouterState();
        this.setorAtual = this._loginService.getUserProfile().colaborador.lotacoes[0].setor.id;
    }

    initRouterState(): void {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
