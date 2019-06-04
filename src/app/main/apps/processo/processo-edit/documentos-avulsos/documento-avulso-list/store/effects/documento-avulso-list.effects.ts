import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoAvulsoListActions from '../actions';

import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr/documento-avulso.schema';

@Injectable()
export class DocumentoAvulsoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
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
     * Get DocumentosAvulsos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentosAvulsos: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoListActions.GetDocumentosAvulsos>(DocumentoAvulsoListActions.GET_DOCUMENTOS_AVULSOS),
                switchMap((action) => {
                    return this._documentoAvulsoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap((response) => [
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
     * @type {Observable<any>}
     */
    @Effect()
    deleteDocumentoAvulso: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoListActions.DeleteDocumentoAvulso>(DocumentoAvulsoListActions.DELETE_DOCUMENTO_AVULSO),
                mergeMap((action) => this._documentoAvulsoService.destroy(action.payload)),
                mergeMap((response) => [
                    // new RemoveData({id: response.id, schema: documentoAvulsoSchema}),
                    new DocumentoAvulsoListActions.DeleteDocumentoAvulsoSuccess(response.id)
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new DocumentoAvulsoListActions.DeleteDocumentoAvulsoFailed(err));
                    return caught;
                })
            );
}
