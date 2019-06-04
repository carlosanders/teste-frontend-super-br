import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentosActions from 'app/main/apps/pesquisa/documentos/store/actions';

import {DocumentoService} from '@cdk/services/documento.service';
import {AddData, } from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models/documento.model';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';

@Injectable()
export class DocumentosEffect {
    
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
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
                ofType<DocumentosActions.GetDocumentos>(DocumentosActions.GET_DOCUMENTOS),
                switchMap((action) => {
                    return this._documentoService.query(
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
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new DocumentosActions.GetDocumentosSuccess({
                        entitiesId: response['entities'].map(documento => documento.id),
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new DocumentosActions.GetDocumentosFailed(err));
                    return caught;
                })

            );
}
