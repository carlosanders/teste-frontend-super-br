import {AddChildData, AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {
    assunto as assuntoSchema,
    etiqueta as etiquetaSchema,
    especieProcesso as especieProcessoSchema,
    interessado as interessadoSchema,
    processo as processoSchema,
    tarefa as tarefaSchema,
    vinculacaoEspecieProcessoWorkflow as vinculacaoEspecieProcessoWorkflowSchema,
    vinculacaoEtiqueta as vinculacaoEtiquetaSchema,
} from '@cdk/normalizr';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LoginService} from 'app/main/auth/login/login.service';

import {Observable, of} from 'rxjs';
import {
    buffer,
    catchError,
    concatMap,
    filter,
    map,
    mergeAll,
    mergeMap,
    switchMap, take,
    tap,
    withLatestFrom
} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TarefasActions from '../actions/tarefas.actions';

import {Etiqueta, Tarefa, VinculacaoEspecieProcessoWorkflow, VinculacaoEtiqueta} from '@cdk/models';
import {TarefaService} from '@cdk/services/tarefa.service';
import {Router} from '@angular/router';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

import {Assunto} from '@cdk/models/assunto.model';
import {AssuntoService} from '@cdk/services/assunto.service';
import {Interessado} from '@cdk/models/interessado.model';
import {InteressadoService} from '@cdk/services/interessado.service';
import {
    getBufferingCiencia,
    getBufferingDelete,
    getBufferingDistribuir,
    getCienciaTarefaIds,
    getDeletingTarefaIds,
    getDistribuindoTarefaIds,
} from '../selectors';
import * as fromStore from '../index';
import * as UploadBlocoActions from '../../upload-bloco/store/actions';
import * as MinutasActions from '../../minutas/store/actions';
import * as ModeloComponenteDigitalActions from 'app/main/apps/modelos/modelo/store/actions/componentes-digitais.actions';
import * as AcervoComponenteDigitalActions
    from 'app/main/apps/modelos/componentes-digitais/store/actions/componentes-digitais.actions';
import * as ModeloComponenteDigitalBlocoActions from '../../modelo-bloco/modelo/store/actions/componentes-digitais.actions';
import * as AcervoComponenteDigitalBlocoActions
    from '../../modelo-bloco/componentes-digitais/store/actions/componentes-digitais.actions';
import * as AtividadeCreateActions from '../../tarefa-detail/atividades/atividade-create/store/actions';
import * as AtividadeBlocoCreateActions from '../../atividade-create-bloco/store/actions';
import {UnloadDocumentos, UnloadJuntadas} from '../../../processo/processo-view/store';
import {navigationConverter} from 'app/navigation/navigation';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {
    VinculacaoEspecieProcessoWorkflowService
} from '@cdk/services/vinculacao-especie-processo-workflow.service';

