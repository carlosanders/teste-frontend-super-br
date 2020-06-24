import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';

import * as DocumentoAvulsoDetailActions from 'app/main/apps/oficios/oficio-detail/store/actions';

import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {Router} from '@angular/router';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {VinculacaoEtiqueta} from '@cdk/models/vinculacao-etiqueta.model';
import {AddChildData, AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {vinculacaoEtiqueta as vinculacaoEtiquetaSchema} from '@cdk/normalizr/vinculacao-etiqueta.schema';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr/documento-avulso.schema';
import {DocumentoService} from '@cdk/services/documento.service';
import {DocumentoAvulso, Documento} from '@cdk/models';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class OficioDetailEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
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
     * Get Documento Avulso with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentoAvulso: any =
        this._actions
            .pipe(
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoAvulsoDetailActions.GetDocumentoAvulsoFailed(err));
                    return caught;
                })
            );

    /**
     * Deselect Documento Avulso Action
     */
    @Effect({dispatch: false})
    deselectDocumentoAvulsoAction =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoDetailActions.DeselectDocumentoAvulsoAction>(DocumentoAvulsoDetailActions.DESELECT_DOCUMENTO_AVULSO_ACTION),
                tap(() => {
                    this._router.navigate(['apps/oficios']).then();
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
                ofType<DocumentoAvulsoDetailActions.CreateVinculacaoEtiqueta>(DocumentoAvulsoDetailActions.CREATE_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                    const vinculacaoEtiqueta = new VinculacaoEtiqueta();
                    vinculacaoEtiqueta.documentoAvulso = action.payload.documentoAvulso;
                    vinculacaoEtiqueta.etiqueta = action.payload.etiqueta;
                    return this._vinculacaoEtiquetaService.save(vinculacaoEtiqueta).pipe(
                        tap((response) => response.documentoAvulso = null),
                        mergeMap((response) => [
                            new AddChildData<VinculacaoEtiqueta>({
                                data: [response],
                                childSchema: vinculacaoEtiquetaSchema,
                                parentSchema: documentoAvulsoSchema,
                                parentId: action.payload.documentoAvulso.id
                            }),
                            new OperacoesActions.Resultado({
                                type: 'oficio',
                                content: `Documento Avulso id ${response.id} etiquetada com sucesso!`,
                                dateTime: response.criadoEm
                            }),
                            new DocumentoAvulsoDetailActions.GetDocumentoAvulso({
                                id: `eq:${this.routerState.params.documentoAvulsoHandle}`
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoAvulsoDetailActions.CreateVinculacaoEtiquetaFailed(err));
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
                ofType<DocumentoAvulsoDetailActions.DeleteVinculacaoEtiqueta>(DocumentoAvulsoDetailActions.DELETE_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                        return this._vinculacaoEtiquetaService.destroy(action.payload.vinculacaoEtiquetaId).pipe(
                            mergeMap(() => [
                                new RemoveChildData({
                                    id: action.payload.vinculacaoEtiquetaId,
                                    childSchema: vinculacaoEtiquetaSchema,
                                    parentSchema: documentoAvulsoSchema,
                                    parentId: action.payload.documentoAvulsoId
                                })
                            ]),
                            catchError((err) => {
                                console.log(err);
                                return of(new DocumentoAvulsoDetailActions.DeleteVinculacaoEtiquetaFailed(action.payload));
                            })
                        );
                    }
                ));


    /**
     * Save conteúdo vinculação etiqueta
     * @type {Observable<any>}
     */
    @Effect()
    SaveConteudoVinculacaoEtiqueta: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoDetailActions.SaveConteudoVinculacaoEtiqueta>(DocumentoAvulsoDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                    return this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta, action.payload.changes).pipe(
                        mergeMap((response) => [
                            new DocumentoAvulsoDetailActions.SaveConteudoVinculacaoEtiquetaSuccess(response.id),
                            new UpdateData<VinculacaoEtiqueta>({
                                id: response.id,
                                schema: vinculacaoEtiquetaSchema,
                                changes: {conteudo: response.conteudo}
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoAvulsoDetailActions.SaveConteudoVinculacaoEtiquetaFailed(err));
                        })
                    );
                })
            );
}
