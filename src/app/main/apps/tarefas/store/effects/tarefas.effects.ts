import {AddChildData, AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {assunto as assuntoSchema, processo as processoSchema, tarefa as tarefaSchema} from '@cdk/normalizr';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, concatMap, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TarefasActions from '../actions/tarefas.actions';

import {Tarefa} from '@cdk/models';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

import {Assunto} from '@cdk/models/assunto.model';
import {AssuntoService} from '@cdk/services/assunto.service';

@Injectable()
export class TarefasEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
        public _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router,
        private _assuntoService: AssuntoService
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }

    /**
     * Get Tarefas with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTarefas: Observable<any> =
        this._actions
            .pipe(
                ofType<TarefasActions.GetTarefas>(TarefasActions.GET_TAREFAS),
                switchMap((action) => {
                    return this._tarefaService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.folderFilter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context));
                }),
                mergeMap((response) => [
                    new AddData<Tarefa>({data: response['entities'], schema: tarefaSchema}),
                    new TarefasActions.GetTarefasSuccess({
                        entitiesId: response['entities'].map(tarefa => tarefa.id),
                        loaded: {
                            id: 'generoHandle_typeHandle_targetHandle',
                            value: this.routerState.params.generoHandle + '_' +
                                this.routerState.params.typeHandle + '_' + this.routerState.params.targetHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TarefasActions.GetTarefasFailed(err));
                    return caught;
                })
            );

    /**
     * Update Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    setCurrentTarefa: Observable<TarefasActions.TarefasActionsAll> =
        this._actions
            .pipe(
                ofType<TarefasActions.SetCurrentTarefa>(TarefasActions.SET_CURRENT_TAREFA),
                map((action) => {
                    if (action.payload.acessoNegado) {
                        this._router.navigate([
                            'apps/tarefas/' + this.routerState.params.generoHandle + '/'
                            + this.routerState.params.typeHandle + '/'
                            + this.routerState.params.targetHandle + '/tarefa/' + action.payload.tarefaId +
                            '/processo/' + action.payload.processoId + '/acesso-negado']
                        ).then();
                    } else {
                        this._router.navigate([
                            'apps/tarefas/' + this.routerState.params.generoHandle + '/' +
                            this.routerState.params.typeHandle + '/' +
                            this.routerState.params.targetHandle + '/tarefa/' + action.payload.tarefaId +
                            '/processo/' + action.payload.processoId + '/visualizar']
                        ).then();
                    }

                    return new TarefasActions.SetCurrentTarefaSuccess();
                })
            );

    /**
     * Update Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    createTarefa: Observable<TarefasActions.TarefasActionsAll> =
        this._actions
            .pipe(
                ofType<TarefasActions.CreateTarefa>(TarefasActions.CREATE_TAREFA),
                map(() => {
                    this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' +
                    this.routerState.params.typeHandle + '/' +
                    '/' + this.routerState.params.targetHandle + '/criar']).then();
                    return new TarefasActions.CreateTarefaSuccess();
                })
            );

    /**
     * Delete Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    deleteTarefa: Observable<TarefasActions.TarefasActionsAll> =
        this._actions
            .pipe(
                ofType<TarefasActions.DeleteTarefa>(TarefasActions.DELETE_TAREFA),
                mergeMap((action) => {
                    return this._tarefaService.destroy(action.payload).pipe(
                        map((response) => new TarefasActions.DeleteTarefaSuccess(response.id)),
                        catchError((err) => {
                            const payload = {
                                id: action.payload,
                                error: err
                            };
                            console.log(err);
                            return of(new TarefasActions.DeleteTarefaFailed(payload));
                        })
                    );
                })
            );

    /**
     * Toggle Lida Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    toggleLidaTarefa: any =
        this._actions
            .pipe(
                ofType<TarefasActions.ToggleLidaTarefa>(TarefasActions.TOGGLE_LIDA_TAREFA),
                mergeMap((action) => {
                    return this._tarefaService.toggleLida(action.payload).pipe(
                        mergeMap((response) => [
                            new TarefasActions.ToggleLidaTarefaSuccess(response.id),
                            new UpdateData<Tarefa>({
                                id: response.id,
                                schema: tarefaSchema,
                                changes: {dataHoraLeitura: response.dataHoraLeitura}
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TarefasActions.ToggleLidaTarefaFailed(action.payload));
                        })
                    );
                })
            );

    /**
     * Toggle Urgente Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    toggleUrgenteTarefa: any =
        this._actions
            .pipe(
                ofType<TarefasActions.ToggleUrgenteTarefa>(TarefasActions.TOGGLE_URGENTE_TAREFA),
                mergeMap((action) => {
                    return this._tarefaService.patch(action.payload, {
                        urgente: !action.payload.urgente
                    }).pipe(
                        mergeMap((response) => [
                            new TarefasActions.ToggleUrgenteTarefaSuccess(response.id),
                            new UpdateData<Tarefa>({
                                id: response.id,
                                schema: tarefaSchema,
                                changes: {urgente: response.urgente}
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TarefasActions.ToggleUrgenteTarefaFailed(action.payload));
                        })
                    );
                })
            );

    /**
     * Set Folder on Selected Tarefas
     * @type {Observable<any>}
     */
    @Effect()
    setFolderOnSelectedTarefas: Observable<any> =
        this._actions
            .pipe(
                ofType<TarefasActions.SetFolderOnSelectedTarefas>(TarefasActions.SET_FOLDER_ON_SELECTED_TAREFAS),
                concatMap((action) => {
                    const folder = action.payload.folder ? action.payload.folder.id : null;
                    return this._tarefaService.patch(action.payload.tarefa, {folder: folder}).pipe(
                        mergeMap((response: any) => [
                            new TarefasActions.SetFolderOnSelectedTarefasSuccess(response),
                            new OperacoesActions.Resultado({
                                type: 'tarefa',
                                content: `Tarefa id ${response.id} editada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TarefasActions.SetFolderOnSelectedTarefasFailed(err));
                        })
                    );
                })
            );

    /**
     * ISSUE-107
     * Get Assuntos Processo tarefa from input parameters
     * @type {Observable<any>}
     */
    @Effect()
    getAssuntosProcessoTarefa: Observable<any> =
        this._actions
            .pipe(
                ofType<TarefasActions.GetAssuntosProcessoTarefa>(TarefasActions.GET_ASSUNTOS_PROCESSO_TAREFA),
                mergeMap((action) => {
                    return this._assuntoService.query(
                        JSON.stringify({
                            ...action.payload.params.filter
                        }),
                        action.payload.params.limit,
                        action.payload.params.offset,
                        JSON.stringify(action.payload.params.sort),
                        JSON.stringify(action.payload.params.populate)).pipe(
                        mergeMap((response) => [
                            new TarefasActions.GetAssuntosProcessoTarefaSuccess(action.payload.processoId),
                            new AddChildData<Assunto>({
                                data: response['entities'],
                                childSchema: assuntoSchema,
                                parentSchema: processoSchema,
                                parentId: action.payload.processoId
                            }),
                        ]),
                        catchError((err, caught) => {
                            console.log(err);
                            this._store.dispatch(new TarefasActions.GetAssuntosProcessoTarefaFailed(action.payload.processoId));
                            return caught;
                        })
                    );

                }),
            );

    /**
     * Dar Ciencia Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    darCienciaTarefa: any =
        this._actions
            .pipe(
                ofType<TarefasActions.DarCienciaTarefa>(TarefasActions.DAR_CIENCIA_TAREFA),
                mergeMap((action) => {
                    return this._tarefaService.ciencia(action.payload).pipe(
                        mergeMap((response: Tarefa) => [
                            new TarefasActions.DarCienciaTarefaSuccess(response.id),
                            new AddData<Tarefa>({
                                data: [response],
                                schema: tarefaSchema
                            }), new OperacoesActions.Resultado({
                                type: 'tarefa',
                                content: `Tarefa id ${response.id} ciência com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TarefasActions.SaveTarefaFailed(err));
                        })
                    );
                })
            );
}
