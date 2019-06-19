import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RelacionamentoListActions from '../actions';

import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {RelacionamentoPessoal} from '@cdk/models/relacionamento-pessoal.model';
import {relacionamentoPessoal as relacionamentoSchema} from '@cdk/normalizr/relacionamento-pessoal.schema';

@Injectable()
export class RelacionamentoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _relacionamentoPessoalService: RelacionamentoPessoalService,
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
     * Get Relacionamentos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getRelacionamentos: any =
        this._actions
            .pipe(
                ofType<RelacionamentoListActions.GetRelacionamentos>(RelacionamentoListActions.GET_RELACIONAMENTOS),
                switchMap((action) => {
                    return this._relacionamentoPessoalService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                mergeMap((response) => [
                    new AddData<RelacionamentoPessoal>({data: response['entities'], schema: relacionamentoSchema}),
                    new RelacionamentoListActions.GetRelacionamentosSuccess({
                        entitiesId: response['entities'].map(relacionamento => relacionamento.id),
                        loaded: {
                            id: 'pessoaHandle',
                            value: this.routerState.params.pessoaHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new RelacionamentoListActions.GetRelacionamentosFailed(err));
                    return caught;
                })

            );

    /**
     * Delete Relacionamento
     * @type {Observable<any>}
     */
    @Effect()
    deleteRelacionamento: any =
        this._actions
            .pipe(
                ofType<RelacionamentoListActions.DeleteRelacionamento>(RelacionamentoListActions.DELETE_RELACIONAMENTO),
                mergeMap((action) => {
                    return this._relacionamentoPessoalService.destroy(action.payload).pipe(
                        map((response) => new RelacionamentoListActions.DeleteRelacionamentoSuccess(response.id)),
                        catchError((err) => {
                            console.log (err);
                            return of(new RelacionamentoListActions.DeleteRelacionamentoFailed(action.payload));
                        })
                    );
                })
            );
}
