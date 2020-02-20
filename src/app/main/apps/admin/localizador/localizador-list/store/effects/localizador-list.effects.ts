import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as LocalizadorListActions from '../actions';

import {LocalizadorService} from '@cdk/services/localizador.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Localizador} from '@cdk/models/localizador.model';
import {localizador as localizadorSchema} from '@cdk/normalizr/localizador.schema';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class LocalizadorListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _localizadorService: LocalizadorService,
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
     * Get Localizadores with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getLocalizadores: any =
        this._actions
            .pipe(
                ofType<LocalizadorListActions.GetLocalizadores>(LocalizadorListActions.GET_LOCALIZADORES),
                switchMap((action) => {
                    return this._localizadorService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)).pipe(
                        mergeMap((response) => [
                            new AddData<Localizador>({data: response['entities'], schema: localizadorSchema}),
                            new LocalizadorListActions.GetLocalizadoresSuccess({
                                entitiesId: response['entities'].map(localizador => localizador.id),
                                loaded: {
                                    id: 'localizadorHandle',
                                    value: this._loginService.getUserProfile().id
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new LocalizadorListActions.GetLocalizadoresFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Localizador
     * @type {Observable<any>}
     */
    @Effect()
    deleteLocalizador: any =
        this._actions
            .pipe(
                ofType<LocalizadorListActions.DeleteLocalizador>(LocalizadorListActions.DELETE_LOCALIZADOR),
                mergeMap((action) => {
                    return this._localizadorService.destroy(action.payload).pipe(
                        map((response) => new LocalizadorListActions.DeleteLocalizadorSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new LocalizadorListActions.DeleteLocalizadorFailed(action.payload));
                        })
                    );
                })
            );

    /**
     * Save Localizador
     * @type {Observable<any>}
     */
    @Effect()
    saveLocalizador: any =
        this._actions
            .pipe(
                ofType<LocalizadorListActions.SaveLocalizador>(LocalizadorListActions.SAVE_LOCALIZADOR),
                switchMap((action) => {
                    return this._localizadorService.save(action.payload.localizador).pipe(
                        mergeMap((response: Localizador) => [
                            new UpdateData<Localizador>({id: response.id, schema: localizadorSchema, changes: {}}),
                            new LocalizadorListActions.SaveLocalizadorSuccess(),  new OperacoesActions.Resultado({
                                type: 'localizador',
                                content: `Localizador id ${response.id} editada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new LocalizadorListActions.SaveLocalizadorFailed(err));
                        })
                    );
                })
            );
}
