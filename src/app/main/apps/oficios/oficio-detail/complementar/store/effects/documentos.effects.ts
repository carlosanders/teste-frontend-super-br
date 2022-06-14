import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as DocumentosActions from '../actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {ComponenteDigital, Documento, DocumentoAvulso} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {
    componenteDigital as componenteDigitalSchema,
    documento as documentoSchema
} from '@cdk/normalizr';
import {Router} from '@angular/router';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@Injectable()
export class DocumentosEffects {
    routerState: any;
    documentoAvulso: DocumentoAvulso;
    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.GetDocumentos>(DocumentosActions.GET_DOCUMENTOS),
        switchMap(action => this._documentoService.query(
            JSON.stringify({
                ...action.payload.filter
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context))),
        mergeMap(response => [
            new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
            new DocumentosActions.GetDocumentosSuccess({
                loaded: {
                    id: 'documentoAvulsoHandle',
                    value: this.routerState.params.documentoAvulsoHandle
                },
                entitiesId: response['entities'].map(documento => documento.id),
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new DocumentosActions.GetDocumentosFailed(err));
        })
    ));
    /**
     * Reload Documentos
     */
    reloadDocumentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.ReloadDocumentos>(DocumentosActions.RELOAD_DOCUMENTOS),
        map(() => {
            this._store.dispatch(new DocumentosActions.UnloadDocumentos({reset: false}));
            let documentoId = null;

            const routeParams = of('documentoAvulsoHandle');
            routeParams.subscribe((param) => {
                documentoId = `eq:${this.routerState.params[param]}`;
            });

            const params = {
                filter: {
                    'documentoAvulsoComplementacaoResposta.id': documentoId
                },
                limit: 10,
                offset: 0,
                sort: {criadoEm: 'DESC'},
                populate: [
                    'tipoDocumento',
                    'documentoAvulsoRemessa',
                    'documentoAvulsoRemessa.documentoResposta',
                    'componentesDigitais',
                    'juntadaAtual'
                ],
                context: {'incluiVinculacaoDocumentoPrincipal': true}
            };
            this._store.dispatch(new DocumentosActions.GetDocumentos(params));
        })
    ), {dispatch: false});
    /**
     * Clicked Documento
     *
     * @type {Observable<any>}
     */
    clickedDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.ClickedDocumento>(DocumentosActions.CLICKED_DOCUMENTO),
        tap((action) => {
            this._router.navigate([
                this.routerState.url.replace(
                    `detalhe/${this.routerState.params.documentoAvulsoHandle}/complementar/${this.routerState.params.chaveAcessoHandle}`,
                    'documento/'
                ) + action.payload.componentesDigitais[0].id + '/visualizar/' + this.routerState.params.chaveAcessoHandle
            ]).then();
        })
    ), {dispatch: false});
    /**
     * Converte Documento
     *
     * @type {Observable<any>}
     */
    converteDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.ConverteToPdf>(DocumentosActions.CONVERTE_DOCUMENTO),
        mergeMap(action => this._documentoService.convertToPdf(action.payload, {hash: action.payload.hash}, ['componentesDigitais'])
            .pipe(
                mergeMap(response => [
                    new UpdateData<Documento>({
                        id: response.id,
                        schema: documentoSchema,
                        changes: {componentesDigitais: response.componentesDigitais}
                    }),
                    new DocumentosActions.ConverteToPdfSucess(action.payload)
                ]),
                catchError(() => of(new DocumentosActions.ConverteToPdfFailed(action.payload)))
            ), 25
        )
    ));
    /**
     * Converte Documento HTML
     *
     * @type {Observable<any>}
     */
    converteDocumentoHtml: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.ConverteToHtml>(DocumentosActions.CONVERTE_DOCUMENTO_HTML),
        mergeMap(action => this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
            .pipe(
                mergeMap(response => [
                    new AddData<ComponenteDigital>({
                        data: response['entities'],
                        schema: componenteDigitalSchema
                    }),
                    new DocumentosActions.ConverteToHtmlSucess(action.payload)
                ]),
                catchError(() => of(new DocumentosActions.ConverteToHtmlFailed(action.payload)))
            ), 25)
    ));
    /**
     * Delete Documento
     *
     * @type {Observable<any>}
     */
    deleteDocumento: Observable<DocumentosActions.DocumentosActionsAll> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.DeleteDocumento>(DocumentosActions.DELETE_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento',
            content: 'Apagando documento id ' + action.payload.documentoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._documentoService.destroy(action.payload.documentoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento',
                    content: 'Documento id ' + action.payload.documentoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Documento>({
                    id: response.id,
                    schema: documentoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new DocumentosActions.DeleteDocumentoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.documentoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento',
                    content: 'Erro ao apagar documento id ' + action.payload.documentoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new DocumentosActions.DeleteDocumentoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _router: Router,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
