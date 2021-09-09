import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';

import * as ProcessoDetailActions from '../actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {Router} from '@angular/router';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {Documento, Processo, VinculacaoEtiqueta} from '@cdk/models';
import {AddChildData, AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {
    documento as documentoSchema,
    processo as processoSchema,
    vinculacaoEtiqueta as vinculacaoEtiquetaSchema
} from '@cdk/normalizr';
import {DocumentoService} from '@cdk/services/documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class ProcessoDetailEffect {
    routerState: any;
    /**
     * Get Processo with router parameters
     *
     * @type {Observable<any>}
     */
    getProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoDetailActions.GetProcesso>(ProcessoDetailActions.GET_PROCESSO),
        switchMap(action => this._processoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'especieProcesso',
                'especieProcesso.generoProcesso',
                'modalidadeMeio',
                'modalidadeFase',
                'documentoAvulsoOrigem',
                'classificacao',
                'classificacao.modalidadeDestinacao',
                'setorInicial',
                'setorAtual',
                'lembretes',
                'vinculacoesEtiquetas',
                'vinculacoesEtiquetas.etiqueta'
            ]))),
        mergeMap(response => [
            new AddData<Processo>({data: response['entities'], schema: processoSchema}),
            new ProcessoDetailActions.GetProcessoSuccess({
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                processo: response['entities'][0]
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoDetailActions.GetProcessoFailed(err));
        })
    ));
    /**
     * Deselect Processo Action
     */
    deselectProcessoAction: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoDetailActions.DeselectProcessoAction>(ProcessoDetailActions.DESELECT_PROCESSO_ACTION),
        tap(() => {
            this._router.navigate(['apps/processos/' + this.routerState.params.generoHandle + '/' +
            this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle]).then();
        })
    ), {dispatch: false});
    /**
     * Update Processo
     *
     * @type {Observable<any>}
     */
    createProcesso: Observable<ProcessoDetailActions.ProcessoDetailActionsAll> = createEffect(() => this._actions.pipe(
        ofType<ProcessoDetailActions.CreateProcesso>(ProcessoDetailActions.CREATE_PROCESSO),
        map(() => {
            this._router.navigate([this.routerState.url + '/criar']).then();
            return new ProcessoDetailActions.CreateProcessoSuccess();
        })
    ));
    /**
     * Delete Processo
     *
     * @type {Observable<any>}
     */
    deleteProcesso: Observable<ProcessoDetailActions.ProcessoDetailActionsAll> = createEffect(() => this._actions.pipe(
        ofType<ProcessoDetailActions.DeleteProcesso>(ProcessoDetailActions.DELETE_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'processo',
            content: 'Apagando o processo id ' + action.payload.processoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._processoService.destroy(action.payload.processoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'processo',
                    content: 'Processo id ' + action.payload.processoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Processo>({
                    id: response.id,
                    schema: processoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new ProcessoDetailActions.DeleteProcessoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.processoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'processo',
                    content: 'Erro ao apagar o processo id ' + action.payload.processoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new ProcessoDetailActions.DeleteProcessoFailed(payload));
            })
        ), 25)
    ));
    /**
     * Save Processo
     *
     * @type {Observable<any>}
     */
    saveProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoDetailActions.SaveProcesso>(ProcessoDetailActions.SAVE_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'processo',
            content: 'Salvando processo ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._processoService.save(action.payload.processo).pipe(
            mergeMap((response: Processo) => [
                new ProcessoDetailActions.SaveProcessoSuccess(),
                new AddData<Processo>({
                    data: [response],
                    schema: processoSchema
                }),
                new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'processo',
                    content: `Processo id ${response.id} salvo com sucesso!`,
                    status: 1, // sucesso
                })
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'processo',
                    content: 'Erro ao salvar o processo id ' + action.payload.processoId + '!',
                    status: 2, // erro
                }));
                return of(new ProcessoDetailActions.SaveProcessoFailed(err));
            })
        ))
    ));
    /**
     * Create Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    createVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoDetailActions.CreateVinculacaoEtiqueta>(ProcessoDetailActions.CREATE_VINCULACAO_ETIQUETA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação etiqueta',
            content: 'Salvando a vinculação etiqueta ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const vinculacaoEtiqueta = new VinculacaoEtiqueta();
            vinculacaoEtiqueta.processo = action.payload.processo;
            vinculacaoEtiqueta.etiqueta = action.payload.etiqueta;
            return this._vinculacaoEtiquetaService.save(action.payload.vinculacaoEtiqueta).pipe(
                tap(response =>
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculação etiqueta',
                        content: 'Vinculação etiqueta id ' + response.id + ' salva com sucesso.',
                        status: 1, // sucesso
                    }))
                ),
                mergeMap((response: VinculacaoEtiqueta) => [
                    new AddChildData<VinculacaoEtiqueta>({
                        data: [response],
                        childSchema: vinculacaoEtiquetaSchema,
                        parentSchema: processoSchema,
                        parentId: action.payload.processo.id
                    }),
                    new AddData<VinculacaoEtiqueta>({data: [response], schema: vinculacaoEtiquetaSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculação etiqueta',
                        content: 'Erro ao salvar a vinculação etiqueta!',
                        status: 2, // erro
                    }));
                    return of(new ProcessoDetailActions.CreateVinculacaoEtiquetaFailed(err));
                })
            );
        })
    ));
    /**
     * Save conteúdo vinculação etiqueta na processo
     *
     * @type {Observable<any>}
     */
    saveConteudoVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoDetailActions.SaveConteudoVinculacaoEtiqueta>(ProcessoDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA),
        mergeMap(action => this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta, action.payload.changes).pipe(
            mergeMap(response => [
                new ProcessoDetailActions.SaveConteudoVinculacaoEtiquetaSuccess(response.id),
                new UpdateData<VinculacaoEtiqueta>({
                    id: response.id,
                    schema: vinculacaoEtiquetaSchema,
                    changes: {conteudo: response.conteudo, privada: response.privada}
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new ProcessoDetailActions.SaveConteudoVinculacaoEtiquetaFailed(err));
            })
        ), 25)
    ));
    /**
     * Delete Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    deleteVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoDetailActions.DeleteVinculacaoEtiqueta>(ProcessoDetailActions.DELETE_VINCULACAO_ETIQUETA),
        mergeMap(action => this._vinculacaoEtiquetaService.destroy(action.payload.vinculacaoEtiquetaId).pipe(
                mergeMap(() => [
                    new RemoveChildData({
                        id: action.payload.vinculacaoEtiquetaId,
                        childSchema: vinculacaoEtiquetaSchema,
                        parentSchema: processoSchema,
                        parentId: action.payload.processoId
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new ProcessoDetailActions.DeleteVinculacaoEtiquetaFailed(action.payload));
                })
            ), 25
        )
    ));
    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoDetailActions.GetDocumentos>(ProcessoDetailActions.GET_DOCUMENTOS),
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
            new ProcessoDetailActions.GetDocumentosSuccess({
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                entitiesId: response['entities'].map(documento => documento.id),
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoDetailActions.GetDocumentosFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _documentoService: DocumentoService,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
