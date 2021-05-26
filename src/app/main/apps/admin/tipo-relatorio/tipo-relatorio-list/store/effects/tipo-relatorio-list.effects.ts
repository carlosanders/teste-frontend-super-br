import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as TipoRelatorioListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {tipoRelatorio as tipoRelatorioSchema} from '@cdk/normalizr';
import {CdkUtils} from '../../../../../../../../@cdk/utils';


@Injectable()
export class TipoRelatorioListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _tipoRelatorioService: TipoRelatorioService,
        private _loginService: LoginService,
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
     * Get TipoRelatorio with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getTipoRelatorio: any =
        this._actions
            .pipe(
                ofType<TipoRelatorioListActions.GetTipoRelatorio>(TipoRelatorioListActions.GET_TIPO_RELATORIO),
                switchMap(action => this._tipoRelatorioService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap(response => [
                            new AddData<TipoRelatorio>({data: response['entities'], schema: tipoRelatorioSchema}),
                            new TipoRelatorioListActions.GetTipoRelatorioSuccess({
                                entitiesId: response['entities'].map(tipoRelatorio => tipoRelatorio.id),
                                loaded: {
                                    id: 'tipoRelatorioHandle',
                                    value: this.routerState.params.tipoRelatorioHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TipoRelatorioListActions.GetTipoRelatorioFailed(err));
                        })
                    ))
            );

    /**
     * Delete TipoRelatorio
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteTipoRelatorio: any =
        this._actions
            .pipe(
                ofType<TipoRelatorioListActions.DeleteTipoRelatorio>(TipoRelatorioListActions.DELETE_TIPO_RELATORIO),
                mergeMap(action => this._tipoRelatorioService.destroy(action.payload).pipe(
                        map(response => new TipoRelatorioListActions.DeleteTipoRelatorioSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new TipoRelatorioListActions.DeleteTipoRelatorioFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );

                        })
                    ))
            );
}
