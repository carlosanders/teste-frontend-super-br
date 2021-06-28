import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoIdentificadorListActions from '../actions';

import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {DocumentoIdentificador} from '@cdk/models';
import {documentoIdentificador as documentoIdentificadorchema} from '@cdk/normalizr';
import {CdkUtils} from '../../../../../../../../../@cdk/utils';

@Injectable()
export class DocumentoIdentificadorListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoIdentificadorService: DocumentoIdentificadorService,
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
     * Get DocumentoIdentificador with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentoIdentificador: any =
        this._actions
            .pipe(
                ofType<DocumentoIdentificadorListActions.GetDocumentoIdentificador>(DocumentoIdentificadorListActions.GET_DOCUMENTO_IDENTIFICADOR),
                switchMap(action => this._documentoIdentificadorService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate))),
                mergeMap(response => [
                    new AddData<DocumentoIdentificador>({data: response['entities'], schema: documentoIdentificadorchema}),
                    new DocumentoIdentificadorListActions.GetDocumentoIdentificadorSuccess({
                        entitiesId: response['entities'].map(documentoIdentificador => documentoIdentificador.id),
                        loaded: {
                            id: 'pessoaHandle',
                            value: this.routerState.params.pessoaHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new DocumentoIdentificadorListActions.GetDocumentoIdentificadorFailed(err));
                    return caught;
                })

            );

    /**
     * Delete DocumentoIdentificador
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteDocumentoIdentificador: any =
        this._actions
            .pipe(
                ofType<DocumentoIdentificadorListActions.DeleteDocumentoIdentificador>(DocumentoIdentificadorListActions.DELETE_DOCUMENTO_IDENTIFICADOR),
                mergeMap(action => this._documentoIdentificadorService.destroy(action.payload).pipe(
                        map(response => new DocumentoIdentificadorListActions.DeleteDocumentoIdentificadorSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoIdentificadorListActions.DeleteDocumentoIdentificadorFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    ), 25)
            );
}
