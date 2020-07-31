import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, exhaustMap, mergeMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AtividadeListActions from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-list/store/actions';

import {AtividadeService} from '@cdk/services/atividade.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Atividade} from '@cdk/models';
import {atividade as atividadeSchema} from '@cdk/normalizr';

@Injectable()
export class AtividadeListEffect {
    
    routerState: any;

    constructor(
        private _actions: Actions,
        private _atividadeService: AtividadeService,
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
     * Get Atividades with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getAtividades: any =
        this._actions
            .pipe(
                ofType<AtividadeListActions.GetAtividades>(AtividadeListActions.GET_ATIVIDADES),
                exhaustMap((action) => {
                    return this._atividadeService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.folderFilter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap((response) => [
                    new AddData<Atividade>({data: response['entities'], schema: atividadeSchema}),
                    new AtividadeListActions.GetAtividadesSuccess({
                        entitiesId: response['entities'].map(atividade => atividade.id),
                        loaded: {
                            id: 'tarefaHandle',
                            value: this.routerState.params.tarefaHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AtividadeListActions.GetAtividadesFailed(err));
                    return caught;
                })
            );
}
