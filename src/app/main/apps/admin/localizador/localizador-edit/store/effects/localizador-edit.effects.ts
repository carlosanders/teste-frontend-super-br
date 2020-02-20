import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as LocalizadorEditActions from '../actions/localizador-edit.actions';
import * as LocalizadorListActions from '../../../localizador-list/store/actions/localizador-list.actions';

import {LocalizadorService} from '@cdk/services/localizador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {localizador as localizadorSchema} from '@cdk/normalizr/localizador.schema';
import {Localizador} from '@cdk/models/localizador.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class LocalizadorEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _localizadorService: LocalizadorService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
     * Get Localizador with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getLocalizador: any =
        this._actions
            .pipe(
                ofType<LocalizadorEditActions.GetLocalizador>(LocalizadorEditActions.GET_LOCALIZADOR),
                switchMap((action) => {
                    return this._localizadorService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Localizador>({data: response['entities'], schema: localizadorSchema}),
                    new LocalizadorEditActions.GetLocalizadorSuccess({
                        loaded: {
                            id: 'localizadorHandle',
                            value: this.routerState.params.localizadorHandle
                        },
                        localizadorId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new LocalizadorEditActions.GetLocalizadorFailed(err));
                    return caught;
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
                ofType<LocalizadorEditActions.SaveLocalizador>(LocalizadorEditActions.SAVE_LOCALIZADOR),
                switchMap((action) => {
                    console.log(action);
                    return this._localizadorService.save(action.payload).pipe(
                        mergeMap((response: Localizador) => [
                            new LocalizadorEditActions.SaveLocalizadorSuccess(),
                            new LocalizadorListActions.ReloadLocalizadores(),
                            new AddData<Localizador>({data: [response], schema: localizadorSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new LocalizadorEditActions.SaveLocalizadorFailed(err));
                    return caught;
                })
            );

    /**
     * Save Localizador Success
     */
    @Effect({dispatch: false})
    saveLocalizadorSuccess: any =
        this._actions
            .pipe(
                ofType<LocalizadorEditActions.SaveLocalizadorSuccess>(LocalizadorEditActions.SAVE_LOCALIZADOR_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.localizadorHandle), 'listar')]).then();
                })
            );
}
