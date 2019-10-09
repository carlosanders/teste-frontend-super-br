import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, map, tap, switchMap} from 'rxjs/operators';

import * as DocumentosVinculadosActions from '../actions/documentos-vinculados.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Documento} from '@cdk/models/documento.model';
import {DocumentoService} from '@cdk/services/documento.service';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';
import {Router} from '@angular/router';
import {environment} from 'environments/environment';

@Injectable()
export class DocumentosVinculadosEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _router: Router,
        private _store: Store<State>
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
     * Get Documentos Vinculados with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentosVinculados: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.GetDocumentosVinculados>(DocumentosVinculadosActions.GET_DOCUMENTOS_VINCULADOS),
                switchMap(() => {

                    let documentoId = null;

                    const routeParams = of('documentoHandle');
                    routeParams.subscribe(param => {
                        documentoId = `eq:${this.routerState.params[param]}`;
                    });

                    const params = {
                        filter: {
                            'vinculacaoDocumentoPrincipal.documento.id': documentoId,
                            'juntadaAtual': 'isNull'
                        },
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'DESC'},
                        populate: [
                            'tipoDocumento',
                            'vinculacaoDocumentoPrincipal',
                            'vinculacaoDocumentoPrincipal.documento'
                        ]
                    };

                    return this._documentoService.query(
                        JSON.stringify({
                            ...params.filter
                        }),
                        params.limit,
                        params.offset,
                        JSON.stringify(params.sort),
                        JSON.stringify(params.populate));
                }),
                mergeMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new DocumentosVinculadosActions.GetDocumentosVinculadosSuccess({
                        loaded: {
                            id: 'documentoHandle',
                            value: this.routerState.params.documentoHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentosVinculadosActions.GetDocumentosVinculadosFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Documento Vinculado
     * @type {Observable<any>}
     */
    @Effect()
    deleteDocumentoVinculado: Observable<DocumentosVinculadosActions.DocumentosVinculadosActionsAll> =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.DeleteDocumentoVinculado>(DocumentosVinculadosActions.DELETE_DOCUMENTO_VINCULADO),

                mergeMap((action) => {
                    return this._documentoService.destroy(action.payload).pipe(
                        map((response) => new DocumentosVinculadosActions.DeleteDocumentoVinculadoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentosVinculadosActions.DeleteDocumentoVinculadoFailed(action.payload));
                        })
                    );
                })
            );

    /**
     * Delete Documento Vinculado
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumentoVinculado: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.AssinaDocumentoVinculado>(DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO),
                mergeMap((action) => {
                        return this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map((response) => {
                                    return new DocumentosVinculadosActions.AssinaDocumentoVinculadoSuccess(response);
                                }),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new DocumentosVinculadosActions.AssinaDocumentoVinculadoFailed(err));
                                    return caught;
                                })
                            );
                    }
                ));

    /**
     * Assina Documento Vinculado
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumentoVinculadoSuccess: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.AssinaDocumentoVinculadoSuccess>(DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_SUCCESS),
                tap((action) => {

                    const url = environment.jnlp + 'v1/assinatura/' + action.payload.jwt + '/get_jnlp';

                    const ifrm = document.createElement('iframe');
                    ifrm.setAttribute('src', url);
                    ifrm.style.width = '0';
                    ifrm.style.height = '0';
                    ifrm.style.border = '0';
                    document.body.appendChild(ifrm);
                    setTimeout(() => document.body.removeChild(ifrm), 2000);
                }));

    /**
     * Clicked Documento Vinculado
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    clickedDocumentoVinculado: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.ClickedDocumentoVinculado>(DocumentosVinculadosActions.CLICKED_DOCUMENTO_VINCULADO),
                tap((action) => {
                    if (!action.payload.documentoAvulsoRemessa) {
                        this._router.navigate([this.routerState.url.split('/documento/')[0] + '/documento/' + action.payload.id + '/editar']).then();
                    } else {
                         this._router.navigate([this.routerState.url.split('/documento/')[0] + '/documento/'
                         + action.payload.id + '/oficio/componente-digital/' + action.payload.id + '/editor/ckeditor' ]).then();
                    }
                })
            );

}