@Injectable()
export class TarefasEffect {
    routerState: any;
    /**
     * Get Tarefas with router parameters
     *
     * @type {Observable<any>}
     */
    getTarefas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.GetTarefas>(TarefasActions.GET_TAREFAS),
        switchMap(action => this._tarefaService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.folderFilter,
                ...action.payload.listFilter,
                ...action.payload.etiquetaFilter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context),
            'app/main/apps/tarefas#lista').pipe(
            concatMap(response => [
                new AddData<Tarefa>({
                    data: response['entities'],
                    schema: tarefaSchema
                }),
                new TarefasActions.GetTarefasSuccess({
                    entitiesId: response['entities'].map(tarefa => tarefa.id),
                    especieProcessoIds: response['entities'].map(tarefa => tarefa.processo.especieProcesso.id),
                    loaded: {
                        id: 'generoHandle_typeHandle_targetHandle',
                        value: this.routerState.params.generoHandle + '_' +
                            this.routerState.params.typeHandle + '_' + this.routerState.params.targetHandle
                    },
                    total: response['total']
                })
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new TarefasActions.GetTarefasFailed(err));
        })
    ));
    /**
     * Get Tarefa
     *
     * @type {Observable<any>}
     */
    getTarefa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.GetTarefa>(TarefasActions.GET_TAREFA),
        mergeMap((action) => {
            const populate = [
                'processo',
                'colaborador.usuario',
                'setor.especieSetor',
                'setor.generoSetor',
                'setor.parent',
                'setor.unidade',
                'processo.especieProcesso',
                'processo.especieProcesso.generoProcesso',
                'processo.modalidadeMeio',
                'processo.documentoAvulsoOrigem',
                'especieTarefa',
                'usuarioResponsavel',
                'setorResponsavel',
                'setorResponsavel.unidade',
                'setorOrigem',
                'setorOrigem.unidade',
                'especieTarefa.generoTarefa',
                // 'processo.especieProcesso.vinculacoesEspecieProcessoWorkflow',
                // 'processo.especieProcesso.vinculacoesEspecieProcessoWorkflow.workflow',
                'vinculacaoWorkflow',
                'vinculacaoWorkflow.workflow'
            ];
            let context = {};
            const paramUrl = this.routerState.params['targetHandle'];
            let generoParam = this.routerState.params['generoHandle'];
            if (navigationConverter.hasOwnProperty(this.routerState.params['generoHandle'])) {
                generoParam = navigationConverter[this.routerState.params['generoHandle']];
            }
            if (paramUrl !== 'lixeira') {
                context = {modulo: generoParam};
            } else {
                context = {
                    modulo: generoParam,
                    mostrarApagadas: true
                };
            }
            return this._tarefaService.get(
                action.payload,
                JSON.stringify(populate),
                JSON.stringify(context)
            ).pipe(
                map((response) => {
                    this._store.dispatch(new AddData<Tarefa>({
                        data: [response],
                        schema: tarefaSchema
                    }));
                    this._store.dispatch(new TarefasActions.GetEtiquetasTarefas(response.id));
                    this._store.dispatch(new TarefasActions.GetWorkflowTarefa(response.processo.especieProcesso.id));
                    return new TarefasActions.GetTarefaSuccess(response);
                }),
                catchError((err) => {
                    console.log(err);
                    return of(new TarefasActions.GetTarefaFailed(err));
                })
            );
        }, 25)
    ));
    getTarefasSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.GetTarefasSuccess>(TarefasActions.GET_TAREFAS_SUCCESS),
        tap((action) => {
            action.payload.entitiesId.forEach((tarefaId) => {
                this._store.dispatch(new TarefasActions.GetEtiquetasTarefas(tarefaId));
            });
            const especieProcessoIds = [...new Set(action.payload.especieProcessoIds)];
            especieProcessoIds.forEach((especieProcessoId) => {
                this._store.dispatch(new TarefasActions.GetWorkflowTarefa(especieProcessoId));
            });
        })
    ), {dispatch: false});
    getEtiquetasTarefas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.GetEtiquetasTarefas>(TarefasActions.GET_ETIQUETAS_TAREFAS),
        mergeMap(action => this._vinculacaoEtiquetaService.query(
            JSON.stringify({
                'tarefa.id': 'eq:' + action.payload,
            }),
            25,
            0,
            JSON.stringify({}),
            JSON.stringify(['etiqueta'])).pipe(
            mergeMap(response => [
                new TarefasActions.GetEtiquetasTarefasSuccess(response),
                new AddChildData<VinculacaoEtiqueta>({
                    data: response['entities'],
                    childSchema: vinculacaoEtiquetaSchema,
                    parentSchema: tarefaSchema,
                    parentId: action.payload
                })
            ])
        ), 25),
        catchError((err) => {
            console.log(err);
            return of(new TarefasActions.GetEtiquetasTarefasFailed(err));
        })
    ));
    getWorkflowTarefas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.GetWorkflowTarefa>(TarefasActions.GET_WORKFLOW_TAREFA),
        mergeMap(action => this._vinculacaoEspecieProcessoWorkflowService.query(
            JSON.stringify({
                'especieProcesso.id': 'eq:' + action.payload,
            }),
            100,
            0,
            JSON.stringify({}),
            JSON.stringify(['workflow'])).pipe(
            mergeMap(response => [
                new TarefasActions.GetWorkflowTarefaSuccess(response),
                new AddChildData<VinculacaoEspecieProcessoWorkflow>({
                    data: response['entities'],
                    childSchema: vinculacaoEspecieProcessoWorkflowSchema,
                    parentSchema: especieProcessoSchema,
                    parentId: action.payload
                })
            ])
        ), 25),
        catchError((err) => {
            console.log(err);
            return of(new TarefasActions.GetWorkflowTarefaFailed(err));
        })
    ));
    getEtiquetaMinuta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.GetEtiquetaMinuta>(TarefasActions.GET_ETIQUETA_MINUTA),
        mergeMap(action => this._vinculacaoEtiquetaService.query(
            JSON.stringify({
                'tarefa.id': 'eq:' + action.payload.tarefaId,
                'objectUuid': 'eq:' + action.payload.documento.uuid
            }),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify(['etiqueta'])).pipe(
            mergeMap(response => [
                new TarefasActions.GetEtiquetaMinutaSuccess(response),
                new AddChildData<VinculacaoEtiqueta>({
                    data: response['entities'],
                    childSchema: vinculacaoEtiquetaSchema,
                    parentSchema: tarefaSchema,
                    parentId: action.payload.tarefaId
                })
            ])
        ), 25),
        catchError((err) => {
            console.log(err);
            return of(new TarefasActions.GetEtiquetaMinutaFailed(err));
        })
    ));
    atualizaEtiquetaMinuta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.AtualizaEtiquetaMinuta>(TarefasActions.ATUALIZA_ETIQUETA_MINUTA),
        map(action => action.payload),
        mergeMap(documentoId => of(documentoId).pipe(
            withLatestFrom(this._store.pipe(select(fromStore.getVinculacaoEtiquetaByDocumentoId(documentoId))).pipe(
                map(vinculacaoEtiqueta => vinculacaoEtiqueta)
            ))
        ), 25),
        mergeMap(([, vinculacao]) => {
            if (vinculacao) {
                return this._vinculacaoEtiquetaService.get(
                    vinculacao.id,
                    JSON.stringify(['etiqueta'])).pipe(
                    tap((response) => {
                        this._store.dispatch(new AddData<VinculacaoEtiqueta>({
                            data: [response],
                            schema: vinculacaoEtiquetaSchema
                        }));
                    })
                );
            }
            return of(null);
        },25),
        catchError((err) => {
            console.log(err);
            return err;
        })
    ), {dispatch: false});
    removeEtiquetaMinutaTarefa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.RemoveEtiquetaMinutaTarefa>(TarefasActions.REMOVE_ETIQUETA_MINUTA_TAREFA),
        mergeMap(action => of(action.payload).pipe(
            withLatestFrom(this._store.pipe(select(fromStore.getVinculacaoEtiquetaByUuid(action.payload.uuid))).pipe(
                take(1),
                tap((vinculacao: VinculacaoEtiqueta) => {
                    if (vinculacao?.id) {
                        this._store.dispatch(new RemoveChildData({
                            id: vinculacao.id,
                            childSchema: vinculacaoEtiquetaSchema,
                            parentSchema: tarefaSchema,
                            parentId: action.payload.tarefaId
                        }));
                    }
                })
            ))
        ), 25)
    ), {dispatch: false});
    /**
     * Update Tarefa
     *
     * @type {Observable<any>}
     */
    setCurrentTarefa: Observable<TarefasActions.TarefasActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.SetCurrentTarefa>(TarefasActions.SET_CURRENT_TAREFA),
        map((action) => {
            if (!action.payload.static && action.payload.acessoNegado) {
                this._router.navigate([
                    'apps/tarefas/' + this.routerState.params.generoHandle + '/'
                    + this.routerState.params.typeHandle + '/'
                    + this.routerState.params.targetHandle + '/tarefa/' + action.payload.tarefaId +
                    '/processo/' + action.payload.processoId + '/acesso-negado']
                ).then();
            }

            if (!action.payload.static && !action.payload.acessoNegado) {
                this._store.dispatch(new UnloadJuntadas({reset: true}));
                this._store.dispatch(new UnloadDocumentos());

                const extras = {
                    queryParams: {
                        documentoEdit: action.payload.documentoUuidEdit
                    }
                };

                this._router.navigate([
                        'apps/tarefas/' + this.routerState.params.generoHandle + '/' +
                        this.routerState.params.typeHandle + '/' +
                        this.routerState.params.targetHandle + '/tarefa/' + action.payload.tarefaId +
                        '/processo/' + action.payload.processoId + '/visualizar'],
                    extras
                ).then();
            }

            return new TarefasActions.SetCurrentTarefaSuccess();
        })
    ));
    /**
     * Update Tarefa
     *
     * @type {Observable<any>}
     */
    createTarefa: Observable<TarefasActions.TarefasActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.CreateTarefa>(TarefasActions.CREATE_TAREFA),
        map(() => {
            this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' +
            this.routerState.params.typeHandle + '/' +
            '/' + this.routerState.params.targetHandle + '/criar']).then();
            return new TarefasActions.CreateTarefaSuccess();
        })
    ));
    /**
     * Delete Tarefa
     *
     * @type {Observable<any>}
     */
    deleteTarefa: Observable<TarefasActions.TarefasActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.DeleteTarefa>(TarefasActions.DELETE_TAREFA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Apagando a tarefa id ' + action.payload.tarefaId + '...',
            status: 0, // carregando
            lote: action.payload.loteId,
            redo: action.payload.redo,
            undo: action.payload.undo
        }))),
        buffer(this._store.pipe(select(getBufferingDelete))),
        mergeAll(),
        withLatestFrom(this._store.pipe(select(getDeletingTarefaIds))),
        mergeMap(([action, deletingTarefasIds]) => {
            if (deletingTarefasIds.indexOf(action.payload.tarefaId) === -1) {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Operação de apagar a tarefa id ' + action.payload.tarefaId + ' foi cancelada!',
                    status: 3, // cancelada
                    lote: action.payload.loteId,
                    redo: 'inherent',
                    undo: 'inherent'
                }));
                return of(new TarefasActions.DeleteTarefaCancelSuccess(action.payload.tarefaId));
            }
            return this._tarefaService.destroy(action.payload.tarefaId).pipe(
                map((response) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Tarefa id ' + action.payload.tarefaId + ' deletada com sucesso.',
                        status: 1, // sucesso
                        lote: action.payload.loteId,
                        redo: 'inherent',
                        undo: 'inherent'
                    }));
                    new UpdateData<Tarefa>({
                        id: response.id,
                        schema: tarefaSchema,
                        changes: {apagadoEm: response.apagadoEm}
                    });
                    return new TarefasActions.DeleteTarefaSuccess(response.id);
                }),
                catchError((err) => {
                    const payload = {
                        id: action.payload.tarefaId,
                        error: err
                    };
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Erro ao apagar a tarefa id ' + action.payload.tarefaId + '!',
                        status: 2, // erro
                        lote: action.payload.loteId,
                        redo: 'inherent',
                        undo: 'inherent'
                    }));
                    console.log(err);
                    return of(new TarefasActions.DeleteTarefaFailed(payload));
                })
            );
        }, 25)
    ));
    /**
     * Undelete Tarefa
     *
     * @type {Observable<any>}
     */
    undeleteTarefa: Observable<TarefasActions.TarefasActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.DeleteTarefa>(TarefasActions.UNDELETE_TAREFA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Restaurando a tarefa id ' + action.payload.tarefa.id + '...',
            status: 0, // carregando
        }))),
        mergeMap((action) => {
            const folder = action.payload.folder ? action.payload.folder.id : null;
            const context: any = {};
            if (folder) {
                context.folderId = folder;
            }
            return this._tarefaService.undelete(action.payload.tarefa, '[]', JSON.stringify(context)).pipe(
                map((response) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Tarefa id ' + action.payload.tarefa.id + ' restaurada com sucesso.',
                        status: 1, // sucesso
                    }));
                    return new TarefasActions.UndeleteTarefaSuccess({
                        tarefa: response,
                        loaded: action.payload.loaded
                    });
                }),
                catchError((err) => {
                    const payload = {
                        id: action.payload.tarefa.id,
                        error: err
                    };
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Erro ao restaurar a tarefa id ' + action.payload.tarefa.id + '!',
                        status: 2, // erro
                    }));
                    console.log(err);
                    return of(new TarefasActions.UndeleteTarefaFailed(payload));
                })
            );
        }, 25)
    ));
    /**
     * Undelete Tarefa Success
     */
    undeleteTarefaSuccess: any = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.UndeleteTarefaSuccess>(TarefasActions.UNDELETE_TAREFA_SUCCESS),
        tap((action) => {
            if (this.routerState.params['targetHandle'] === 'lixeira') {
                this._store.dispatch(new fromStore.RemoveTarefa(action.payload.tarefa.id));
            }
        })
    ), {dispatch: false});
    /**
     * Toggle Lida Tarefa
     *
     * @type {Observable<any>}
     */
    toggleLidaTarefa: any = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.ToggleLidaTarefa>(TarefasActions.TOGGLE_LIDA_TAREFA),
        mergeMap(action => this._tarefaService.toggleLida(action.payload).pipe(
            mergeMap(response => [
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
        ), 25)
    ));
    /**
     * Toggle Urgente Tarefa
     *
     * @type {Observable<any>}
     */
    toggleUrgenteTarefa: any = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.ToggleUrgenteTarefa>(TarefasActions.TOGGLE_URGENTE_TAREFA),
        mergeMap(action => this._tarefaService.patch(action.payload, {
            urgente: !action.payload.urgente
        }).pipe(
            mergeMap(response => [
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
        ), 25)
    ));
    /**
     * Set Folder on Selected Tarefas
     *
     * @type {Observable<any>}
     */
    setFolderOnSelectedTarefas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.SetFolderOnSelectedTarefas>(TarefasActions.SET_FOLDER_ON_SELECTED_TAREFAS),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Alterando pasta da tarefa id ' + action.payload.tarefa.id + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        concatMap((action) => {
            const folder = action.payload.folder ? action.payload.folder.id : null;
            return this._tarefaService.patch(action.payload.tarefa, {folder: folder}).pipe(
                tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Pasta da tarefa id ' + action.payload.tarefa.id + ' alterada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }))),
                mergeMap((response: any) => [
                    new TarefasActions.SetFolderOnSelectedTarefasSuccess(response)
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Erro ao alterar pasta da tarefa id ' + action.payload.tarefa.id + '.',
                        status: 1, // sucesso
                        lote: action.payload.loteId
                    }));
                    return of(new TarefasActions.SetFolderOnSelectedTarefasFailed(err));
                })
            );
        })
    ));
    /**
     * ISSUE-176
     * Set Setor On Selected Tarefas
     *
     * @type {Observable<any>}
     */
    distribuirSelectedTarefas: Observable<TarefasActions.TarefasActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.DistribuirTarefas>(TarefasActions.DISTRIBUIR_TAREFA),
        tap((action) => {
            this._store.dispatch(new UpdateData<Tarefa>(
                {
                    id: action.payload.tarefa.id,
                    schema: tarefaSchema,
                    changes: {
                        setorResponsavel: action.payload.setorResponsavel,
                        distribuicaoAutomatica: action.payload.distribuicaoAutomatica,
                        usuarioResponsavel: action.payload.usuarioResponsavel
                    }
                }
            ));
            this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tarefa',
                content: 'Distribuindo a tarefa id ' + action.payload.tarefa.id + '...',
                status: 0, // carregando
                lote: action.payload.loteId,
                redo: action.payload.redo,
                undo: action.payload.undo
            }));
        }),
        buffer(this._store.pipe(select(getBufferingDistribuir))),
        mergeAll(),
        withLatestFrom(this._store.pipe(select(getDistribuindoTarefaIds))),
        mergeMap(([action, distribuindoTarefasIds]) => {
            if (distribuindoTarefasIds.indexOf(action.payload.tarefa.id) === -1) {
                this._store.dispatch(new UpdateData<Tarefa>(
                    {
                        id: action.payload.tarefa.id,
                        schema: tarefaSchema,
                        changes: {
                            setorResponsavel: action.payload.tarefa.setorResponsavel,
                            distribuicaoAutomatica: action.payload.tarefa.distribuicaoAutomatica,
                            usuarioResponsavel: action.payload.tarefa.usuarioResponsavel
                        }
                    }
                ));
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Operação de distribuição da tarefa id ' + action.payload.tarefa.id + ' foi cancelada!',
                    status: 3, // cancelada
                    lote: action.payload.loteId,
                    redo: 'inherent',
                    undo: 'inherent'
                }));
                return of(new TarefasActions.DistribuirTarefasCancelSuccess(action.payload));
            }
            return this._tarefaService.patch(action.payload.tarefa, {
                setorResponsavel: action.payload.setorResponsavel,
                distribuicaoAutomatica: action.payload.distribuicaoAutomatica,
                usuarioResponsavel: action.payload.usuarioResponsavel
            }).pipe(
                map((response) => {
                    this._store.dispatch(new UpdateData<Tarefa>(
                        {
                            id: response.id,
                            schema: tarefaSchema,
                            changes: {
                                distribuicaoAutomatica: response.distribuicaoAutomatica,
                                dataHoraDistribuicao: response.dataHoraDistribuicao
                            }
                        }
                    ));
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Tarefa id ' + action.payload.tarefa.id + ' distribuída com sucesso.',
                        status: 1, // sucesso
                        lote: action.payload.loteId,
                        redo: 'inherent',
                        undo: 'inherent'
                    }));
                    return new TarefasActions.DistribuirTarefasSuccess(response.id);
                }),
                catchError((err) => {
                    const payload = {
                        id: action.payload.tarefa.id,
                        setorResponsavel: action.payload.setorResponsavel,
                        usuarioResponsavel: action.payload.usuarioResponsavel,
                        error: err
                    };
                    this._store.dispatch(new UpdateData<Tarefa>(
                        {
                            id: action.payload.tarefa.id,
                            schema: tarefaSchema,
                            changes: {
                                setorResponsavel: action.payload.tarefa.setorResponsavel,
                                distribuicaoAutomatica: action.payload.tarefa.distribuicaoAutomatica,
                                usuarioResponsavel: action.payload.tarefa.usuarioResponsavel
                            }
                        }
                    ));
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Erro ao distribuir a tarefa id ' + action.payload.tarefa.id + '.',
                        status: 2, // erro
                        lote: action.payload.loteId,
                        redo: 'inherent',
                        undo: 'inherent'
                    }));
                    console.log(err);
                    return of(new TarefasActions.DistribuirTarefasFailed(payload));
                })
            );
        }, 25)
    ));
    /**
     * ISSUE-107
     * Get Assuntos Processo tarefa from input parameters
     *
     * @type {Observable<any>}
     */
    getAssuntosProcessoTarefa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.GetAssuntosProcessoTarefa>(TarefasActions.GET_ASSUNTOS_PROCESSO_TAREFA),
        mergeMap(action => this._assuntoService.query(
            JSON.stringify({
                ...action.payload.params.filter
            }),
            action.payload.params.limit,
            action.payload.params.offset,
            JSON.stringify(action.payload.params.sort),
            JSON.stringify(action.payload.params.populate)).pipe(
            mergeMap(response => [
                new TarefasActions.GetAssuntosProcessoTarefaSuccess(action.payload.processoId),
                new AddChildData<Assunto>({
                    data: response['entities'],
                    childSchema: assuntoSchema,
                    parentSchema: processoSchema,
                    parentId: action.payload.processoId
                }),
            ]),
            catchError((err) => {
                console.log(err);
                return of(new TarefasActions.GetAssuntosProcessoTarefaFailed(action.payload.processoId));
            })
        ), 25),
    ));
    /**
     * ISSUE-183
     * Get Interessados Processo tarefa from input parameters
     *
     * @type {Observable<any>}
     */
    getInteressadosProcessoTarefa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.GetInteressadosProcessoTarefa>(TarefasActions.GET_INTERESSADOS_PROCESSO_TAREFA),
        mergeMap(action => this._interessadoService.query(
            JSON.stringify({
                ...action.payload.params.filter
            }),
            action.payload.params.limit,
            action.payload.params.offset,
            JSON.stringify(action.payload.params.sort),
            JSON.stringify(action.payload.params.populate)).pipe(
            mergeMap(response => [
                new TarefasActions.GetInteressadosProcessoTarefaSuccess({
                    processoId: action.payload.processoId,
                    total: response['total']
                }),
                new AddChildData<Interessado>({
                    data: response['entities'],
                    childSchema: interessadoSchema,
                    parentSchema: processoSchema,
                    parentId: action.payload.processoId
                }),
            ]),
            catchError((err) => {
                console.log(err);
                return of(new TarefasActions.GetInteressadosProcessoTarefaFailed(action.payload.processoId));
            })
        ), 25),
    ));
    /**
     * Dar Ciencia Tarefa
     *
     * @type {Observable<any>}
     */
    darCienciaTarefa: any = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.DarCienciaTarefa>(TarefasActions.DAR_CIENCIA_TAREFA),
        tap((action) => {
            this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tarefa',
                content: 'Dando ciência na tarefa id ' + action.payload.tarefa.id + '...',
                status: 0, // carregando
                lote: action.payload.loteId,
                redo: action.payload.redo
            }));
        }),
        buffer(this._store.pipe(select(getBufferingCiencia))),
        mergeAll(),
        withLatestFrom(this._store.pipe(select(getCienciaTarefaIds))),
        mergeMap(([action, cienciaTarefasIds]) => {
            if (cienciaTarefasIds.indexOf(action.payload.tarefa.id) === -1) {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Operação de dar ciência na tarefa id ' + action.payload.tarefa.id + ' foi cancelada!',
                    status: 3, // cancelada
                    lote: action.payload.loteId,
                    redo: 'inherent'
                }));
                return of(new TarefasActions.DarCienciaTarefaCancelSuccess(action.payload.tarefa.id));
            }
            return this._tarefaService.ciencia(action.payload.tarefa).pipe(
                map((response) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Tarefa id ' + action.payload.tarefa.id + ' ciência com sucesso.',
                        status: 1, // sucesso
                        lote: action.payload.loteId,
                        redo: 'inherent'
                    }));
                    this._store.dispatch(new AddData<Tarefa>({
                        data: [response],
                        schema: tarefaSchema
                    }));
                    return new TarefasActions.DarCienciaTarefaSuccess(response.id);
                }),
                catchError((err) => {
                    const payload = {
                        id: action.payload.tarefa.id,
                        error: err
                    };
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Erro ao dar ciência na tarefa id ' + action.payload.tarefa.id + '!',
                        status: 2, // erro
                        lote: action.payload.loteId,
                        redo: 'inherent'
                    }));
                    console.log(err);
                    return of(new TarefasActions.DarCienciaTarefaFailed(payload));
                })
            );
        }, 25)
    ));
    /**
     * Change Selected Tarefas
     */
    changeSelectedTarefas: any = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.ChangeSelectedTarefas>(TarefasActions.CHANGE_SELECTED_TAREFAS),
        tap((action) => {
            if (action.payload.length > 1) {
                this._router.navigate([
                    'apps',
                    'tarefas',
                    this.routerState.params.generoHandle,
                    this.routerState.params.typeHandle,
                    this.routerState.params.targetHandle,
                    'operacoes-bloco'
                ]).then();
            } else if (action.payload.length === 0 && this.routerState.url.indexOf('minutas') > 0 || this.routerState.url.indexOf('bloco') > 0 && action.payload.length < 1) {
                this._router.navigate([
                    'apps',
                    'tarefas',
                    this.routerState.params.generoHandle,
                    this.routerState.params.typeHandle,
                    this.routerState.params.targetHandle
                ]).then();
            }
        })
    ), {dispatch: false});
    /**
     * Gerar Relatorio em Excel
     *
     * @type {Observable<any>}
     */
    doGerarRelatorioTarefaExcel: any = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.GerarRelatorioTarefaExcel>(TarefasActions.GERAR_RELATORIO_TAREFA_EXCEL),
        mergeMap(action => this._tarefaService.gerarRelatorioTarefaExcel(action.payload).pipe(
            mergeMap(response => [
                new TarefasActions.GerarRelatorioTarefaExcelSuccess(response.id),
            ]),
            catchError((err) => {
                console.log(err);
                return of(new TarefasActions.GerarRelatorioTarefaExcelFailed());
            })
        ), 25)
    ));
    /**
     * Save Observacao
     *
     * @type {any}
     */
    saveObservacao: any = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.SaveObservacao>(TarefasActions.SAVE_OBSERVACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Alterando a observação da tarefa id ' + action.payload.tarefa.id + '...',
            status: 0, // carregando
        }))),
        switchMap(action => this._tarefaService.patch(action.payload.tarefa, {observacao: action.payload.conteudo}).pipe(
            tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tarefa',
                content: 'Observação da tarefa id ' + action.payload.tarefa.id + ' alterada com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Tarefa) => [
                new TarefasActions.SaveObservacaoSuccess(),
                new UpdateData<Tarefa>({
                    id: response.id,
                    schema: tarefaSchema,
                    changes: {observacao: action.payload.conteudo}
                })
            ]),
            catchError((err) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Erro ao alterar a observação da tarefa id ' + action.payload.tarefa.id + '.',
                    status: 2, // erro
                }));
                return of(new TarefasActions.SaveObservacaoFailed(err));
            })
        ))
    ));
    /* Ações referentes ao upload em bloco de minutas, que a listagem de tarefas escutará e atualizará as informações das
     * tarefas à medida que os uploads são concluídos
     */
    uploadConcluido: any = createEffect(() => this._actions.pipe(
        ofType<UploadBlocoActions.UploadConcluido>(UploadBlocoActions.UPLOAD_CONCLUIDO),
        tap((action) => {
            this._store.dispatch(new TarefasActions.GetEtiquetasTarefas(action.payload));
        })
    ), {dispatch: false});
    /* Ações referentes ao painel de minutas, que a listagem de tarefas escutará e atualizará as informações das
     * tarefas à medida que as exclusões são concluídas
     */
    deleteDocumentoBloco: any = createEffect(() => this._actions.pipe(
        ofType<MinutasActions.DeleteDocumentoSuccess>(MinutasActions.DELETE_DOCUMENTO_BLOCO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new TarefasActions.RemoveEtiquetaMinutaTarefa(action.payload));
        })
    ), {dispatch: false});
    undeleteDocumento: any = createEffect(() => this._actions.pipe(
        ofType<MinutasActions.UndeleteDocumentoSuccess>(MinutasActions.UNDELETE_DOCUMENTO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new TarefasActions.GetEtiquetasTarefas(action.payload.tarefaId));
        })
    ), {dispatch: false});
    /* Ações referentes ao editor de modelos de minutas,
     * que o painel de tarefas fica observando
     */
    createModelo: any = createEffect(() => this._actions.pipe(
        ofType<ModeloComponenteDigitalActions.SaveComponenteDigitalSuccess>(ModeloComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_SUCCESS),
        tap((action) => {
            this._store.dispatch(new TarefasActions.GetEtiquetasTarefas(action.payload.tarefaId));
        })
    ), {dispatch: false});
    /* Ações referentes ao editor de modelos de minutas em bloco,
     * que o painel de tarefas fica observando
     */
    createModeloBloco: any = createEffect(() => this._actions.pipe(
        ofType<ModeloComponenteDigitalBlocoActions.SaveComponenteDigitalSuccess>(ModeloComponenteDigitalBlocoActions.SAVE_COMPONENTE_DIGITAL_SUCCESS),
        tap((action) => {
            this._store.dispatch(new TarefasActions.GetEtiquetasTarefas(action.payload.tarefaId));
        })
    ), {dispatch: false});
    /* Ações referentes ao editor de modelos de minutas por acervo,
     * que o painel de tarefas fica observando
     */
    createAcervo: any = createEffect(() => this._actions.pipe(
        ofType<AcervoComponenteDigitalActions.SaveComponenteDigitalSuccess>(AcervoComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_SUCCESS),
        tap((action) => {
            this._store.dispatch(new TarefasActions.GetEtiquetasTarefas(action.payload.tarefaId));
        })
    ), {dispatch: false});
    /* Ações referentes ao editor de modelos de minutas em bloco por acervo,
     * que o painel de tarefas fica observando
     */
    createAcervoBloco: any = createEffect(() => this._actions.pipe(
        ofType<AcervoComponenteDigitalBlocoActions.SaveComponenteDigitalSuccess>(AcervoComponenteDigitalBlocoActions.SAVE_COMPONENTE_DIGITAL_SUCCESS),
        tap((action) => {
            this._store.dispatch(new TarefasActions.GetEtiquetasTarefas(action.payload.tarefaId));
        })
    ), {dispatch: false});
    /* Ações referentes ao painel atividade-create, que a listagem de tarefas escutará e atualizará as informações das
     * tarefas à medida que os uploads/deletes são concluídos
     */
    saveComponenteDigitalAtividade: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateActions.SaveComponenteDigitalSuccess>(AtividadeCreateActions.SAVE_COMPONENTE_DIGITAL_SUCCESS),
        tap((action) => {
            this._store.dispatch(new TarefasActions.GetEtiquetasTarefas(action.payload.tarefa.id));
        })
    ), {dispatch: false});
    deleteDocumentoAtividade: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateActions.DeleteDocumentoSuccess>(AtividadeCreateActions.DELETE_DOCUMENTO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new TarefasActions.RemoveEtiquetaMinutaTarefa(action.payload));
        })
    ), {dispatch: false});
    deleteDocumentoAtividadeBloco: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeBlocoCreateActions.DeleteDocumentoSuccess>(AtividadeBlocoCreateActions.DELETE_DOCUMENTO_BLOCO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new TarefasActions.RemoveEtiquetaMinutaTarefa(action.payload));
        })
    ), {dispatch: false});
    converteDocumentoPdfAtividade: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateActions.ConverteToPdfSucess>(AtividadeCreateActions.CONVERTE_DOCUMENTO_SUCESS),
        tap((action) => {
            this._store.dispatch(new TarefasActions.AtualizaEtiquetaMinuta(action.payload));
        })
    ), {dispatch: false});
    converteDocumentoHtmlAtividade: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateActions.ConverteToHtmlSucess>(AtividadeCreateActions.CONVERTE_DOCUMENTO_HTML_SUCESS),
        tap((action) => {
            this._store.dispatch(new TarefasActions.AtualizaEtiquetaMinuta(action.payload));
        })
    ), {dispatch: false});
    converteDocumentoPdfAtividadeBloco: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeBlocoCreateActions.ConverteToPdfSucess>(AtividadeBlocoCreateActions.CONVERTE_DOCUMENTO_SUCESS),
        tap((action) => {
            this._store.dispatch(new TarefasActions.AtualizaEtiquetaMinuta(action.payload));
        })
    ), {dispatch: false});
    converteDocumentoHtmlAtividadeBloco: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeBlocoCreateActions.ConverteToHtmlSucess>(AtividadeBlocoCreateActions.CONVERTE_DOCUMENTO_HTML_SUCESS),
        tap((action) => {
            this._store.dispatch(new TarefasActions.AtualizaEtiquetaMinuta(action.payload));
        })
    ), {dispatch: false});

    /**
     * Create Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    createVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.CreateVinculacaoEtiqueta>(TarefasActions.CREATE_VINCULACAO_ETIQUETA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Salvando etiqueta para a tarefa ...',
            status: 0, // carregando
        }))),
        mergeMap((action) => {
            const vinculacaoEtiqueta = new VinculacaoEtiqueta();
            vinculacaoEtiqueta.tarefa = action.payload.tarefa;
            vinculacaoEtiqueta.etiqueta = action.payload.etiqueta;
            return this._vinculacaoEtiquetaService.save(vinculacaoEtiqueta).pipe(
                tap((response) => {
                    response.tarefa = null;
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Etiqueta id ' + response.id + ' salva com sucesso.',
                        status: 1, // sucesso
                    }));
                }),
                mergeMap((response: VinculacaoEtiqueta) => [
                    new AddChildData<VinculacaoEtiqueta>({
                        data: [response],
                        childSchema: vinculacaoEtiquetaSchema,
                        parentSchema: tarefaSchema,
                        parentId: action.payload.tarefa.id
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Erro ao etiquetar a tarefa!',
                        status: 2, // erro
                    }));
                    return of(new TarefasActions.CreateVinculacaoEtiquetaFailed(err));
                })
            );
        }, 25)
    ));
    /**
     * Save Etiqueta
     *
     * @type {Observable<any>}
     */
    saveEtiqueta: any = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.SaveEtiqueta>(TarefasActions.SAVE_ETIQUETA),
        switchMap((action) => {
            const tarefa = action.payload.tarefa;
            return this._etiquetaService.save(action.payload.etiqueta).pipe(
                mergeMap((response: Etiqueta) => [
                    new AddData<Etiqueta>({data: [response], schema: etiquetaSchema}),
                    new TarefasActions.CreateVinculacaoEtiqueta({
                        operacaoId: action.payload.operacaoId,
                        tarefa: tarefa,
                        etiqueta: response
                    })
                ]),
                catchError(err => of(new TarefasActions.SaveEtiquetaFailed(err)))
            );
        })
    ));

    /**
     * Delete Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    deleteVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.DeleteVinculacaoEtiqueta>(TarefasActions.DELETE_VINCULACAO_ETIQUETA),
        mergeMap(action => this._vinculacaoEtiquetaService.destroy(action.payload.vinculacaoEtiquetaId).pipe(
                mergeMap(() => [
                    new RemoveChildData({
                        id: action.payload.vinculacaoEtiquetaId,
                        childSchema: vinculacaoEtiquetaSchema,
                        parentSchema: tarefaSchema,
                        parentId: action.payload.tarefaId
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new TarefasActions.DeleteVinculacaoEtiquetaFailed(action.payload));
                })
            )
        )
    ));

    /**
     * Save conteúdo vinculação etiqueta na tarefa
     *
     * @type {Observable<any>}
     */
    saveConteudoVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.SaveConteudoVinculacaoEtiqueta>(TarefasActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA),
        mergeMap(action => this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta, action.payload.changes).pipe(
            mergeMap(response => [
                new TarefasActions.SaveConteudoVinculacaoEtiquetaSuccess(response.id),
                new UpdateData<VinculacaoEtiqueta>({
                    id: response.id,
                    schema: vinculacaoEtiquetaSchema,
                    changes: {conteudo: response.conteudo, privada: response.privada}
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new TarefasActions.SaveConteudoVinculacaoEtiquetaFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
        public _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router,
        private _assuntoService: AssuntoService,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
        private _vinculacaoEspecieProcessoWorkflowService: VinculacaoEspecieProcessoWorkflowService,
        private _etiquetaService: EtiquetaService,
        private _interessadoService: InteressadoService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
