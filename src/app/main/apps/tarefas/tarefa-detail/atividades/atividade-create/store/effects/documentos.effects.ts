import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, map, tap, switchMap} from 'rxjs/operators';

import * as AtividadeCreateDocumentosActions from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store/actions/documentos.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Documento} from '@cdk/models/documento.model';
import {DocumentoService} from '@cdk/services/documento.service';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';
import {Router} from '@angular/router';
import {AssinaturaService} from '@cdk/services/assinatura.service';

@Injectable()
export class AtividadeCreateDocumentosEffect {
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
     * Get Documentos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentos: any =
        this._actions
            .pipe(
                ofType<AtividadeCreateDocumentosActions.GetDocumentos>(AtividadeCreateDocumentosActions.GET_DOCUMENTOS),
                switchMap(() => {

                    let tarefaId = null;

                    const routeParams = of('tarefaHandle');
                    routeParams.subscribe(param => {
                        tarefaId = `eq:${this.routerState.params[param]}`;
                    });

                    const params = {
                        filter: {
                            'tarefaOrigem.id': tarefaId,
                            'juntadaAtual': 'isNull'
                        },
                        limit: 10,
                        offset: 0,
                        sort: {'criadoEm': 'DESC'},
                        populate: [
                            'tipoDocumento',
                            'documentoAvulsoRemessa'
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
                    new AtividadeCreateDocumentosActions.GetDocumentosSuccess({
                        loaded: {
                            id: 'tarefaHandle',
                            value: this.routerState.params.tarefaHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AtividadeCreateDocumentosActions.GetDocumentosFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Documento
     * @type {Observable<any>}
     */
    @Effect()
    deleteDocumento: Observable<AtividadeCreateDocumentosActions.AtividadeCreateDocumentosActionsAll> =
        this._actions
            .pipe(
                ofType<AtividadeCreateDocumentosActions.DeleteDocumento>(AtividadeCreateDocumentosActions.DELETE_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.destroy(action.payload).pipe(
                            map((response) => new AtividadeCreateDocumentosActions.DeleteDocumentoSuccess(response.id)),
                            catchError((err) => {
                                console.log(err);
                                return of(new AtividadeCreateDocumentosActions.DeleteDocumentoFailed(action.payload));
                            })
                        );
                    }
                ));

    /**
     * Delete Documento
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumento: Observable<AtividadeCreateDocumentosActions.AtividadeCreateDocumentosActionsAll> =
        this._actions
            .pipe(
                ofType<AtividadeCreateDocumentosActions.AssinaDocumento>(AtividadeCreateDocumentosActions.ASSINA_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map((response) => {
                                    return new AtividadeCreateDocumentosActions.AssinaDocumentoSuccess(response);
                                }),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new AtividadeCreateDocumentosActions.AssinaDocumentoFailed(err));
                                    return caught;
                                })
                            );
                    }
                ));

    /**
     * Delete Documento
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<AtividadeCreateDocumentosActions.AssinaDocumentoSuccess>(AtividadeCreateDocumentosActions.ASSINA_DOCUMENTO_SUCCESS),
                tap((action) => {

                    const url = 'jnlp://127.0.0.1:8000/v1/assinatura/' + action.payload.jwt + '/get_jnlp';

                    const ifrm = document.createElement('iframe');
                    ifrm.setAttribute('src', url);
                    ifrm.style.width = '0';
                    ifrm.style.height = '0';
                    ifrm.style.border = '0';
                    document.body.appendChild(ifrm);
                    setTimeout(() => document.body.removeChild(ifrm), 2000);
                }));

    /**
     * Clicked Documento
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    clickedDocumento: any =
        this._actions
            .pipe(
                ofType<AtividadeCreateDocumentosActions.ClickedDocumento>(AtividadeCreateDocumentosActions.CLICKED_DOCUMENTO),
                tap((action) => {
                    if (!action.payload.documentoAvulsoRemessa) {
                        this._router.navigate([this.routerState.url + '/documento/' + action.payload.id + '/editar']).then();
                    } else {
                        this._router.navigate([this.routerState.url + '/documento/' + action.payload.id + '/oficio']).then();
                    }

                })
            );

}
