import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, map, tap, switchMap} from 'rxjs/operators';

import * as DocumentosVinculadosActions from '../actions/documentos-vinculados.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Assinatura, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {documento as documentoSchema} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from 'environments/environment';
import {assinatura as assinaturaSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';

@Injectable()
export class DocumentosVinculadosEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
        private _router: Router,
        private _store: Store<State>,
        private _activatedRoute: ActivatedRoute
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
                            'vinculacaoDocumentoPrincipal.documento',
                            'vinculacaoDocumentoPrincipal.documento.componentesDigitais',
                            'componentesDigitais'
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
     * Save Documento Assinatura Eletronica
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumentoVinculadoEletronicamente: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamente>(DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE),
                switchMap((action) => {
                    return this._assinaturaService.save(action.payload.assinatura, JSON.stringify({password: action.payload.password})).pipe(
                        mergeMap((response: Assinatura) => [
                            new DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamenteSuccess(response),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'assinatura',
                                content: `Assinatura id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamenteFailed(err));
                        })
                    );
                })
            );

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
                    let sidebar = 'modelo/anexos';
                    let primary: string;
                    primary = 'componente-digital/';
                    if (action.payload.componentesDigitais[0]) {
                        primary += action.payload.componentesDigitais[0].id + '/editor/ckeditor';
                    } else {
                        primary += '0';
                    }
                    if (action.payload.vinculacaoDocumentoPrincipal) {
                        sidebar = 'modelo/dados-basicos';
                    }
                    this._router.navigate([this.routerState.url.split('/documento/')[0] + '/documento/' + action.payload.id, {outlets: {primary: primary, sidebar: sidebar}}],
                        {
                            relativeTo: this._activatedRoute.parent // <--- PARENT activated route.
                        }).then();
                })
            );

}
