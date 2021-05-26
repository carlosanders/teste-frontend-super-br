import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as EspecieTarefaEditActions from '../actions/especie-tarefa-edit.actions';
import * as EspecieTarefaListActions from '../../../especie-tarefa-list/store/actions/especie-tarefa-list.actions';

import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {especieTarefa as especieTarefaSchema} from '@cdk/normalizr';
import {colaborador as colaboradorSchema} from '@cdk/normalizr';
import {EspecieTarefa, Colaborador} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class EspecieTarefaEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _especieTarefaService: EspecieTarefaService,
        private _colaboradorService: ColaboradorService,
        private _store: Store<State>,
        private _loginService: LoginService,
        private _router: Router
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
     * Get EspecieTarefa with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getEspecieTarefa: any =
        this._actions
            .pipe(
                ofType<EspecieTarefaEditActions.GetEspecieTarefa>(EspecieTarefaEditActions.GET_ESPECIE_TAREFA),
                switchMap(action => this._especieTarefaService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}))),
                switchMap(response => [
                    new AddData<EspecieTarefa>({data: response['entities'], schema: especieTarefaSchema}),
                    new EspecieTarefaEditActions.GetEspecieTarefaSuccess({
                        loaded: {
                            id: 'especieTarefaHandle',
                            value: this.routerState.params.especieTarefaHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EspecieTarefaEditActions.GetEspecieTarefaFailed(err));
                    return caught;
                })
            );

    /**
     * Save EspecieTarefa
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveEspecieTarefa: any =
        this._actions
            .pipe(
                ofType<EspecieTarefaEditActions.SaveEspecieTarefa>(EspecieTarefaEditActions.SAVE_ESPECIE_TAREFA),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._especieTarefaService.save(action.payload, context).pipe(
                        mergeMap((response: EspecieTarefa) => [
                            new EspecieTarefaListActions.ReloadEspecieTarefa(),
                            new AddData<EspecieTarefa>({data: [response], schema: especieTarefaSchema}),
                            new EspecieTarefaEditActions.SaveEspecieTarefaSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EspecieTarefaEditActions.SaveEspecieTarefaFailed(err));
                    return caught;
                })
            );

    /**
     * Update EspecieTarefa
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateEspecieTarefa: any =
        this._actions
            .pipe(
                ofType<EspecieTarefaEditActions.UpdateEspecieTarefa>(EspecieTarefaEditActions.UPDATE_ESPECIE_TAREFA),
                switchMap(action => this._especieTarefaService.patch(action.payload.especieTarefa, action.payload.changes).pipe(
                        mergeMap((response: EspecieTarefa) => [
                            new EspecieTarefaListActions.ReloadEspecieTarefa(),
                            new AddData<EspecieTarefa>({data: [response], schema: especieTarefaSchema}),
                            new EspecieTarefaEditActions.UpdateEspecieTarefaSuccess(response)
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EspecieTarefaEditActions.UpdateEspecieTarefaFailed(err));
                    return caught;
                })
            );

    /**
     * Save EspecieTarefa Success
     */
    @Effect({dispatch: false})
    saveEspecieTarefaSuccess: any =
        this._actions
            .pipe(
                ofType<EspecieTarefaEditActions.SaveEspecieTarefaSuccess>(EspecieTarefaEditActions.SAVE_ESPECIE_TAREFA_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/especie-tarefas/listar']).then();
                })
            );


}
