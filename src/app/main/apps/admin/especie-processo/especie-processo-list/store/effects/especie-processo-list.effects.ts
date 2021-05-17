import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as EspecieProcessoListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {EspecieProcessoService} from '../../../../../../../../@cdk/services/especie-processo.service';
import {AddData} from '../../../../../../../../@cdk/ngrx-normalizr';
import {EspecieProcesso} from '../../../../../../../../@cdk/models';
import {especieProcesso as especieProcessoSchema} from '../../../../../../../../@cdk/normalizr';
import {CdkUtils} from "../../../../../../../../@cdk/utils";


@Injectable()
export class EspecieProcessoListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _especieProcessoService: EspecieProcessoService,
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
     * Get EspecieProcesso with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getEspecieProcesso: any =
        this._actions
            .pipe(
                ofType<EspecieProcessoListActions.GetEspecieProcesso>(EspecieProcessoListActions.GET_ESPECIE_PROCESSO),
                switchMap((action) => {
                    return this._especieProcessoService.query(
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
                            new AddData<EspecieProcesso>({data: response['entities'], schema: especieProcessoSchema}),
                            new EspecieProcessoListActions.GetEspecieProcessoSuccess({
                                entitiesId: response['entities'].map(especieProcesso => especieProcesso.id),
                                loaded: {
                                    id: 'especieProcessoHandle',
                                    value: this.routerState.params.especieProcessoHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new EspecieProcessoListActions.GetEspecieProcessoFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete EspecieProcesso
     * @type {Observable<any>}
     */
    @Effect()
    deleteEspecieProcesso: any =
        this._actions
            .pipe(
                ofType<EspecieProcessoListActions.DeleteEspecieProcesso>(EspecieProcessoListActions.DELETE_ESPECIE_PROCESSO),
                mergeMap((action) => {
                    return this._especieProcessoService.destroy(action.payload).pipe(
                        map((response) => new EspecieProcessoListActions.DeleteEspecieProcessoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new EspecieProcessoListActions.DeleteEspecieProcesso(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    );
                })
            );
}
