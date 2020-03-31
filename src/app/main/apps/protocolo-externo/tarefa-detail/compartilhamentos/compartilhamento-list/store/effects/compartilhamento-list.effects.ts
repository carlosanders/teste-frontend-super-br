import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, exhaustMap, mergeMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as CompartilhamentoListActions from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-list/store/actions';

import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Compartilhamento} from '@cdk/models';
import {compartilhamento as compartilhamentoSchema} from '@cdk/normalizr/compartilhamento.schema';

@Injectable()
export class CompartilhamentoListEffect {
    
    routerState: any;

    constructor(
        private _actions: Actions,
        private _compartilhamentoService: CompartilhamentoService,
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
     * Get Compartilhamentos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getCompartilhamentos: any =
        this._actions
            .pipe(
                ofType<CompartilhamentoListActions.GetCompartilhamentos>(CompartilhamentoListActions.GET_COMPARTILHAMENTOS),
                exhaustMap((action) => {
                    return this._compartilhamentoService.query(
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
                    new AddData<Compartilhamento>({data: response['entities'], schema: compartilhamentoSchema}),
                    new CompartilhamentoListActions.GetCompartilhamentosSuccess({
                        entitiesId: response['entities'].map(compartilhamento => compartilhamento.id),
                        loaded: {
                            id: 'tarefaHandle',
                            value: this.routerState.params.tarefaHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new CompartilhamentoListActions.GetCompartilhamentosFailed(err));
                    return caught;
                })
            );
}
