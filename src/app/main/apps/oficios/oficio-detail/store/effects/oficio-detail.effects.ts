import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, exhaustMap, mergeMap, concatMap, tap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';

import * as OficioDetailActions from 'app/main/apps/oficios/oficio-detail/store/actions/oficio-detail.actions';

import {Router} from '@angular/router';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {VinculacaoEtiqueta} from '@cdk/models/vinculacao-etiqueta.model';
import {AddChildData, AddData, RemoveChildData} from '@cdk/ngrx-normalizr';
import {vinculacaoEtiqueta as vinculacaoEtiquetaSchema} from '@cdk/normalizr/vinculacao-etiqueta.schema';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr/documento-avulso.schema';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';
import {DocumentoService} from '@cdk/services/documento.service';
import {Documento} from '@cdk/models/documento.model';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {GetDocumentos} from '../../reponder-complementar/store/actions';
import {DocumentoAvulsoService} from '../../../../../../../@cdk/services/documento-avulso.service';
import {DocumentoAvulso} from '../../../../../../../@cdk/models/documento-avulso.model';

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
     * Get Oficio with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentoAvulso: any =
        this._actions
            .pipe(
                ofType<OficioDetailActions.GetDocumentos>(OficioDetailActions.GET_DOCUMENTOS),
                switchMap((action) => {
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
                            'especieOficio',
                            'usuarioResponsavel',
                            'setorResponsavel',
                            'setorResponsavel.unidade',
                            'setorOrigem',
                            'setorOrigem.unidade',
                            'especieOficio.generoOficio',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta']));
                }),
                mergeMap(response => [
                    new AddData<DocumentoAvulso>({data: response['entities'], schema: documentoAvulsoSchema}),
                    new OficioDetailActions.GetDocumentoAvulsoSuccess({
                        loaded: {
                            id: 'oficioHandle',
                            value: this.routerState.params.oficioHandle
                        },
                        oficio: response['entities'][0]
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new OficioDetailActions.GetDocumentoAvulsoFailed(err));
                    return caught;
                })
            );

    /**
     * Deselect Oficio Action
     */
    @Effect({dispatch: false})
    deselectDocumentoAvulsoAction =
        this._actions
            .pipe(
                ofType<OficioDetailActions.DeselectDocumentoAvulsoAction>(OficioDetailActions.DESELECT_DOCUMENTO_AVULSO_ACTION),
                tap(() => {
                    this._router.navigate(['apps/oficios/' + this.routerState.params.generoHandle + '/' + this.routerState.params.folderHandle]).then();
                })
            );

    /**
     * Update Oficio
     * @type {Observable<any>}
     */
    @Effect()
    createDocumentoAvulso: Observable<OficioDetailActions.DocumentoAvulsoDetailActionsAll> =
        this._actions
            .pipe(
                ofType<OficioDetailActions.CreateDocumentoAvulso>(OficioDetailActions.CREATE_DOCUMENTO_AVULSO),
                map(() => {
                    this._router.navigate([this.routerState.url + '/criar']).then();
                    return new OficioDetailActions.CreateDocumentoAvulsoSuccess();
                })
            );


    /**
     * Save Oficio
     * @type {Observable<any>}
     */
    @Effect()
    saveDocumentoAvulso: any =
        this._actions
            .pipe(
                ofType<OficioDetailActions.SaveDocumentoAvulso>(OficioDetailActions.SAVE_DOCUMENTO_AVULSO),
                switchMap((action) => {
                    return this._documentoAvulsoService.save(action.payload).pipe(
                        mergeMap((response: DocumentoAvulso) => [
                            new OficioDetailActions.SaveDocumentoAvulsoSuccess(),
                            new AddData<DocumentoAvulso>({
                                data: [response],
                                schema: documentoAvulsoSchema
                            }), new OperacoesActions.Resultado({
                                type: 'oficio',
                                content: `Oficio id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new OficioDetailActions.SaveDocumentoAvulsoFailed(err));
                        })
                    );
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
                ofType<OficioDetailActions.CreateVinculacaoEtiqueta>(OficioDetailActions.CREATE_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                    const vinculacaoEtiqueta = new VinculacaoEtiqueta();
                    vinculacaoEtiqueta.documento = action.payload.documento;
                    vinculacaoEtiqueta.etiqueta = action.payload.etiqueta;
                    return this._vinculacaoEtiquetaService.save(vinculacaoEtiqueta).pipe(
                        tap((response) => response.documento = null),
                        mergeMap((response) => [
                            new AddChildData<VinculacaoEtiqueta>({
                                data: [response],
                                childSchema: vinculacaoEtiquetaSchema,
                                parentSchema: documentoAvulsoSchema,
                                parentId: action.payload.documento.id
                            }),
                            new OperacoesActions.Resultado({
                                type: 'documento',
                                content: `Documento Avulso de id ${response.id} etiquetada com sucesso!`,
                                dateTime: response.criadoEm
                            }),
                            new GetDocumentos()
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new OficioDetailActions.CreateVinculacaoEtiquetaFailed(err));
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
                ofType<OficioDetailActions.DeleteVinculacaoEtiqueta>(OficioDetailActions.DELETE_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                        return this._vinculacaoEtiquetaService.destroy(action.payload.vinculacaoEtiquetaId).pipe(
                            mergeMap(() => [
                                new RemoveChildData({
                                    id: action.payload.vinculacaoEtiquetaId,
                                    childSchema: vinculacaoEtiquetaSchema,
                                    parentSchema: documentoAvulsoSchema,
                                    parentId: action.payload.oficioId
                                })
                            ]),
                            catchError((err) => {
                                console.log(err);
                                return of(new OficioDetailActions.DeleteVinculacaoEtiquetaFailed(action.payload));
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
                ofType<OficioDetailActions.GetDocumentos>(OficioDetailActions.GET_DOCUMENTOS),
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
                    new OficioDetailActions.GetDocumentosSuccess({
                        loaded: {
                            id: 'documentoHandle',
                            value: this.routerState.params.documentoHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new OficioDetailActions.GetDocumentosFailed(err));
                    return caught;
                })
            );
}
