import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';

import * as DocumentoAvulsoDetailActions from 'app/main/apps/oficios/oficio-detail/store/actions';

import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {Router} from '@angular/router';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {VinculacaoEtiqueta} from '@cdk/models/vinculacao-etiqueta.model';
import {AddChildData, AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema, vinculacaoEtiqueta as vinculacaoEtiquetaSchema} from '@cdk/normalizr';
import {DocumentoService} from '@cdk/services/documento.service';
import {DocumentoAvulso} from '@cdk/models';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class OficioDetailEffect {
    routerState: any;
    /**
     * Get Documento Avulso with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentoAvulso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoDetailActions.GetDocumentoAvulso>(DocumentoAvulsoDetailActions.GET_DOCUMENTO_AVULSO),
        switchMap((action) => {
            let context = JSON.stringify({});
            if (this.routerState.params['chaveAcessoHandle']) {
                context = JSON.stringify({chaveAcesso: this.routerState.params['chaveAcessoHandle']});
            }
            return this._documentoAvulsoService.query(
                JSON.stringify(action.payload),
                1,
                0,
                JSON.stringify({}),
                JSON.stringify([
                    'processo',
                    'processo.especieProcesso',
                    'processo.especieProcesso.generoProcesso',
                    'processo.modalidadeMeio',
                    'processo.documentoAvulsoOrigem',
                    'usuarioResponsavel',
                    'setorResponsavel',
                    'setorResponsavel.unidade',
                    'setorOrigem',
                    'setorOrigem.unidade',
                    'vinculacoesEtiquetas',
                    'vinculacoesEtiquetas.etiqueta',
                    'documentoResposta'
                ]),
                context
            );
        }),
        mergeMap(response => [
            new AddData<DocumentoAvulso>({data: response['entities'], schema: documentoAvulsoSchema}),
            new DocumentoAvulsoDetailActions.GetDocumentoAvulsoSuccess({
                loaded: {
                    id: 'documentoAvulsoHandle',
                    value: this.routerState.params.documentoAvulsoHandle
                },
                documentoAvulso: response['entities'][0]
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new DocumentoAvulsoDetailActions.GetDocumentoAvulsoFailed(err));
        })
    ));
    /**
     * Deselect Documento Avulso Action
     */
    deselectDocumentoAvulsoAction: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoDetailActions.DeselectDocumentoAvulsoAction>(DocumentoAvulsoDetailActions.DESELECT_DOCUMENTO_AVULSO_ACTION),
        tap(() => {
            this._router.navigate(['apps/oficios']).then();
        })
    ), {dispatch: false});
    /**
     * Create Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    createVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoDetailActions.CreateVinculacaoEtiqueta>(DocumentoAvulsoDetailActions.CREATE_VINCULACAO_ETIQUETA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação da etiqueta',
            content: 'Salvando a vinculação da etiqueta ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const vinculacaoEtiqueta = new VinculacaoEtiqueta();
            vinculacaoEtiqueta.documentoAvulso = action.payload.documentoAvulso;
            vinculacaoEtiqueta.etiqueta = action.payload.etiqueta;
            return this._vinculacaoEtiquetaService.save(action.payload.vinculacaoEtiqueta).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação da etiqueta',
                    content: 'Vinculação da etiqueta id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: VinculacaoEtiqueta) => [
                    new AddChildData<VinculacaoEtiqueta>({
                        data: [response],
                        childSchema: vinculacaoEtiquetaSchema,
                        parentSchema: documentoAvulsoSchema,
                        parentId: action.payload.documentoAvulso.id
                    }),
                    new DocumentoAvulsoDetailActions.GetDocumentoAvulso({
                        id: `eq:${this.routerState.params.documentoAvulsoHandle}`
                    }),
                    new AddData<VinculacaoEtiqueta>({data: [response], schema: vinculacaoEtiquetaSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculação da etiqueta',
                        content: 'Erro ao salvar a vinculação da etiqueta!',
                        status: 2, // erro
                    }));
                    return of(new DocumentoAvulsoDetailActions.CreateVinculacaoEtiquetaFailed(err));
                })
            );
        })
    ));
    /**
     * Delete Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    deleteVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoDetailActions.DeleteVinculacaoEtiqueta>(DocumentoAvulsoDetailActions.DELETE_VINCULACAO_ETIQUETA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação etiqueta',
            content: 'Apagando a vinculação etiqueta id ' + action.payload.vinculacaoEtiquetaId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._vinculacaoEtiquetaService.destroy(action.payload.vinculacaoEtiquetaId).pipe(
            tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'vinculação etiqueta',
                content: 'Vinculação etiqueta id ' + action.payload.vinculacaoEtiquetaId + ' deletada com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap(() => [
                new RemoveChildData({
                    id: action.payload.vinculacaoEtiquetaId,
                    childSchema: vinculacaoEtiquetaSchema,
                    parentSchema: documentoAvulsoSchema,
                    parentId: action.payload.documentoAvulsoId
                })
            ]),
            catchError((err) => {
                const payload = {
                    id: action.payload.vinculacaoEtiquetaId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação etiqueta',
                    content: 'Erro ao apagar a vinculação etiqueta id ' + action.payload.vinculacaoEtiquetaId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new DocumentoAvulsoDetailActions.DeleteVinculacaoEtiquetaFailed(payload));
            })
        ), 25)
    ));
    /**
     * Save conteúdo vinculação etiqueta
     *
     * @type {Observable<any>}
     */
    saveConteudoVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoDetailActions.SaveConteudoVinculacaoEtiqueta>(DocumentoAvulsoDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação etiqueta',
            content: 'Salvando a vinculação etiqueta ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta, action.payload.changes).pipe(
                tap(response =>
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculação etiqueta',
                        content: 'Vinculação etiqueta id ' + response.id + ' salva com sucesso.',
                        status: 1, // sucesso
                    }))
                ),
                mergeMap((response: VinculacaoEtiqueta) => [
                    new DocumentoAvulsoDetailActions.SaveConteudoVinculacaoEtiquetaSuccess(response),
                    new UpdateData<VinculacaoEtiqueta>({
                        id: response.id,
                        schema: vinculacaoEtiquetaSchema,
                        changes: {conteudo: response.conteudo, privada: response.privada}
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
                    return of(new DocumentoAvulsoDetailActions.SaveConteudoVinculacaoEtiquetaFailed(err));
                })
            ))
    ));

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
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
