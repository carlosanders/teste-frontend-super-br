import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';

import * as TarefaDetailActions from 'app/main/apps/tarefas/tarefa-detail/store/actions/tarefa-detail.actions';

import {ProcessosService} from '@cdk/services/tarefa.service';
import {Router} from '@angular/router';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {VinculacaoEtiqueta} from '@cdk/models';
import {AddChildData, AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {vinculacaoEtiqueta as vinculacaoEtiquetaSchema} from '@cdk/normalizr/vinculacao-etiqueta.schema';
import {tarefa as tarefaSchema} from '@cdk/normalizr/tarefa.schema';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';
import {DocumentoService} from '@cdk/services/documento.service';
import {Tarefa} from '@cdk/models';
import {Documento} from '@cdk/models';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {DeleteTarefaSuccess} from '../../../store/actions';
import {GetDocumentos} from '../../atividades/atividade-create/store/actions';

@Injectable()
export class TarefaDetailEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tarefaService: ProcessosService,
        private _documentoService: DocumentoService,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Tarefa with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTarefa: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.GetTarefa>(TarefaDetailActions.GET_TAREFA),
                switchMap((action) => {
                    return this._tarefaService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'processo',
                            'processo.especieProcesso',
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
                            'vinculacoesEtiquetas.etiqueta']));
                }),
                mergeMap(response => [
                    new AddData<Tarefa>({data: response['entities'], schema: tarefaSchema}),
                    new TarefaDetailActions.GetTarefaSuccess({
                        loaded: {
                            id: 'tarefaHandle',
                            value: this.routerState.params.tarefaHandle
                        },
                        tarefa: response['entities'][0]
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
     * @type {Observable<any>}
     */
    @Effect()
    deleteTarefa: Observable<TarefaDetailActions.TarefaDetailActionsAll> =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.DeleteTarefa>(TarefaDetailActions.DELETE_TAREFA),
                mergeMap((action) => {
                        return this._tarefaService.destroy(action.payload).pipe(
                            map((response) => new TarefaDetailActions.DeleteTarefaSuccess(response.id)),
                            catchError((err) => {
                                console.log(err);
                                return of(new TarefaDetailActions.DeleteTarefaFailed(action.payload));
                            })
                        );
                    }
                ));

    /**
     * Save Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    saveTarefa: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.SaveTarefa>(TarefaDetailActions.SAVE_TAREFA),
                switchMap((action) => {
                    return this._tarefaService.save(action.payload).pipe(
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
                    );
                })
            );

    /**
     * Dar Ciencia Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    darCienciaTarefa: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.DarCienciaTarefa>(TarefaDetailActions.DAR_CIENCIA_TAREFA),
                switchMap((action) => {
                    return this._tarefaService.ciencia(action.payload).pipe(
                        mergeMap((response: Tarefa) => [
                            new TarefaDetailActions.DarCienciaTarefaSuccess(action.payload),
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
                            return of(new TarefaDetailActions.SaveTarefaFailed(err));
                        })
                    );
                })
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
                    this._store.dispatch(new DeleteTarefaSuccess(action.payload.id));
                    this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' +
                    + this.routerState.params.typeHandle + '/' +
                    this.routerState.params.targetHandle + '/tarefa/' + this.routerState.params.tarefaHandle +
                    '/encaminhamento']).then();
                })
            );

    /**
     * Create Vinculacao Etiqueta
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
                        tap((response) => response.tarefa = null),
                        mergeMap((response) => [
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
     * @type {Observable<any>}
     */
    @Effect()
    SaveConteudoVinculacaoEtiqueta: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.SaveConteudoVinculacaoEtiqueta>(TarefaDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                    return this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta, action.payload.changes).pipe(
                        //@retirar: return this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta,  {conteudo: action.payload.vinculacaoEtiqueta.conteudo}).pipe(
                        mergeMap((response) => [
                            new TarefaDetailActions.SaveConteudoVinculacaoEtiquetaSuccess(response.id),
                            new UpdateData<VinculacaoEtiqueta>({
                                id: response.id,
                                schema: vinculacaoEtiquetaSchema,
                                changes: {conteudo: response.conteudo}
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TarefaDetailActions.SaveConteudoVinculacaoEtiquetaFailed(err));
                        })
                    );
                })
            );


    /**
     * Delete Vinculacao Etiqueta
     * @type {Observable<any>}
     */
    @Effect()
    deleteVinculacaoEtiqueta: Observable<any> =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.DeleteVinculacaoEtiqueta>(TarefaDetailActions.DELETE_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                        return this._vinculacaoEtiquetaService.destroy(action.payload.vinculacaoEtiquetaId).pipe(
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
                        );
                    }
                ));

    /**
     * Get Documentos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentos: any =
        this._actions
            .pipe(
                ofType<TarefaDetailActions.GetDocumentos>(TarefaDetailActions.GET_DOCUMENTOS),
                switchMap((action) => {
                    return this._documentoService.query(
                        JSON.stringify(action.payload),
                        25,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'tipoDocumento',
                            'tipoDocumento.especieDocumento',
                            'componentesDigitais']));
                }),
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
