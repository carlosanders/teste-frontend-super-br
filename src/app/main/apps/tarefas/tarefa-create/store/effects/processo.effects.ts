import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoActions from '../actions/processo.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Colaborador, Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';

@Injectable()
export class ProcessoEffect {
    routerState: any;
    /**
     * Get Processo with router parameters
     *
     * @type {Observable<any>}
     */
    getProcesso: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.GetProcesso>(ProcessoActions.GET_PROCESSO),
        switchMap(action => this._processoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll',
                'especieProcesso', 'especieProcesso.generoProcesso',
                'especieProcesso.vinculacoesEspecieProcessoWorkflow', 'setorAtual', 'setorAtual.unidade', 'especieProcesso.vinculacoesEspecieProcessoWorkflow.workflow'
            ]))),
        switchMap(response => [
            new AddData<Processo>({data: response['entities'], schema: processoSchema}),
            new ProcessoActions.GetProcessoSuccess({
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                processoId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoActions.GetProcessoFailed(err));
        })
    ));
    /**
     * Get Visibilidades with router parameters
     *
     * @type {Observable<any>}
     */
    getVisibilidades: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.GetVisibilidades>(ProcessoActions.GET_VISIBILIDADES_PROCESSO_TAREFA),
        switchMap(action => this._processoService.getVisibilidade(action.payload)),
        tap((action) => {
            action.restricaoProcesso = action[0].label !== 'TODOS OS USUÁRIOS';
        }),
        mergeMap(response => [
            new ProcessoActions.GetVisibilidadesSuccess({
                restricaoProcesso: response.restricaoProcesso
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoActions.GetVisibilidadesFailed(err));
        })
    ));
    private _profile: Colaborador;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        public _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._profile = _loginService.getUserProfile().colaborador;
    }
}
