import {AddChildData, AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {
    assunto as assuntoSchema,
    interessado as interessadoSchema,
    processo as processoSchema,
    tarefa as tarefaSchema
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
    switchMap,
    tap,
    withLatestFrom
} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TarefasActions from '../actions/tarefas.actions';

import {Tarefa} from '@cdk/models';
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
    getDistribuindoTarefaIds
} from '../selectors';
import * as fromStore from '../index';
import {UnloadDocumentos, UnloadJuntadas} from '../../../processo/processo-view/store';

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
            JSON.stringify(action.payload.context))),
        concatMap(response => [
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
        catchError((err) => {
            console.log(err);
            return of(new TarefasActions.GetTarefasFailed(err));
        })
    ));
    /**
     * Update Tarefa
     *
     * @type {Observable<any>}
     */
    setCurrentTarefa: Observable<TarefasActions.TarefasActionsAll> = createEffect(() => this._actions.pipe(
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
                    new AddData<Tarefa>({
                        data: [response],
                        schema: tarefaSchema
                    });
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
            } else if (this.routerState.url.indexOf('bloco') > 0) {
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
        mergeMap(() => this._tarefaService.gerarRelatorioTarefaExcel().pipe(
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
                status: 1, // carregando
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

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
        public _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router,
        private _assuntoService: AssuntoService,
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
