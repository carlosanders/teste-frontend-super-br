import {AddData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TarefasActions from '../actions/tarefas.actions';

import {Tarefa} from '@cdk/models';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import * as OperacoesActions from '../../../../../store/actions/operacoes.actions';

@Injectable()
export class TarefasEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
        public _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }

    /**
     * Get Tarefas with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getTarefas: Observable<any> =
        this._actions
            .pipe(
                ofType<TarefasActions.GetTarefas>(TarefasActions.GET_TAREFAS),
                switchMap(action => this._tarefaService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.folderFilter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate))),
                mergeMap(response => [
                    new AddData<Tarefa>({data: response['entities'], schema: tarefaSchema}),
                    new TarefasActions.GetTarefasSuccess({
                        entitiesId: response['entities'].map(tarefa => tarefa.id),
                        loaded: {
                            id: 'typeHandle_targetHandle',
                            value: this.routerState.params.typeHandle + '_' + this.routerState.params.targetHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TarefasActions.GetTarefasFailed(err));
                    return caught;
                })
            );

    /**
     * Save Tarefa
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveTarefa: any =
        this._actions
            .pipe(
                ofType<TarefasActions.SaveTarefa>(TarefasActions.SAVE_TAREFA),
                mergeMap(action => this._tarefaService.patch(action.payload.tarefa, action.payload.changes).pipe(
                        mergeMap((response: Tarefa) => [
                            new TarefasActions.SaveTarefaSuccess(response),
                            new AddData<Tarefa>({data: [response], schema: tarefaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'tarefa',
                                content: `Tarefa id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TarefasActions.SaveTarefaFailed(err));
                        })
                    ))
            );

    /**
     * Save Tarefa Success
     */
    @Effect({dispatch: false})
    saveTarefaSuccess: any =
        this._actions
            .pipe(
                ofType<TarefasActions.SaveTarefaSuccess>(TarefasActions.SAVE_TAREFA_SUCCESS),
                tap(() => {
                    // this._router.navigate([this.routerState.url.replace('/criar', '')]).then();
                })
            );

    /**
     * Update Tarefa
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    createTarefa: Observable<TarefasActions.TarefasActionsAll> =
        this._actions
            .pipe(
                ofType<TarefasActions.CreateTarefa>(TarefasActions.CREATE_TAREFA),
                tap(() => {
                    this._router.navigate(['apps/tarefas/administrativo/minhas-tarefas/entrada/criar']).then();
                })
            );

    /**
     * Delete Tarefa
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteTarefa: Observable<TarefasActions.TarefasActionsAll> =
        this._actions
            .pipe(
                ofType<TarefasActions.DeleteTarefa>(TarefasActions.DELETE_TAREFA),
                mergeMap(action => this._tarefaService.destroy(action.payload).pipe(
                        map(response => new TarefasActions.DeleteTarefaSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new TarefasActions.DeleteTarefaFailed(action.payload));
                        })
                    ))
            );
}
