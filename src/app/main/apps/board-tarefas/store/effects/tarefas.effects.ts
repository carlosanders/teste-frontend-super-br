import {AddChildData, AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {
    tarefa as tarefaSchema,
    interessado as interessadoSchema,
    processo as processoSchema,
    assunto as assuntoSchema,
    folder as folderSchema
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
    map, mergeAll,
    mergeMap,
    switchMap,
    tap,
    withLatestFrom
} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TarefasActions from '../actions/tarefas.actions';

import {Assunto, Folder, Interessado, Tarefa} from '@cdk/models';
import {TarefaService} from '@cdk/services/tarefa.service';


import {Router} from '@angular/router';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

import {
    getBufferingCiencia,
    getBufferingDelete,
    getBufferingDistribuir,
    getCienciaTarefaIds,
    getDeletingTarefaIds,
    getDistribuindoTarefaIds
} from '../selectors';
import {InteressadoService} from "../../../../../../@cdk/services/interessado.service";
import {AssuntoService} from "../../../../../../@cdk/services/assunto.service";

@Injectable()
export class TarefasEffect {
    routerState: any;

    constructor(private _actions: Actions,
                private _tarefaService: TarefaService,
                private _loginService: LoginService,
                private _interessadoService: InteressadoService,
                private _assuntoService: AssuntoService,
                private _store: Store<State>,
                private _router: Router)
    {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }

    getTarefas: Observable<any> = createEffect(() => {
        return this._actions
            .pipe(
                ofType<TarefasActions.GetTarefas>(TarefasActions.GET_TAREFAS),
                concatMap(action => this._tarefaService.query(
                    JSON.stringify({
                        ...action.payload.pagination.filter,
                        ...action.payload.pagination.folderFilter,
                        ...action.payload.pagination.listFilter,
                        ...action.payload.pagination.etiquetaFilter
                    }),
                    action.payload.pagination.limit,
                    action.payload.pagination.offset,
                    JSON.stringify(action.payload.pagination.sort),
                    JSON.stringify(action.payload.pagination.populate),
                    JSON.stringify(action.payload.pagination.context)).pipe(
                        concatMap(response => {
                            return [
                                new AddData<Tarefa>({data: response['entities'], schema: tarefaSchema}),
                                new TarefasActions.GetTarefasSuccess({
                                    entitiesId: response['entities'].map(tarefa => tarefa.id),
                                    nome: action.payload.nome,
                                    total: response['total']
                                })
                            ]
                        }),
                        catchError((err, caught) => {
                            this._store.dispatch(new TarefasActions.GetTarefasFailed({
                                error: err,
                                nome: action.payload.nome
                            }));
                            return caught;
                        })
                    )
                )
            );
    });

    deleteTarefa: Observable<TarefasActions.TarefasActionsAll> = createEffect(() => {
        return this._actions
            .pipe(
                ofType<TarefasActions.DeleteTarefa>(TarefasActions.DELETE_TAREFA),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Apagando a tarefa id ' + action.payload.tarefaId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId,
                        redo: action.payload.redo,
                        undo: action.payload.undo
                    }));
                }),
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
                            return of(new TarefasActions.DeleteTarefaFailed(payload));
                        })
                    );
                }, 25)
            );
    });

    undeleteTarefa: Observable<TarefasActions.TarefasActionsAll> = createEffect(() => {
        return this._actions
            .pipe(
                ofType<TarefasActions.DeleteTarefa>(TarefasActions.UNDELETE_TAREFA),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Restaurando a tarefa id ' + action.payload.tarefa.id + '...',
                        status: 0, // carregando
                    }));
                }),
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
                            return of(new TarefasActions.UndeleteTarefaFailed(payload));
                        })
                    );
                }, 25)
            );
    });

    toggleUrgenteTarefa: any = createEffect(() => {
        return this._actions
            .pipe(
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
                        return of(new TarefasActions.ToggleUrgenteTarefaFailed(action.payload));
                    })
                ))
            );
    });

    distribuirSelectedTarefas: Observable<TarefasActions.TarefasActionsAll> = createEffect(() => {
        return this._actions
            .pipe(
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
                            content: 'Operação de distribuir a tarefa id ' + action.payload.tarefa.id + ' foi cancelada!',
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
                            return of(new TarefasActions.DistribuirTarefasFailed(payload));
                        })
                    );
                }, 25)
            );
    });

    darCienciaTarefa: any = createEffect(() => {
        return this._actions
            .pipe(
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
                            return of(new TarefasActions.DarCienciaTarefaFailed(payload));
                        })
                    );
                }, 25)
            );
    });

    gerarRelatorioTarefaExcel: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<TarefasActions.GerarRelatorioTarefaExcel>(TarefasActions.GERAR_RELATORIO_TAREFA_EXCEL),
                mergeMap(action => this._tarefaService.gerarRelatorioTarefaExcel().pipe(
                    mergeMap(response => [
                        new TarefasActions.GerarRelatorioTarefaExcelSuccess(response.id),
                    ]),
                    catchError((err) => {
                        return of(new TarefasActions.GerarRelatorioTarefaExcelFailed());
                    })
                ))
            );
    });

    getInteressados: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<TarefasActions.GetTarefasInteressados>(TarefasActions.GET_TAREFAS_INTERESSADOS),
                mergeMap(action => this._interessadoService.query(
                        JSON.stringify({
                            ...action.payload.params.filter
                        }),
                        action.payload.params.limit,
                        action.payload.params.offset,
                        JSON.stringify(action.payload.params.sort),
                        JSON.stringify(action.payload.params.populate)).pipe(
                        mergeMap(response => [
                            new TarefasActions.GetTarefasInteressadosSuccess({
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
                        catchError((err, caught) => {
                            this._store.dispatch(new TarefasActions.GetTarefasInteressadosFailed(action.payload.processoId));
                            return caught;
                        })
                    )),
            );
    });

    getAssuntos: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<TarefasActions.GetTarefasAssuntos>(TarefasActions.GET_TAREFAS_ASSUNTOS),
                mergeMap(action => this._assuntoService.query(
                        JSON.stringify({
                            ...action.payload.params.filter
                        }),
                        action.payload.params.limit,
                        action.payload.params.offset,
                        JSON.stringify(action.payload.params.sort),
                        JSON.stringify(action.payload.params.populate)).pipe(
                        mergeMap(response => [
                            new TarefasActions.GetTarefasAssuntosSuccess({
                                processoId: action.payload.processoId,
                                total: response['total']
                            }),
                            new AddChildData<Assunto>({
                                data: response['entities'],
                                childSchema: assuntoSchema,
                                parentSchema: processoSchema,
                                parentId: action.payload.processoId
                            }),
                        ]),
                        catchError((err, caught) => {
                            this._store.dispatch(new TarefasActions.GetTarefasAssuntosFailed(action.payload.processoId));
                            return caught;
                        })
                    )),
            );
    });

    changeTarefasFolder: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<TarefasActions.ChangeTarefasFolder>(TarefasActions.CHANGE_TAREFAS_FOLDER),
                tap(action => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: `Movendo a tarefa id ${action.payload.tarefa.id} para a pasta ${(action.payload.newFolder?.nome || 'Entrada')}...`,
                        status: 0, // carregando
                        lote: action.payload.loteId,
                        redo: action.payload.redo,
                        undo: action.payload.undo
                    }));

                    if (action.payload.newFolder?.id) {
                        this._store.dispatch(new UpdateData<Tarefa>({
                            id: action.payload.tarefa.id,
                            schema: tarefaSchema,
                            changes: {folder: action.payload.newFolder.id}
                        }));
                    } else {
                        this._store.dispatch(new UpdateData<Tarefa>({
                            id: action.payload.tarefa.id,
                            schema: tarefaSchema,
                            changes: {folder: {id: null}}
                        }));
                    }
                }),
                concatMap((action) => {
                    const folder = action.payload.newFolder?.id || null;

                    return this._tarefaService.patch(
                        action.payload.tarefa,
                        {folder: folder},
                        JSON.stringify(
                            [
                                'folder',
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
                                'vinculacoesEtiquetas',
                                'vinculacoesEtiquetas.etiqueta',
                                'processo.especieProcesso.workflow',
                                'workflow'
                            ]
                        )
                    ).pipe(
                        mergeMap((response: any) => [
                            new TarefasActions.ChangeTarefasFolderSuccess({
                                ...action.payload,
                                tarefa: response
                            }),
                            new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'tarefa',
                                content: `Tarefa id ${action.payload.tarefa.id} movida para a pasta ${(action.payload.newFolder?.nome || 'Entrada')} com sucesso!`,
                                status: 1, // sucesso
                                lote: action.payload.loteId,
                                redo: 'inherent',
                                undo: 'inherent'
                            })
                        ]),
                        catchError((err) => {
                            this._store.dispatch(new UpdateData<Tarefa>({
                                id: action.payload.tarefa.id,
                                schema: tarefaSchema,
                                changes: {folder: (action.payload.oldFolder || null )}
                            }));

                            this._store.dispatch(
                                new OperacoesActions.Operacao({
                                    id: action.payload.operacaoId,
                                    type: 'tarefa',
                                    content: `Erro ao mover a tarefa id ${action.payload.tarefa.id} para a pasta ${(action.payload.newFolder?.nome || 'Entrada')}!`,
                                    status: 2, // erro
                                    lote: action.payload.loteId,
                                    redo: 'inherent',
                                    undo: 'inherent'
                                })
                            );

                            return of(new TarefasActions.ChangeTarefasFolderFailed({
                                ...action.payload,
                                error: err
                            }));
                        })
                    );
                })
            );
    });

}
