import {AddChildData, AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {
    tarefa as tarefaSchema,
    interessado as interessadoSchema,
    processo as processoSchema,
    assunto as assuntoSchema
} from '@cdk/normalizr';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LoginService} from 'app/main/auth/login/login.service';

import {Observable, of} from 'rxjs';
import {
    catchError,
    concatMap,
    filter,
    map,
    mergeMap,
    tap
} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TarefasActions from '../actions/tarefas.actions';

import {Assunto, Interessado, Tarefa} from '@cdk/models';
import {TarefaService} from '@cdk/services/tarefa.service';


import {Router} from '@angular/router';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

import {InteressadoService} from '@cdk/services/interessado.service';
import {AssuntoService} from '@cdk/services/assunto.service';

@Injectable()
export class TarefasEffect {
    routerState: any;
    getTarefas: Observable<any> = createEffect(() => this._actions.pipe(
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
                concatMap(response => [
                    new AddData<Tarefa>({data: response['entities'], schema: tarefaSchema}),
                    new TarefasActions.GetTarefasSuccess({
                        entitiesId: response['entities'].map(tarefa => tarefa.id),
                        nome: action.payload.nome,
                        total: response['total']
                    })
                ]),
                catchError(err => of(new TarefasActions.GetTarefasFailed({
                    error: err,
                    nome: action.payload.nome
                })))
            )
        )
    ));
    deleteTarefa: Observable<TarefasActions.TarefasActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.DeleteTarefas>(TarefasActions.DELETE_TAREFAS),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Apagando a tarefa id ' + action.payload.tarefa.id + '...',
            status: 0, // carregando
            lote: action.payload.loteId,
            redo: action.payload.redo,
            undo: action.payload.undo
        }))),
        mergeMap(action => this._tarefaService.destroy(action.payload.tarefa.id).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Tarefa id ' + action.payload.tarefa.id + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId,
                    redo: 'inherent',
                    undo: 'inherent'
                }));
                this._store.dispatch(new UpdateData<Tarefa>({
                    id: response.id,
                    schema: tarefaSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new TarefasActions.DeleteTarefasSuccess(action.payload);
            }),
            catchError((err) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Erro ao apagar a tarefa id ' + action.payload.tarefa.id + '!',
                    status: 2, // erro
                    lote: action.payload.loteId,
                    redo: 'inherent',
                    undo: 'inherent'
                }));
                return of(new TarefasActions.DeleteTarefasFailed({
                    ...action.payload,
                    error: err
                }));
            })
        ), 25)
    ));
    undeleteTarefa: Observable<TarefasActions.TarefasActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.UndeleteTarefas>(TarefasActions.UNDELETE_TAREFAS),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Restaurando a tarefa id ' + action.payload.tarefa.id + '...',
            status: 0, // carregando
        }))),
        mergeMap((action) => {
            const folder = action.payload.folder ? action.payload.folder.id : null;
            const context: any = {'especieProcessoWorkflow': true};
            if (folder) {
                context.folderId = folder;
            }
            return this._tarefaService.undelete(
                action.payload.tarefa,
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
                        'vinculacaoWorkflow',
                        'vinculacaoWorkflow.workflow',
                        'vinculacoesEtiquetas',
                        'vinculacoesEtiquetas.etiqueta',
                    ]
                ),
                JSON.stringify(context)
            ).pipe(
                map((response) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Tarefa id ' + action.payload.tarefa.id + ' restaurada com sucesso.',
                        status: 1, // sucesso
                    }));
                    this._store.dispatch(new AddData<Tarefa>({
                        data: [response],
                        schema: tarefaSchema
                    }));
                    return new TarefasActions.UndeleteTarefasSuccess(action.payload);
                }),
                catchError((err) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Erro ao restaurar a tarefa id ' + action.payload.tarefa.id + '!',
                        status: 2, // erro
                    }));
                    return of(new TarefasActions.UndeleteTarefasFailed({
                        ...action.payload,
                        error: err
                    }));
                })
            );
        }, 25)
    ));
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
            catchError(err => of(new TarefasActions.ToggleUrgenteTarefaFailed(action.payload)))
        ))
    ));
    darCienciaTarefa: any = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.DarCienciaTarefas>(TarefasActions.DAR_CIENCIA_TAREFAS),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Dando ciência na tarefa id ' + action.payload.tarefa.id + '...',
            status: 0, // carregando
            lote: action.payload.loteId,
            redo: action.payload.redo,
            undo: action.payload.undo
        }))),
        mergeMap(action => this._tarefaService.ciencia(action.payload.tarefa).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Tarefa id ' + action.payload.tarefa.id + ' ciência com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId,
                    redo: 'inherent',
                    undo: 'inherent'
                }));
                this._store.dispatch(new AddData<Tarefa>({
                    data: [response],
                    schema: tarefaSchema,
                }));
                return new TarefasActions.DarCienciaTarefasSuccess(action.payload);
            }),
            catchError((err) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Erro ao dar ciência na tarefa id ' + action.payload.tarefa.id + '!',
                    status: 2, // erro
                    lote: action.payload.loteId,
                    redo: 'inherent',
                    undo: 'inherent'
                }));
                return of(new TarefasActions.DarCienciaTarefasFailed({
                    ...action.payload,
                    error: err
                }));
            })
        ), 25)
    ));
    getInteressados: any = createEffect(() => this._actions.pipe(
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
            catchError(() => of(new TarefasActions.GetTarefasInteressadosFailed(action.payload.processoId)))
        )),
    ));
    getAssuntos: any = createEffect(() => this._actions.pipe(
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
            catchError(() => of(new TarefasActions.GetTarefasAssuntosFailed(action.payload.processoId)))
        )),
    ));
    changeTarefasFolder: any = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.ChangeTarefasFolder>(TarefasActions.CHANGE_TAREFAS_FOLDER),
        tap((action) => {
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
                        'workflow'
                    ]
                ),
                JSON.stringify({'especieProcessoWorkflow': true})
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
                        changes: {folder: (action.payload.oldFolder || null)}
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
    ));

    constructor(private _actions: Actions,
                private _tarefaService: TarefaService,
                private _loginService: LoginService,
                private _interessadoService: InteressadoService,
                private _assuntoService: AssuntoService,
                private _store: Store<State>,
                private _router: Router) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

}
