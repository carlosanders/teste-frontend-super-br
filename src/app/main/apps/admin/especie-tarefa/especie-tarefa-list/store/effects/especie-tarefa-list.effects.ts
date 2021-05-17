import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as EspecieTarefaListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {EspecieTarefa} from '@cdk/models';
import {especieTarefa as especieTarefaSchema} from '@cdk/normalizr';


@Injectable()
export class EspecieTarefaListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _especieTarefaService: EspecieTarefaService,
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
     * Get EspecieTarefa with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getEspecieTarefa: any =
        this._actions
            .pipe(
                ofType<EspecieTarefaListActions.GetEspecieTarefa>(EspecieTarefaListActions.GET_ESPECIE_TAREFA),
                switchMap((action) => {
                    return this._especieTarefaService.query(
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
                            new AddData<EspecieTarefa>({data: response['entities'], schema: especieTarefaSchema}),
                            new EspecieTarefaListActions.GetEspecieTarefaSuccess({
                                entitiesId: response['entities'].map(especieTarefa => especieTarefa.id),
                                loaded: {
                                    id: 'especieTarefaHandle',
                                    value: this.routerState.params.especieTarefaHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new EspecieTarefaListActions.GetEspecieTarefaFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete EspecieTarefa
     * @type {Observable<any>}
     */
    @Effect()
    deleteEspecieTarefa: any =
        this._actions
            .pipe(
                ofType<EspecieTarefaListActions.DeleteEspecieTarefa>(EspecieTarefaListActions.DELETE_ESPECIE_TAREFA),
                mergeMap((action) => {
                    return this._especieTarefaService.destroy(action.payload).pipe(
                        map((response) => new EspecieTarefaListActions.DeleteEspecieTarefaSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new EspecieTarefaListActions.DeleteEspecieTarefaFailed(action.payload));
                        })
                    );
                })
            );
}
