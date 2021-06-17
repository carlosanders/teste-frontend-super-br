import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {documento as documentoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {environment} from 'environments/environment';
import * as AtividadeBlocoCreateDocumentosActionsAll from '../actions/documentos.actions';

@Injectable()
export class AtividadeCreateBlocoDocumentosEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _router: Router,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentos: any =
        this._actions
            .pipe(
                ofType<AtividadeBlocoCreateDocumentosActionsAll.GetDocumentos>(AtividadeBlocoCreateDocumentosActionsAll.GET_DOCUMENTOS_BLOCO),
                switchMap((action) => {

                    const tarefaIds = `in:${action.payload}`;

                    const params = {
                        filter: {
                            'tarefaOrigem.id': tarefaIds,
                            'documentoAvulsoRemessa.id': 'isNull',
                            'juntadaAtual': 'isNull'
                        },
                        limit: 10,
                        offset: 0,
                        sort: {
                            criadoEm: 'DESC'
                        },
                        populate: [
                            'tipoDocumento',
                            'tarefaOrigem',
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
                    new AtividadeBlocoCreateDocumentosActionsAll.GetDocumentosSuccess({
                        loaded: true,
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AtividadeBlocoCreateDocumentosActionsAll.GetDocumentosFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteDocumento: Observable<AtividadeBlocoCreateDocumentosActionsAll.AtividadeBlocoCreateDocumentosActionsAll> =
        this._actions
            .pipe(
                ofType<AtividadeBlocoCreateDocumentosActionsAll.DeleteDocumento>(AtividadeBlocoCreateDocumentosActionsAll.DELETE_DOCUMENTO_BLOCO),
                mergeMap(action => this._documentoService.destroy(action.payload).pipe(
                            map(response => new AtividadeBlocoCreateDocumentosActionsAll.DeleteDocumentoSuccess(response.id)),
                            catchError((err) => {
                                console.log(err);
                                return of(new AtividadeBlocoCreateDocumentosActionsAll.DeleteDocumentoFailed(action.payload));
                            })
                        )
                ));

    /**
     * Assina Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumento: any =
        this._actions
            .pipe(
                ofType<AtividadeBlocoCreateDocumentosActionsAll.AssinaDocumento>(AtividadeBlocoCreateDocumentosActionsAll.ASSINA_DOCUMENTO_BLOCO),
                mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map(response => new AtividadeBlocoCreateDocumentosActionsAll.AssinaDocumentoSuccess(response)),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new AtividadeBlocoCreateDocumentosActionsAll.AssinaDocumentoFailed(err));
                                    return caught;
                                })
                            )
                ));

    /**
     * Assina Documento Success
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<AtividadeBlocoCreateDocumentosActionsAll.AssinaDocumentoSuccess>(AtividadeBlocoCreateDocumentosActionsAll.ASSINA_DOCUMENTO_BLOCO_SUCCESS),
                tap((action) => {

                    const url = environment.jnlp + 'v1/administrativo/assinatura/' + action.payload.secret + '/get_jnlp';

                    const ifrm = document.createElement('iframe');
                    ifrm.setAttribute('src', url);
                    ifrm.style.width = '0';
                    ifrm.style.height = '0';
                    ifrm.style.border = '0';
                    document.body.appendChild(ifrm);
                    setTimeout(() => document.body.removeChild(ifrm), 20000);
                }));

    /**
     * Clicked Documento
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    clickedDocumento: any =
        this._actions
            .pipe(
                ofType<AtividadeBlocoCreateDocumentosActionsAll.ClickedDocumento>(AtividadeBlocoCreateDocumentosActionsAll.CLICKED_DOCUMENTO_BLOCO),
                tap((action) => {
                    if (!action.payload.documentoAvulsoRemessa) {
                        this._router.navigate([this.routerState.url + '/documento/' + action.payload.id + '/editar']).then();
                    } else {
                        this._router.navigate([this.routerState.url + '/documento/' + action.payload.id + '/oficio/dados-basicos']).then();
                    }

                })
            );

}
