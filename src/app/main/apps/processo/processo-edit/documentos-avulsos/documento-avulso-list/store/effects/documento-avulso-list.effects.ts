import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoAvulsoListActions from '../actions';

import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {DocumentoAvulso} from '@cdk/models';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class DocumentoAvulsoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _store: Store<State>,
        private _router: Router
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
     * Get DocumentosAvulsos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentosAvulsos: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoListActions.GetDocumentosAvulsos>(DocumentoAvulsoListActions.GET_DOCUMENTOS_AVULSOS),
                switchMap(action => this._documentoAvulsoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context))),
                mergeMap(response => [
                    new AddData<DocumentoAvulso>({data: response['entities'], schema: documentoAvulsoSchema}),
                    new DocumentoAvulsoListActions.GetDocumentosAvulsosSuccess({
                        entitiesId: response['entities'].map(documentoAvulso => documentoAvulso.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new DocumentoAvulsoListActions.GetDocumentosAvulsosFailed(err));
                    return caught;
                })

            );

    /**
     * Delete DocumentoAvulso
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteDocumentoAvulso: Observable<DocumentoAvulsoListActions.DocumentoAvulsoListActionsAll> =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoListActions.DeleteDocumentoAvulso>(DocumentoAvulsoListActions.DELETE_DOCUMENTO_AVULSO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'documentoAvulso',
                        content: 'Apagando a documentoAvulso id ' + action.payload.documentoAvulsoId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._documentoAvulsoService.destroy(action.payload.documentoAvulsoId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'documentoAvulso',
                                content: 'DocumentoAvulso id ' + action.payload.documentoAvulsoId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<DocumentoAvulso>({
                                id: response.id,
                                schema: documentoAvulsoSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new DocumentoAvulsoListActions.DeleteDocumentoAvulsoSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.documentoAvulsoId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'documentoAvulso',
                                content: 'Erro ao apagar a documentoAvulso id ' + action.payload.documentoAvulsoId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new DocumentoAvulsoListActions.DeleteDocumentoAvulsoFailed(payload));
                        })
                    );
                }, 25)
            );

    /**
     * Responder DocumentoAvulso
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    responderDocumentoAvulso: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoListActions.ResponderDocumentoAvulso>(DocumentoAvulsoListActions.RESPONDER_DOCUMENTO_AVULSO),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace('oficios/listar', 'oficios/responder')]).then();
                })
            );
}
