import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {
    buffer,
    catchError,
    filter,
    map,
    mergeAll,
    mergeMap,
    switchMap,
    take,
    tap,
    withLatestFrom
} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';

import * as fromStore from 'app/main/apps/tarefas/tarefa-detail/store/';

import {TarefaService} from '@cdk/services/tarefa.service';
import {Router} from '@angular/router';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {Documento, Tarefa, Usuario, VinculacaoEtiqueta} from '@cdk/models';
import {AddChildData, AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {
    documento as documentoSchema,
    tarefa as tarefaSchema,
    vinculacaoEtiqueta as vinculacaoEtiquetaSchema
} from '@cdk/normalizr';
import {DocumentoService} from '@cdk/services/documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {LoginService} from 'app/main/auth/login/login.service';
import {getBufferingCiencia, getBufferingRedistribuir, getCienciaId, getRedistribuindoId} from '../selectors';
import {
    DarCienciaTarefa,
    RedistribuirTarefa,
    RedistribuirTarefaCancelSuccess,
    RedistribuirTarefaFailed,
    RedistribuirTarefaSuccess
} from '../../../store';
import {navigationConverter} from 'app/navigation/navigation';
import * as MinutasActions from '../../../minutas/store/actions';
import * as ModeloComponenteDigitalActions
    from 'app/main/apps/modelos/modelo/store/actions/componentes-digitais.actions';
import * as ModeloComponenteDigitalBlocoActions
    from '../../../modelo-bloco/modelo/store/actions/componentes-digitais.actions';
import * as DocumentoAvulsoCreateActions
    from 'app/main/apps/documento-avulso/documento-avulso-create/store/actions/documento-avulso-create.actions';
import * as AcervoComponenteDigitalActions
    from 'app/main/apps/modelos/componentes-digitais/store/actions/componentes-digitais.actions';
import * as AcervoComponenteDigitalBlocoActions
    from '../../../modelo-bloco/componentes-digitais/store/actions/componentes-digitais.actions';
import * as AtividadeCreateActions from '../../../tarefa-detail/atividades/atividade-create/store/actions';
import * as DocumentoOficioActions
    from 'app/main/apps/documento/documento-avulso-edit/dados-basicos/store/actions/documento-avulso-edit.actions';
import * as OficiosDocumentosActions from '../../../tarefa-detail/oficios/store/actions/documentos.actions';
import * as DocumentoEditAtividadeDocumentosActions
    from 'app/main/apps/documento/documento-edit/atividade/store/actions/documentos.actions';
import * as AtividadeBlocoCreateActions from '../../../atividade-create-bloco/store/actions';

@Injectable()
export class TarefaDetailEffect {
    routerState: any;
    populate: string[] = [];
    /**
     * Get Tarefa with router parameters
     *
     * @type {Observable<any>}
     */
    getTarefa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetTarefa>(fromStore.GET_TAREFA),
        switchMap((action) => {
            this.populate = action.payload.populate ?? [
                'especieTarefa',
                'usuarioResponsavel',
                'usuarioResponsavel.colaborador',
                'setorResponsavel',
                'setorResponsavel.unidade',
                'setorOrigem',
                'setorOrigem.unidade',
                'especieTarefa.generoTarefa',
                'vinculacaoWorkflow',
                'vinculacaoWorkflow.workflow',
                'vinculacoesEtiquetas',
                'vinculacoesEtiquetas.etiqueta',
                'folder'
            ];
            let generoParam = this.routerState.params['generoHandle'];
            if (navigationConverter.hasOwnProperty(this.routerState.params['generoHandle'])) {
                generoParam = navigationConverter[this.routerState.params['generoHandle']];
            }
            return this._tarefaService.get(
                action.payload.id,
                JSON.stringify(this.populate),
                JSON.stringify({'especieProcessoWorkflow': true, 'modulo': generoParam})
            ).pipe(
                mergeMap(response => [
                    new AddData<Tarefa>({data: [response], schema: tarefaSchema, populate: this.populate}),
                    new fromStore.GetTarefaSuccess({
                        loaded: {
                            id: 'tarefaHandle',
                            value: this.routerState.params.tarefaHandle
                        },
                        tarefa: response
                    })
                ])
            );
        }),
        catchError((err) => {
            console.log(err);
            return of(new fromStore.GetTarefaFailed(err));
        })
    ));
    /**
     * Deselect Tarefa Action
     */
    deselectTarefaAction: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.DeselectTarefaAction>(fromStore.DESELECT_TAREFA_ACTION),
        tap(() => {
            this._router.navigate([
                'apps/tarefas/' + this.routerState.params.generoHandle + '/' +
                this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle
            ]).then();
        })
    ), {dispatch: false});
    /**
     * Update Tarefa
     *
     * @type {Observable<any>}
     */
    createTarefa: Observable<fromStore.TarefaDetailActionsAll> = createEffect(() => this._actions.pipe(
        ofType<fromStore.CreateTarefa>(fromStore.CREATE_TAREFA),
        map(() => {
            this._router.navigate([this.routerState.url + '/criar']).then();
            return new fromStore.CreateTarefaSuccess();
        })
    ));
    /**
     * Delete Tarefa
     *
     * @type {Observable<any>}
     */
    deleteTarefa: Observable<fromStore.TarefaDetailActionsAll> = createEffect(() => this._actions.pipe(
        ofType<fromStore.DeleteTarefa>(fromStore.DELETE_TAREFA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Apagando a tarefa id ' + action.payload.tarefaId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._tarefaService.destroy(action.payload.tarefaId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Tarefa id ' + action.payload.tarefaId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Tarefa>({
                    id: response.id,
                    schema: tarefaSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new fromStore.DeleteTarefaSuccess(response.id);
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
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new fromStore.DeleteTarefaFailed(payload));
            })
        ), 25)
    ));
    /**
     * Save Tarefa
     *
     * @type {Observable<any>}
     */
    saveTarefa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.SaveTarefa>(fromStore.SAVE_TAREFA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Salvando a tarefa ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._tarefaService.save(action.payload.tarefa).pipe(
            mergeMap((response: Tarefa) => [
                new fromStore.SaveTarefaSuccess(),
                new AddData<Tarefa>({
                    data: [response],
                    schema: tarefaSchema
                }),
                new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: `Tarefa id ${response.id} criada com sucesso!`,
                    status: 1
                })
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Erro ao salvar a tarefa!',
                    status: 2, // erro
                }));
                return of(new fromStore.SaveTarefaFailed(err));
            })
        ))
    ));
    /**
     * Redistribuir Tarefa
     *
     * @type {Observable<any>}
     */
    redistribuirTarefa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.RedistribuirTarefa>(fromStore.REDISTRIBUIR_TAREFA),
        tap((action) => {
            this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tarefa',
                content: 'Redistribuindo tarefa id ' + action.payload.tarefa.id + '...',
                status: 0, // carregando
                lote: action.payload.loteId,
                redo: action.payload.redo
            }));
            this._store.dispatch(new RedistribuirTarefa({
                tarefa: action.payload.tarefa
            }));
        }),
        buffer(this._store.pipe(select(getBufferingRedistribuir))),
        mergeAll(),
        withLatestFrom(this._store.pipe(select(getRedistribuindoId))),
        mergeMap(([action, redistribuindoId]) => {
            if (redistribuindoId === null) {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Operação de redistribuição da tarefa id ' + action.payload.tarefa.id + ' foi cancelada!',
                    status: 3, // cancelada
                    lote: action.payload.loteId,
                    redo: 'inherent'
                }));
                this._store.dispatch(new RedistribuirTarefaCancelSuccess(action.payload.tarefa.id));
                return of(new fromStore.RedistribuirTarefaCancelSuccess({
                    tarefa: action.payload.tarefa.id,
                    url: action.payload.url
                }));
            }
            const populate = JSON.stringify([
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
                'usuarioResponsavel.colaborador',
                'setorResponsavel',
                'setorResponsavel.unidade',
                'setorOrigem',
                'setorOrigem.unidade',
                'especieTarefa.generoTarefa',
                'vinculacaoWorkflow',
                'vinculacaoWorkflow.workflow',
                'vinculacoesEtiquetas',
                'vinculacoesEtiquetas.etiqueta',
            ]);
            return this._tarefaService.save(action.payload.tarefa, JSON.stringify({'especieProcessoWorkflow': true}), populate).pipe(
                map((response) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Tarefa id ' + action.payload.tarefa.id + ' redistribuída com sucesso.',
                        status: 1, // sucesso
                        lote: action.payload.loteId,
                        redo: 'inherent'
                    }));
                    this._store.dispatch(new AddData<Tarefa>({
                        data: [response],
                        schema: tarefaSchema
                    }));
                    return new fromStore.RedistribuirTarefaSuccess(response.id);
                }),
                catchError((err) => {
                    const payload = {
                        id: action.payload.tarefa.id,
                        error: err
                    };
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Erro ao redistribuir a tarefa id ' + action.payload.tarefa.id + '!',
                        status: 2, // erro
                        lote: action.payload.loteId,
                        redo: 'inherent'
                    }));
                    console.log(err);
                    this._store.dispatch(new RedistribuirTarefaFailed(payload));
                    return of(new fromStore.RedistribuirTarefaFailed(payload));
                })
            );
        }, 25)
    ));
    /**
     * Dar Ciencia Tarefa
     *
     * @type {Observable<any>}
     */
    darCienciaTarefa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.DarCienciaTarefa>(fromStore.DAR_CIENCIA_TAREFA),
        tap(action => this._store.dispatch(new DarCienciaTarefa({
            tarefa: action.payload.tarefa,
            operacaoId: action.payload.operacaoId,
            loteId: action.payload.loteId,
            redo: action.payload.redo,
            url: action.payload.url
        }))),
        buffer(this._store.pipe(select(getBufferingCiencia))),
        mergeAll(),
        withLatestFrom(this._store.pipe(select(getCienciaId))),
        mergeMap(([action, cienciaId]) => {
            if (cienciaId === null) {
                return of(new fromStore.DarCienciaTarefaCancelSuccess({
                    tarefa: action.payload.tarefa.id,
                    url: action.payload.url
                }));
            }
            return of(new fromStore.DarCienciaTarefaSuccess(action.payload.tarefa.id));
        }, 25)
    ));
    /**
     * Dar Ciencia Tarefa Success
     */
    darCienciaTarefaSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.DarCienciaTarefaSuccess>(fromStore.DAR_CIENCIA_TAREFA_SUCCESS),
        tap(() => {
            this._router.navigate([
                this.routerState.url.split('/tarefa/')[0] + '/tarefa/' + this.routerState.params.tarefaHandle + '/encaminhamento'
            ]).then();
        })
    ), {dispatch: false});
    /**
     * Dar Ciencia Tarefa Cancel Success
     */
    darCienciaTarefaCancelSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.DarCienciaTarefaCancelSuccess>(fromStore.DAR_CIENCIA_TAREFA_CANCEL_SUCCESS),
        tap((action) => {
            this._router.navigate([action.payload.url]).then();
        })
    ), {dispatch: false});
    /**
     * Redistribuir Tarefa Success
     */
    redistribuirTarefaSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.RedistribuirTarefaSuccess>(fromStore.REDISTRIBUIR_TAREFA_SUCCESS),
        tap((action) => {
            this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' +
            this.routerState.params.typeHandle + '/' +
            '/' + this.routerState.params.targetHandle]).then(() => {
                this._store.dispatch(new RedistribuirTarefaSuccess(action.payload));
            });
        })
    ), {dispatch: false});
    /**
     * Redistribuir Tarefa Cancel Success
     */
    redistribuirTarefaCancelSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.RedistribuirTarefaCancelSuccess>(fromStore.REDISTRIBUIR_TAREFA_CANCEL_SUCCESS),
        tap((action) => {
            this._router.navigate([action.payload.url]).then();
        })
    ), {dispatch: false});
    /**
     * Create Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    createVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.CreateVinculacaoEtiqueta>(fromStore.CREATE_VINCULACAO_ETIQUETA),
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
                    return of(new fromStore.CreateVinculacaoEtiquetaFailed(err));
                })
            );
        }, 25)
    ));
    /**
     * Save conteúdo vinculação etiqueta na tarefa
     *
     * @type {Observable<any>}
     */
    saveConteudoVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.SaveConteudoVinculacaoEtiqueta>(fromStore.SAVE_CONTEUDO_VINCULACAO_ETIQUETA),
        mergeMap(action => this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta, action.payload.changes).pipe(
            mergeMap(response => [
                new fromStore.SaveConteudoVinculacaoEtiquetaSuccess(response.id),
                new UpdateData<VinculacaoEtiqueta>({
                    id: response.id,
                    schema: vinculacaoEtiquetaSchema,
                    changes: {conteudo: response.conteudo, privada: response.privada}
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new fromStore.SaveConteudoVinculacaoEtiquetaFailed(err));
            })
        ))
    ));
    /**
     * Delete Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    deleteVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.DeleteVinculacaoEtiqueta>(fromStore.DELETE_VINCULACAO_ETIQUETA),
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
                    return of(new fromStore.DeleteVinculacaoEtiquetaFailed(action.payload));
                })
            )
        )
    ));
    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetDocumentos>(fromStore.GET_DOCUMENTOS),
        switchMap(action => this._documentoService.query(
            JSON.stringify(action.payload),
            25,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'tipoDocumento',
                'tipoDocumento.especieDocumento',
                'componentesDigitais']))),
        mergeMap(response => [
            new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
            new fromStore.GetDocumentosSuccess({
                loaded: {
                    id: 'tarefaHandle',
                    value: this.routerState.params.tarefaHandle
                },
                entitiesId: response['entities'].map(documento => documento.id),
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new fromStore.GetDocumentosFailed(err));
        })
    ));

    uploadConcluido: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.UploadConcluido>(fromStore.UPLOAD_CONCLUIDO),
        tap((action) => {
            this._store.dispatch(new fromStore.GetEtiquetasTarefas(action.payload));
        })
    ), {dispatch: false});

    getEtiquetasTarefas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetEtiquetasTarefas>(fromStore.GET_ETIQUETAS_TAREFAS),
        mergeMap(action => this._vinculacaoEtiquetaService.query(
            JSON.stringify({
                'tarefa.id': 'eq:' + action.payload,
            }),
            25,
            0,
            JSON.stringify({}),
            JSON.stringify(['etiqueta'])).pipe(
            mergeMap(response => [
                new fromStore.GetEtiquetasTarefasSuccess(response),
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
            return of(new fromStore.GetEtiquetasTarefasFailed(err));
        })
    ));

    atualizaEtiquetaMinuta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.AtualizaEtiquetaMinuta>(fromStore.ATUALIZA_ETIQUETA_MINUTA),
        map(action => action.payload),
        mergeMap(documentoId => of(documentoId).pipe(
            withLatestFrom(this._store.pipe(select(fromStore.getVinculacaoEtiquetaByDocumentoId(documentoId))).pipe(
                map(vinculacaoEtiqueta => vinculacaoEtiqueta)
            ))
        ), 25),
        mergeMap(([, vinculacao]) => {
            if (vinculacao?.id) {
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
        }, 25),
        catchError((err) => {
            console.log(err);
            return err;
        })
    ), {dispatch: false});

    removeEtiquetaMinutaTarefa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.RemoveEtiquetaMinutaTarefa>(fromStore.REMOVE_ETIQUETA_MINUTA_TAREFA),
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
    removeEtiquetaOficioTarefa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.RemoveEtiquetaOficioTarefa>(fromStore.REMOVE_ETIQUETA_OFICIO_TAREFA),
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

    /* Ações referentes ao painel de minutas, que a listagem de tarefas escutará e atualizará as informações das
     * tarefas à medida que as exclusões são concluídas
     */
    deleteDocumentoBloco: any = createEffect(() => this._actions.pipe(
        ofType<MinutasActions.DeleteDocumentoSuccess>(MinutasActions.DELETE_DOCUMENTO_BLOCO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.RemoveEtiquetaMinutaTarefa(action.payload));
        })
    ), {dispatch: false});
    undeleteDocumento: any = createEffect(() => this._actions.pipe(
        ofType<MinutasActions.UndeleteDocumentoSuccess>(MinutasActions.UNDELETE_DOCUMENTO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.GetEtiquetasTarefas(action.payload.tarefaOrigem.id));
        })
    ), {dispatch: false});
    /* Ações referentes ao editor de modelos de minutas,
     * que o painel de tarefas fica observando
     */
    createModelo: any = createEffect(() => this._actions.pipe(
        ofType<ModeloComponenteDigitalActions.SaveComponenteDigitalSuccess>(ModeloComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.GetEtiquetasTarefas(action.payload.tarefaId));
        })
    ), {dispatch: false});
    /* Ações referentes ao editor de modelos de minutas em bloco,
     * que o painel de tarefas fica observando
     */
    createModeloBloco: any = createEffect(() => this._actions.pipe(
        ofType<ModeloComponenteDigitalBlocoActions.SaveComponenteDigitalSuccess>(ModeloComponenteDigitalBlocoActions.SAVE_COMPONENTE_DIGITAL_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.GetEtiquetasTarefas(action.payload.tarefaId));
        })
    ), {dispatch: false});
    /* Ações referentes à criação de ofício de dentro da listagem de tarefas */
    createOficio: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoCreateActions.SaveDocumentoAvulsoSuccess>(DocumentoAvulsoCreateActions.SAVE_DOCUMENTO_AVULSO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.GetEtiquetasTarefas(action.payload));
        })
    ), {dispatch: false});
    /* Ações referentes ao editor de modelos de minutas por acervo,
     * que o painel de tarefas fica observando
     */
    createAcervo: any = createEffect(() => this._actions.pipe(
        ofType<AcervoComponenteDigitalActions.SaveComponenteDigitalSuccess>(AcervoComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.GetEtiquetasTarefas(action.payload.tarefaId));
        })
    ), {dispatch: false});
    /* Ações referentes ao editor de modelos de minutas em bloco por acervo,
     * que o painel de tarefas fica observando
     */
    createAcervoBloco: any = createEffect(() => this._actions.pipe(
        ofType<AcervoComponenteDigitalBlocoActions.SaveComponenteDigitalSuccess>(AcervoComponenteDigitalBlocoActions.SAVE_COMPONENTE_DIGITAL_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.GetEtiquetasTarefas(action.payload.tarefaId));
        })
    ), {dispatch: false});
    /* Ações referentes ao painel atividade-create, que a listagem de tarefas escutará e atualizará as informações das
     * tarefas à medida que os uploads/deletes são concluídos
     */
    saveComponenteDigitalAtividade: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateActions.SaveComponenteDigitalSuccess>(AtividadeCreateActions.SAVE_COMPONENTE_DIGITAL_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.GetEtiquetasTarefas(action.payload.tarefa.id));
        })
    ), {dispatch: false});
    deleteDocumentoAtividade: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateActions.DeleteDocumentoSuccess>(AtividadeCreateActions.DELETE_DOCUMENTO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.RemoveEtiquetaMinutaTarefa(action.payload));
        })
    ), {dispatch: false});
    remeteOficio: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoOficioActions.RemeterDocumentoAvulsoSuccess>(DocumentoOficioActions.REMETER_DOCUMENTO_AVULSO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.RemoveEtiquetaMinutaTarefa(action.payload));
            this._store.dispatch(new fromStore.RemoveEtiquetaOficioTarefa({
                uuid: action.payload.documentoAvulsoUuid,
                tarefaId: action.payload.tarefaId
            }));
            this._store.dispatch(new fromStore.GetEtiquetasTarefas(action.payload.tarefaId));
        })
    ), {dispatch: false});
    deleteDocumentoOficios: any = createEffect(() => this._actions.pipe(
        ofType<OficiosDocumentosActions.DeleteDocumentoSuccess>(OficiosDocumentosActions.DELETE_DOCUMENTO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.RemoveEtiquetaMinutaTarefa(action.payload));
            if (action.payload.documentoAvulsoUuid) {
                this._store.dispatch(new fromStore.RemoveEtiquetaOficioTarefa({
                    uuid: action.payload.documentoAvulsoUuid,
                    tarefaId: action.payload.tarefaId
                }));
            }
        })
    ), {dispatch: false});
    undeleteDocumentoOficios: any = createEffect(() => this._actions.pipe(
        ofType<OficiosDocumentosActions.UndeleteDocumentoSuccess>(OficiosDocumentosActions.UNDELETE_DOCUMENTO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.GetEtiquetasTarefas(action.payload.documento.tarefaOrigem.id));
        })
    ), {dispatch: false});
    alteraTipoDocumentoAtividadeEditor: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoEditAtividadeDocumentosActions.UpdateDocumentoSuccess>(DocumentoEditAtividadeDocumentosActions.UPDATE_DOCUMENTO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.AtualizaEtiquetaMinuta(action.payload));
        })
    ), {dispatch: false});
    deleteDocumentoAtividadeBloco: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeBlocoCreateActions.DeleteDocumentoSuccess>(AtividadeBlocoCreateActions.DELETE_DOCUMENTO_BLOCO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.RemoveEtiquetaMinutaTarefa(action.payload));
        })
    ), {dispatch: false});
    converteDocumentoPdfAtividade: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateActions.ConverteToPdfSucess>(AtividadeCreateActions.CONVERTE_DOCUMENTO_SUCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.AtualizaEtiquetaMinuta(action.payload));
        })
    ), {dispatch: false});
    converteDocumentoHtmlAtividade: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateActions.ConverteToHtmlSucess>(AtividadeCreateActions.CONVERTE_DOCUMENTO_HTML_SUCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.AtualizaEtiquetaMinuta(action.payload));
        })
    ), {dispatch: false});
    converteDocumentoPdfAtividadeBloco: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeBlocoCreateActions.ConverteToPdfSucess>(AtividadeBlocoCreateActions.CONVERTE_DOCUMENTO_SUCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.AtualizaEtiquetaMinuta(action.payload));
        })
    ), {dispatch: false});
    converteDocumentoHtmlAtividadeBloco: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeBlocoCreateActions.ConverteToHtmlSucess>(AtividadeBlocoCreateActions.CONVERTE_DOCUMENTO_HTML_SUCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.AtualizaEtiquetaMinuta(action.payload));
        })
    ), {dispatch: false});
    /**
     * Remove Minutas da Tarefa que foram juntadas a processo através do componente de movimentar
     *
     * @type {Observable<any>}
     */
    removeMinutasTarefa: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateActions.RemoveMinutasTarefa>(AtividadeCreateActions.REMOVE_MINUTAS_TAREFA),
        tap((action) => {
            action.payload.documentos.forEach((documento) => {
                this._store.dispatch(new fromStore.RemoveEtiquetaMinutaTarefa({
                    uuid: documento.uuid,
                    tarefaId: action.payload.tarefaId
                }));
            });
        })
    ), {dispatch: false});
    /**
     * Remove Minutas da Tarefa que foram juntadas a processo através do componente de movimentar em bloco
     *
     * @type {Observable<any>}
     */
    removeMinutasTarefaBloco: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeBlocoCreateActions.RemoveMinutasTarefa>(AtividadeBlocoCreateActions.REMOVE_MINUTAS_TAREFA),
        tap((action) => {
            action.payload.documentos.forEach((documento) => {
                this._store.dispatch(new fromStore.RemoveEtiquetaMinutaTarefa({
                    uuid: documento.uuid,
                    tarefaId: action.payload.tarefaId
                }));
            });
        })
    ), {dispatch: false});
    /**
     * Remove Minutas da Tarefa que foram juntadas a processo através do componente de documentos
     *
     * @type {Observable<any>}
     */
    documentoRemoveMinutasTarefa: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoEditAtividadeDocumentosActions.RemoveMinutasTarefa>(DocumentoEditAtividadeDocumentosActions.REMOVE_MINUTAS_TAREFA),
        tap((action) => {
            action.payload.documentos.forEach((documento) => {
                this._store.dispatch(new fromStore.RemoveEtiquetaMinutaTarefa({
                    uuid: documento.uuid,
                    tarefaId: action.payload.tarefaId
                }));
            });
        })
    ), {dispatch: false});

    aprovarSugestao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.AprovarSugestao>(fromStore.APROVAR_SUGESTAO),
        mergeMap(action => this._vinculacaoEtiquetaService.aprovarSugestao(
            action.payload.vinculacaoEtiqueta,
            {
                acoesExecucaoSugestao: action.payload.acoesExecucaoSugestao
            },
            JSON.stringify(['populateAll'])
        ).pipe(
            mergeMap(response => [
                new fromStore.AprovarSugestaoSuccess(response.id),
                new UpdateData<VinculacaoEtiqueta>({
                    id: response.id,
                    schema: vinculacaoEtiquetaSchema,
                    changes: {
                        dataHoraAprovacaoSugestao: response.dataHoraAprovacaoSugestao,
                        usuarioAprovacaoSugestao: response.usuarioAprovacaoSugestao,
                        objectContext: response.objectContext
                    }
                }),
                new fromStore.GetTarefa(action.payload.tarefa)
            ]),
            catchError((err) => of(new fromStore.AprovarSugestaoFailed(err)))
        ))
    ));

    reloadVinculacoesEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.ReloadVinculacaoEtiqueta>(fromStore.RELOAD_VINCULACAO_ETIQUETA),
        switchMap(action => this._vinculacaoEtiquetaService.query(
            JSON.stringify({'tarefa.id': `eq:${action.payload.id}`}),
            25,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll',
                'etiqueta',
                'tarefa',
        ])).pipe(
            mergeMap(response => [
                new UpdateData<Tarefa>({
                    id: action.payload.id,
                    schema: tarefaSchema,
                    changes: {
                        vinculacoesEtiquetas: response['entities'].filter((entity => !(action.payload?.vinculacoesEtiquetas ?? []).find((vinculacaoEtiqueta) => vinculacaoEtiqueta.id === entity.id)))
                    }
                })
            ])
        ))
    ));

    private _profile: Usuario;

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
        private _documentoService: DocumentoService,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
        private _store: Store<State>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._profile = _loginService.getUserProfile();
    }
}
