import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as EspecieAtividadeListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {EspecieAtividadeService} from '../../../../../../../../@cdk/services/especie-atividade.service';
import {AddData} from '../../../../../../../../@cdk/ngrx-normalizr';
import {EspecieAtividade} from '../../../../../../../../@cdk/models';
import {especieAtividade as especieAtividadeSchema} from '../../../../../../../../@cdk/normalizr';


@Injectable()
export class EspecieAtividadeListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _especieAtividadeService: EspecieAtividadeService,
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
     * Get EspecieAtividade with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getEspecieAtividade: any =
        this._actions
            .pipe(
                ofType<EspecieAtividadeListActions.GetEspecieAtividade>(EspecieAtividadeListActions.GET_ESPECIE_ATIVIDADE),
                switchMap((action) => {
                    return this._especieAtividadeService.query(
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
                            new AddData<EspecieAtividade>({data: response['entities'], schema: especieAtividadeSchema}),
                            new EspecieAtividadeListActions.GetEspecieAtividadeSuccess({
                                entitiesId: response['entities'].map(especieAtividade => especieAtividade.id),
                                loaded: {
                                    id: 'especieAtividadeHandle',
                                    value: this.routerState.params.especieAtividadeHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new EspecieAtividadeListActions.GetEspecieAtividadeFailed(err));
                        })
                    );
                })
            );
}
