import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {buffer, catchError, map, mergeAll, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';

import * as TarefaDetailActions from 'app/main/apps/tarefas/tarefa-detail/store/actions/tarefa-detail.actions';

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
import {GetDocumentos} from '../../atividades/atividade-create/store';
import {LoginService} from '../../../../../auth/login/login.service';
import {getBufferingCiencia, getBufferingRedistribuir, getCienciaId, getRedistribuindoId} from '../selectors';
import {
    DarCienciaTarefa,
    RedistribuirTarefa,
    RedistribuirTarefaCancelSuccess,
    RedistribuirTarefaFailed,
    RedistribuirTarefaSuccess
} from '../../../store';

@Injectable()
export class TarefaDetailEffect {
    routerState: any;
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
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._profile = _loginService.getUserProfile();
    }

    /**
     * Get Tarefa with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getTarefa: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.GetTarefa>(TarefaDetailActions.GET_TAREFA),
                switchMap(action => this._tarefaService.get(
                        action.payload.id,
                        JSON.stringify([
                            'populateAll',
                            'processo.especieProcesso',
                            'processo.especieProcesso.generoProcesso',
                            'processo.modalidadeMeio',
                            'processo.documentoAvulsoOrigem',
                            'processo.especieProcesso.generoProcesso',
                            'processo.especieProcesso.workflow',
                            'processo.especieProcesso.workflow.especieTarefaInicial',
                            'processo.tarefaAtualWorkflow',
                            'processo.tarefaAtualWorkflow.especieTarefa',
                            'setorResponsavel.unidade',
                            'setorOrigem.unidade',
                            'especieTarefa.generoTarefa',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta'])
                    )),
                mergeMap(response => [
                    new AddData<Tarefa>({data: [response], schema: tarefaSchema}),
                    new TarefaDetailActions.GetTarefaSuccess({
                        loaded: {
                            id: 'tarefaHandle',
                            value: this.routerState.params.tarefaHandle
                        },
                        tarefa: response
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TarefaDetailActions.GetTarefaFailed(err));
                    return caught;
                })
            );

    /**
     * Deselect Tarefa Action
     */
    @Effect({dispatch: false})
    deselectTarefaAction =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.DeselectTarefaAction>(TarefaDetailActions.DESELECT_TAREFA_ACTION),
                tap(() => {
                    this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' +
                    this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle]).then();
                })
            );

    /**
     * Update Tarefa
     *
     * @type {Observable<any>}
     */
    @Effect()
    createTarefa: Observable<TarefaDetailActions.TarefaDetailActionsAll> =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.CreateTarefa>(TarefaDetailActions.CREATE_TAREFA),
                map(() => {
                    this._router.navigate([this.routerState.url + '/criar']).then();
                    return new TarefaDetailActions.CreateTarefaSuccess();
                })
            );


    /**
     * Delete Tarefa
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteTarefa: Observable<TarefaDetailActions.TarefaDetailActionsAll> =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.DeleteTarefa>(TarefaDetailActions.DELETE_TAREFA),
                mergeMap(action => this._tarefaService.destroy(action.payload).pipe(
                            map(response => new TarefaDetailActions.DeleteTarefaSuccess(response.id)),
                            catchError((err) => {
                                console.log(err);
                                return of(new TarefaDetailActions.DeleteTarefaFailed(action.payload));
                            })
                        )
                ));

    /**
     * Save Tarefa
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveTarefa: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.SaveTarefa>(TarefaDetailActions.SAVE_TAREFA),
                switchMap(action => this._tarefaService.save(action.payload).pipe(
                        mergeMap((response: Tarefa) => [
                            new TarefaDetailActions.SaveTarefaSuccess(),
                            new AddData<Tarefa>({
                                data: [response],
                                schema: tarefaSchema
                            }), new OperacoesActions.Resultado({
                                type: 'tarefa',
                                content: `Tarefa id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TarefaDetailActions.SaveTarefaFailed(err));
                        })
                    ))
            );

    /**
     * Redistribuir Tarefa
     *
     * @type {Observable<any>}
     */
    @Effect()
    redistribuirTarefa: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.RedistribuirTarefa>(TarefaDetailActions.REDISTRIBUIR_TAREFA),
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
                        return of(new TarefaDetailActions.RedistribuirTarefaCancelSuccess({
                            tarefa: action.payload.tarefa.id,
                            url: action.payload.url
                        }));
                    }
                    return this._tarefaService.save(action.payload.tarefa).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'tarefa',
                                content: 'Tarefa id ' + action.payload.tarefa.id + ' redistribuída com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId,
                                redo: 'inherent'
                            }));
                            new AddData<Tarefa>({
                                data: [response],
                                schema: tarefaSchema
                            });
                            return new TarefaDetailActions.RedistribuirTarefaSuccess(response.id);
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
                            return of(new TarefaDetailActions.RedistribuirTarefaFailed(payload));
                        })
                    );
                }, 25)
            );

    /**
     * Dar Ciencia Tarefa
     *
     * @type {Observable<any>}
     */
    @Effect()
    darCienciaTarefa: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.DarCienciaTarefa>(TarefaDetailActions.DAR_CIENCIA_TAREFA),
                tap((action) => {
                    this._store.dispatch(new DarCienciaTarefa({
                        tarefa: action.payload.tarefa,
                        operacaoId: action.payload.operacaoId,
                        loteId: action.payload.loteId,
                        redo: action.payload.redo,
                        url: action.payload.url
                    }));
                }),
                buffer(this._store.pipe(select(getBufferingCiencia))),
                mergeAll(),
                withLatestFrom(this._store.pipe(select(getCienciaId))),
                mergeMap(([action, cienciaId]) => {
                    if (cienciaId === null) {
                        return of(new TarefaDetailActions.DarCienciaTarefaCancelSuccess({
                            tarefa: action.payload.tarefa.id,
                            url: action.payload.url
                        }));
                    }
                    return of(new TarefaDetailActions.DarCienciaTarefaSuccess(action.payload.tarefa.id));
                }, 25)
            );

    /**
     * Dar Ciencia Tarefa Success
     */
    @Effect({dispatch: false})
    darCienciaTarefaSuccess: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.DarCienciaTarefaSuccess>(TarefaDetailActions.DAR_CIENCIA_TAREFA_SUCCESS),
                tap((action) => {
                    this._router.navigate([
                        this.routerState.url.split('/tarefa/')[0] + '/tarefa/' + this.routerState.params.tarefaHandle + '/encaminhamento'
                    ]).then();
                })
            );

    /**
     * Dar Ciencia Tarefa Cancel Success
     */
    @Effect({dispatch: false})
    darCienciaTarefaCancelSuccess: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.DarCienciaTarefaCancelSuccess>(TarefaDetailActions.DAR_CIENCIA_TAREFA_CANCEL_SUCCESS),
                tap((action) => {
                    this._router.navigate([action.payload.url]).then();
                })
            );

    /**
     * Redistribuir Tarefa Success
     */
    @Effect({dispatch: false})
    redistribuirTarefaSuccess: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.RedistribuirTarefaSuccess>(TarefaDetailActions.REDISTRIBUIR_TAREFA_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' +
                    this.routerState.params.typeHandle + '/' +
                    '/' + this.routerState.params.targetHandle]).then(() => {
                        this._store.dispatch(new RedistribuirTarefaSuccess(action.payload));
                    });
                })
            );

    /**
     * Redistribuir Tarefa Cancel Success
     */
    @Effect({dispatch: false})
    redistribuirTarefaCancelSuccess: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.RedistribuirTarefaCancelSuccess>(TarefaDetailActions.REDISTRIBUIR_TAREFA_CANCEL_SUCCESS),
                tap((action) => {
                    console.log(action.payload.url);
                    this._router.navigate([action.payload.url]).then();
                })
            );

    /**
     * Create Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    @Effect()
    createVinculacaoEtiqueta: Observable<any> =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.CreateVinculacaoEtiqueta>(TarefaDetailActions.CREATE_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                    const vinculacaoEtiqueta = new VinculacaoEtiqueta();
                    vinculacaoEtiqueta.tarefa = action.payload.tarefa;
                    vinculacaoEtiqueta.etiqueta = action.payload.etiqueta;
                    return this._vinculacaoEtiquetaService.save(vinculacaoEtiqueta).pipe(
                        tap(response => response.tarefa = null),
                        mergeMap(response => [
                            new AddChildData<VinculacaoEtiqueta>({
                                data: [response],
                                childSchema: vinculacaoEtiquetaSchema,
                                parentSchema: tarefaSchema,
                                parentId: action.payload.tarefa.id
                            }),
                            new OperacoesActions.Resultado({
                                type: 'tarefa',
                                content: `Tarefa id ${response.id} etiquetada com sucesso!`,
                                dateTime: response.criadoEm
                            }),
                            new GetDocumentos()
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TarefaDetailActions.CreateVinculacaoEtiquetaFailed(err));
                        })
                    );
                })
            );

    /**
     * Save conteúdo vinculação etiqueta na tarefa
     *
     * @type {Observable<any>}
     */
    @Effect()
    SaveConteudoVinculacaoEtiqueta: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.SaveConteudoVinculacaoEtiqueta>(TarefaDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA),
                mergeMap(action => this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta, action.payload.changes).pipe(
                        mergeMap(response => [
                            new TarefaDetailActions.SaveConteudoVinculacaoEtiquetaSuccess(response.id),
                            new UpdateData<VinculacaoEtiqueta>({
                                id: response.id,
                                schema: vinculacaoEtiquetaSchema,
                                changes: {conteudo: response.conteudo, privada: response.privada}
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TarefaDetailActions.SaveConteudoVinculacaoEtiquetaFailed(err));
                        })
                    ))
            );


    /**
     * Delete Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteVinculacaoEtiqueta: Observable<any> =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.DeleteVinculacaoEtiqueta>(TarefaDetailActions.DELETE_VINCULACAO_ETIQUETA),
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
                                return of(new TarefaDetailActions.DeleteVinculacaoEtiquetaFailed(action.payload));
                            })
                        )
                ));

    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentos: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.GetDocumentos>(TarefaDetailActions.GET_DOCUMENTOS),
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
                    new TarefaDetailActions.GetDocumentosSuccess({
                        loaded: {
                            id: 'tarefaHandle',
                            value: this.routerState.params.tarefaHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TarefaDetailActions.GetDocumentosFailed(err));
                    return caught;
                })
            );
}
