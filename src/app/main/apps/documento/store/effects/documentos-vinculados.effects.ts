import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as DocumentosVinculadosActions from '../actions/documentos-vinculados.actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Assinatura, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {assinatura as assinaturaSchema, documento as documentoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {environment} from 'environments/environment';
import * as OperacoesActions from '../../../../../store/actions/operacoes.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';

@Injectable()
export class DocumentosVinculadosEffect {
    routerState: any;
    /**
     * Get Documentos Vinculados with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentosVinculados: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.GetDocumentosVinculados>(DocumentosVinculadosActions.GET_DOCUMENTOS_VINCULADOS),
        switchMap(() => {

            let documentoId = null;

            const routeParams = of('documentoHandle');
            routeParams.subscribe((param) => {
                documentoId = `eq:${this.routerState.params[param]}`;
            });

            const params = {
                filter: {
                    'vinculacaoDocumentoPrincipal.documento.id': documentoId,
                    'juntadaAtual': 'isNull'
                },
                limit: 10,
                offset: 0,
                sort: {id: 'DESC'},
                populate: [
                    'tipoDocumento',
                    'vinculacaoDocumentoPrincipal',
                    'vinculacaoDocumentoPrincipal.documento',
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
        catchError((err) => {
            console.log(err);
            return of(new DocumentosVinculadosActions.GetDocumentosVinculadosFailed(err));
        })
    ));
    /**
     * Delete Documento Vinculado
     *
     * @type {Observable<any>}
     */
    deleteDocumentoVinculado: Observable<DocumentosVinculadosActions.DocumentosVinculadosActionsAll> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.DeleteDocumentoVinculado>(DocumentosVinculadosActions.DELETE_DOCUMENTO_VINCULADO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento vinculado',
            content: 'Apagando a documento vinculado id ' + action.payload.documentoVinculadoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._documentoService.destroy(action.payload.documentoVinculadoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento vinculado',
                    content: 'Documento Vinculado id ' + action.payload.documentoVinculadoId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Documento>({
                    id: response.id,
                    schema: documentoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new DocumentosVinculadosActions.DeleteDocumentoVinculadoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.documentoVinculadoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento vinculado',
                    content: 'Erro ao apagar a documento vinculado id ' + action.payload.documentoVinculadoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new DocumentosVinculadosActions.DeleteDocumentoVinculadoFailed(payload));
            })
        ), 25)
    ));
    /**
     * Delete Documento Vinculado
     *
     * @type {Observable<any>}
     */
    assinaDocumentoVinculado: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.AssinaDocumentoVinculado>(DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO),
        mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
            .pipe(
                map(response => new DocumentosVinculadosActions.AssinaDocumentoVinculadoSuccess(response)),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosVinculadosActions.AssinaDocumentoVinculadoFailed(err));
                })
            ), 25
        )
    ));

    /**
     * Save Documento Assinatura Eletronica
     *
     * @type {Observable<any>}
     */
    assinaDocumentoVinculadoEletronicamente: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamente>(DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assinatura',
            content: 'Salvando a assinatura ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        switchMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
            mergeMap((response: Assinatura) => [
                new DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamenteSuccess(response),
                new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: `Assinatura id ${response.id} criada com sucesso!`,
                    status: 1, // Sucesso
                    lote: action.payload.loteId
                })
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: 'Erro ao salvar a assinatura!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamenteFailed(err));
            })
        ))
    ));
    /**
     * Clicked Documento Vinculado
     *
     * @type {Observable<any>}
     */
    clickedDocumentoVinculado: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.ClickedDocumentoVinculado>(DocumentosVinculadosActions.CLICKED_DOCUMENTO_VINCULADO),
        tap((action) => {
            if (!action.payload.documentoAvulsoRemessa) {
                this._router.navigate([this.routerState.url.split('/documento/')[0] + '/documento/' + action.payload.id + '/editar']).then();
            } else {
                this._router.navigate([this.routerState.url.split('/documento/')[0] + '/documento/'
                + action.payload.id + '/oficio/componente-digital/' + action.payload.id + '/editor/ckeditor']).then();
            }
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
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
