import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {getRouterState, State} from '../../../../../../../../store/reducers';
import * as EspeciesProcessoListActions from '../actions';
import {LoginService} from '../../../../../../../auth/login/login.service';
import {EspecieProcessoService} from '@cdk/services/especie-processo.service';
import {AddData, SetData} from '@cdk/ngrx-normalizr';
import {EspecieProcesso} from '@cdk/models';
import {especieProcesso as especieProcessoSchema} from '@cdk/normalizr';


@Injectable()
export class EspeciesProcessoListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _especieProcessoService: EspecieProcessoService,
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
     * Get EspecieProcesso with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getEspecieProcesso: any =
        this._actions
            .pipe(
                ofType<EspeciesProcessoListActions.GetEspecieProcesso>(EspeciesProcessoListActions.GET_ESPECIE_PROCESSO),
                switchMap(action => this._especieProcessoService.query(
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
                            new AddData<EspecieProcesso>({data: response['entities'], schema: especieProcessoSchema}),
                            new EspeciesProcessoListActions.GetEspecieProcessoSuccess({
                                entitiesId: response['entities'].map(especieProcesso => especieProcesso.id),
                                loaded: {
                                    id: 'especieProcessoHandle',
                                    value: this.routerState.params.especieProcessoHandle
                                },
                                total: response['total']

                            })
                        ]),
                        catchError(err => of(new EspeciesProcessoListActions.GetEspecieProcessoFailed(err)))
                    ))
            );

    /**
     * Update EspecieProcesso
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateEspecieProcesso: any =
        this._actions
            .pipe(
                ofType<EspeciesProcessoListActions.UpdateEspecieProcesso>(EspeciesProcessoListActions.UPDATE_ESPECIE_PROCESSO),
                switchMap(action => this._especieProcessoService.patch(action.payload.especieProcesso, {workflow: null}).pipe(
                        mergeMap((response: EspecieProcesso) => [
                            new EspeciesProcessoListActions.UpdateEspecieProcessoSuccess(response.id),
                        ])
                    )),
                catchError((err, caught) => {
                    this._store.dispatch(new EspeciesProcessoListActions.UpdateEspecieProcessoFailed(err));
                    return caught;
                })
            );
}
