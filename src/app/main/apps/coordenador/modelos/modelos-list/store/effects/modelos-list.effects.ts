import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ModeloListActions from '../actions';

import {ModeloService} from '@cdk/services/modelo.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Modelo} from '@cdk/models/modelo.model';
import {modelo as modeloSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class ModelosListEffect {
    routerState: any;
    id: string;
    value: string;
    /**
     * Get Modelos with router parameters
     *
     * @type {Observable<any>}
     */
    getModelos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ModeloListActions.GetModelos>(ModeloListActions.GET_MODELOS),
        switchMap((action) => {
            const filters = {
                ...action.payload.filter,
                ...action.payload.gridFilter,
            };
            let mode = 'query';
            if (JSON.stringify(filters).indexOf('componentesDigitais.conteudo') > -1) {
                mode = 'search';
            }
            return this._modeloService[`${mode}`](
                JSON.stringify(filters),
                action.payload.limit,
                action.payload.offset,
                JSON.stringify(action.payload.sort),
                JSON.stringify(action.payload.populate),
                JSON.stringify(action.payload.context));
        }),
        mergeMap(response => [
            new AddData<Modelo>({data: response['entities'], schema: modeloSchema}),
            new ModeloListActions.GetModelosSuccess({
                entitiesId: response['entities'].map(modelo => modelo.id),
                loaded: {
                    id: this.id,
                    value: this.value
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ModeloListActions.GetModelosFailed(err));
        })
    ));
    /**
     * Delete Modelo
     *
     * @type {Observable<any>}
     */
    deleteModelo: Observable<ModeloListActions.ModelosListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<ModeloListActions.DeleteModelo>(ModeloListActions.DELETE_MODELO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'modelo',
            content: 'Apagando o modelo id ' + action.payload.modeloId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._modeloService.destroy(action.payload.modeloId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'modelo',
                    content: 'Modelo id ' + action.payload.modeloId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Modelo>({
                    id: response.id,
                    schema: modeloSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new ModeloListActions.DeleteModeloSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.modeloId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'modelo',
                    content: 'Erro ao apagar o modelo id ' + action.payload.modeloId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new ModeloListActions.DeleteModeloFailed(payload));
            })
        ), 25)
    ));
    /**
     * Save Modelo
     *
     * @type {Observable<any>}
     */
    saveModelo: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ModeloListActions.SaveModelo>(ModeloListActions.SAVE_MODELO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'modelo',
            content: 'Editando o modelo id ' + action.payload.modelo.id + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        switchMap(action => this._modeloService.save(action.payload.modelo).pipe(
            tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'modelo',
                content: 'Modelo id ' + action.payload.modelo.id + ' editado com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Modelo) => [
                new UpdateData<Modelo>({id: response.id, schema: modeloSchema, changes: {}}),
                new ModeloListActions.SaveModeloSuccess()
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'modelo',
                    content: 'Erro ao editar o modelo id ' + action.payload.modelo.id + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new ModeloListActions.SaveModeloFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _modeloService: ModeloService,
        public _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.id = 'generoHandle_entidadeHandle';
            this.value = this.routerState.params.generoHandle + '_' +
                this.routerState.params.entidadeHandle;
            if (this.routerState.params['unidadeHandle']) {
                this.id += '_unidadeHandle';
                this.value += '_' + this.routerState.params.unidadeHandle;
            }
            if (this.routerState.params['setorHandle']) {
                this.id += '_setorHandle';
                this.value += '_' + this.routerState.params.setorHandle;
            }
        });
    }
}
