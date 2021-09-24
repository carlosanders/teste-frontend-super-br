import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, exhaustMap, filter, mergeMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AtividadeListActions from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-list/store/actions';

import {AtividadeService} from '@cdk/services/atividade.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Atividade} from '@cdk/models';
import {atividade as atividadeSchema} from '@cdk/normalizr';

@Injectable()
export class AtividadeListEffect {

    routerState: any;
    /**
     * Get Atividades with router parameters
     *
     * @type {Observable<any>}
     */
    getAtividades: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AtividadeListActions.GetAtividades>(AtividadeListActions.GET_ATIVIDADES),
        exhaustMap(action => this._atividadeService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.folderFilter,
                ...action.payload.listFilter,
                ...action.payload.etiquetaFilter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate))),
        mergeMap(response => [
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
        catchError((err) => {
            console.log(err);
            return of(new AtividadeListActions.GetAtividadesFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _atividadeService: AtividadeService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
