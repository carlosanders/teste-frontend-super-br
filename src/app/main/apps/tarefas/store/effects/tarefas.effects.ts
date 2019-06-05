import {AddData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr/tarefa.schema';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, exhaustMap, concatMap, mergeMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TarefasActions from 'app/main/apps/tarefas/store/actions/tarefas.actions';

import {Tarefa} from '@cdk/models/tarefa.model';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {plainToClass} from 'class-transformer';

@Injectable()
export class TarefasEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
        private _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }

    /**
     * Get Tarefas with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTarefas: Observable<any> =
        this._actions
            .pipe(
                ofType<TarefasActions.GetTarefas>(TarefasActions.GET_TAREFAS),
                exhaustMap((action) => {
                    return this._tarefaService.query(
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
                    new AddData<Tarefa>({data: response['entities'], schema: tarefaSchema}),
                    new TarefasActions.GetTarefasSuccess({
                        entitiesId: response['entities'].map(tarefa => tarefa.id),
                        loaded: {
                            id: 'folderHandle',
                            value: this.routerState.params.folderHandle
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
     * Update Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    setCurrentTarefa: Observable<TarefasActions.TarefasActionsAll> =
        this._actions
            .pipe(
                ofType<TarefasActions.SetCurrentTarefa>(TarefasActions.SET_CURRENT_TAREFA),
                map((action) => {
                    this._router.navigate([
                        'apps/tarefas/' + this.routerState.params.folderHandle + '/tarefa/' + action.payload.tarefaId + '/processo/' + action.payload.processoId]
                    ).then();
                    return new TarefasActions.SetCurrentTarefaSuccess();
                })
            );

    /**
     * Update Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    createTarefa: Observable<TarefasActions.TarefasActionsAll> =
        this._actions
            .pipe(
                ofType<TarefasActions.CreateTarefa>(TarefasActions.CREATE_TAREFA),
                map(() => {
                    this._router.navigate(['apps/tarefas/' + this.routerState.params.folderHandle + '/criar']).then();
                    return new TarefasActions.CreateTarefaSuccess();
                })
            );

    /**
     * Delete Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    deleteTarefa: Observable<TarefasActions.TarefasActionsAll> =
        this._actions
            .pipe(
                ofType<TarefasActions.DeleteTarefa>(TarefasActions.DELETE_TAREFA),
                mergeMap((action) => {
                    return this._tarefaService.destroy(action.payload).pipe(
                        map((response) => new TarefasActions.DeleteTarefaSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new TarefasActions.DeleteTarefaFailed(action.payload));
                        })
                    );
                })
            );

    /**
     * Set Folder on Selected Tarefas
     * @type {Observable<any>}
     */
    @Effect()
    setFolderOnSelectedTarefas: Observable<any> =
        this._actions
            .pipe(
                ofType<TarefasActions.SetFolderOnSelectedTarefas>(TarefasActions.SET_FOLDER_ON_SELECTED_TAREFAS),
                concatMap((action) => {
                    const tarefa = plainToClass(Tarefa, <Tarefa>action.payload.tarefa);
                    tarefa.folder = action.payload.folder;
                    return this._tarefaService.save(tarefa);
                }),
                map((response: any) => {
                    return new TarefasActions.SetFolderOnSelectedTarefasSuccess(response);
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TarefasActions.SetFolderOnSelectedTarefasFailed(err));
                    return caught;
                })
            );
}
