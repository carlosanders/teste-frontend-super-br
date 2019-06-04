import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, exhaustMap, mergeMap, concatMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TesteActions from 'app/main/apps/teste/store/actions/teste.actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {Router} from '@angular/router';

@Injectable()
export class TesteEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _testeService: TarefaService,
        private _store: Store<State>,
        private _router: Router
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
     * Get Teste with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTeste: Observable<TesteActions.TesteActionsAll> =
        this._actions
            .pipe(
                ofType<TesteActions.GetTeste>(TesteActions.GET_TESTE),
                exhaustMap((action) => {

                    return this._testeService.query(
                        action.payload.filter,
                        action.payload.limit,
                        action.payload.offset,
                        action.payload.sort,
                        action.payload.populate)
                        .pipe(
                            map(response => {
                                return new TesteActions.GetTesteSuccess({
                                    entities: response['entities'],
                                    total: response['total']
                                });
                            }),
                            catchError((err, caught) => {
                                console.log(err);
                                this._store.dispatch(new TesteActions.GetTesteFailed(err));
                                return caught;
                            })
                        );
                })
            );

    /**
     * Update Teste
     * @type {Observable<any>}
     */
    @Effect()
    createTeste: Observable<TesteActions.TesteActionsAll> =
        this._actions
            .pipe(
                ofType<TesteActions.CreateTeste>(TesteActions.CREATE_TESTE),
                map(() => {
                    this._router.navigate([this.routerState.url + '/criar']).then();
                    return new TesteActions.CreateTesteSuccess();
                })
            );

    /**
     * Set Current Teste
     * Navigate to parent directory if not exist in teste list
     * Update Current Teste if exist in teste list
     * @type {Observable<any>}
     */
    @Effect()
    setCurrentTeste: Observable<TesteActions.TesteActionsAll> =
        this._actions
            .pipe(
                ofType<TesteActions.EditTeste>(TesteActions.EDIT_TESTE),
                map((action) => {
                    this._router.navigate([this.routerState.url + '/editar/' + action.payload]).then();
                    return new TesteActions.EditTesteuccess();
                })
            );


    /**
     * Delete Teste
     * @type {Observable<any>}
     */
    @Effect()
    deleteTeste: Observable<TesteActions.TesteActionsAll> =
        this._actions
            .pipe(
                ofType<TesteActions.DeleteTeste>(TesteActions.DELETE_TESTE),
                mergeMap((action) => {
                        return this._testeService.destroy(action.payload)
                            .pipe(
                                map(() => {
                                    return new TesteActions.DeleteTesteSuccess(action.payload);
                                }),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new TesteActions.DeleteTesteFailed(err));
                                    return caught;
                                })
                            );
                    }
                ));

    /**
     * Save Teste
     * @type {Observable<any>}
     */
    @Effect()
    saveTeste: Observable<TesteActions.TesteActionsAll> =
        this._actions
            .pipe(
                ofType<TesteActions.SaveTeste>(TesteActions.SAVE_TESTE),
                map((action) => action.payload),
                concatMap((teste) => this._testeService.save(teste).pipe(
                    map((response: any) => {
                        if (teste.id) {
                            this._router.navigate([this.routerState.url.replace('/editar/' + teste.id, '')]).then();
                        } else {
                            this._router.navigate([this.routerState.url.replace('/criar', '')]).then();
                        }
                        return new TesteActions.SaveTesteuccess(response);
                    }),
                    catchError((err, caught) => {
                        console.log(err);
                        this._store.dispatch(new TesteActions.SaveTesteFailed(err));
                        return caught;
                    })
                ))
            );

    /**
     * Get Teste with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getCurrentTeste: Observable<TesteActions.TesteActionsAll> =
        this._actions
            .pipe(
                ofType<TesteActions.GetCurrentTeste>(TesteActions.GET_CURRENT_TESTE),
                exhaustMap(() => {

                    let handle = {
                        id: '',
                        value: ''
                    };

                    const routeParams = of('tarefaId');
                    routeParams.subscribe(param => {
                        if (this.routerState.params[param]) {
                            handle = {
                                id: param,
                                value: this.routerState.params[param]
                            };
                        }
                    });

                    return this._testeService.query(
                        `{"id": "eq:${handle.value}"}`,
                        1,
                        0,
                        '{}',
                        '["populateAll"]')
                        .pipe(
                            map(response => {

                                return new TesteActions.GetCurrentTesteuccess({
                                    teste: response['entities'][0],
                                    loaded: handle,
                                });
                            }),
                            catchError((err, caught) => {
                                console.log(err);
                                this._store.dispatch(new TesteActions.GetCurrentTesteFailed(err));
                                return caught;
                            })
                        );
                })
            );
}
