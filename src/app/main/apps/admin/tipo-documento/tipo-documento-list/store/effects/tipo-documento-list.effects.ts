import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as TipoDocumentoListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {TipoDocumentoService} from '@cdk/services/tipo-documento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {TipoDocumento} from '@cdk/models';
import {tipoDocumento as tipoDocumentoSchema} from '@cdk/normalizr';
import {CdkUtils} from "../../../../../../../../@cdk/utils";

@Injectable()
export class TipoDocumentoListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _tipoDocumentoService: TipoDocumentoService,
        private _loginService: LoginService,
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
     * Get TipoDocumento with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTipoDocumento: any =
        this._actions
            .pipe(
                ofType<TipoDocumentoListActions.GetTipoDocumento>(TipoDocumentoListActions.GET_TIPO_DOCUMENTO),
                switchMap((action) => {
                    return this._tipoDocumentoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap((response) => [
                            new AddData<TipoDocumento>({data: response['entities'], schema: tipoDocumentoSchema}),
                            new TipoDocumentoListActions.GetTipoDocumentoSuccess({
                                entitiesId: response['entities'].map(tipoDocumento => tipoDocumento.id),
                                loaded: {
                                    id: 'tipoDocumentoHandle',
                                    value: this.routerState.params.tipoDocumentoHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TipoDocumentoListActions.GetTipoDocumentoFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete TipoDocumento
     * @type {Observable<any>}
     */
    @Effect()
    deleteTipoDocumento: any =
        this._actions
            .pipe(
                ofType<TipoDocumentoListActions.DeleteTipoDocumento>(TipoDocumentoListActions.DELETE_TIPO_DOCUMENTO),
                mergeMap((action) => {
                    return this._tipoDocumentoService.destroy(action.payload).pipe(
                        map((response) => new TipoDocumentoListActions.DeleteTipoDocumentoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new TipoDocumentoListActions.DeleteTipoDocumento(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    );
                })
            );
}
