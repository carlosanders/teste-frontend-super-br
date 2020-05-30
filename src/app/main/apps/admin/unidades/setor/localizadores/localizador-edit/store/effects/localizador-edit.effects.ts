import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as RootLocalizadorEditActions from '../actions/localizador-edit.actions';
import * as RootLocalizadoresListActions from '../../../localizadores-list/store/actions/localizadores-list.actions';

import {LocalizadorService} from '@cdk/services/localizador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {localizador as localizadorSchema} from '@cdk/normalizr/localizador.schema';
import {Localizador} from '@cdk/models/localizador.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class LocalizadorEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _localizadorService: LocalizadorService,
        private _store: Store<State>,
        public _loginService: LoginService,
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
                ofType<RootLocalizadorEditActions.GetLocalizador>(RootLocalizadorEditActions.GET_LOCALIZADOR),
                switchMap((action) => {
                    return this._localizadorService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}));
                }),
                switchMap(response => [
                    new AddData<Localizador>({data: response['entities'], schema: localizadorSchema}),
                    new RootLocalizadorEditActions.GetLocalizadorSuccess({
                        loaded: {
                            id: 'localizadorHandle',
                            value: this.routerState.params.localizadorHandle
                        },
                        localizadorId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RootLocalizadorEditActions.GetLocalizadorFailed(err));
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
                ofType<RootLocalizadorEditActions.SaveLocalizador>(RootLocalizadorEditActions.SAVE_LOCALIZADOR),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._localizadorService.save(action.payload, context).pipe(
                        mergeMap((response: Localizador) => [
                            new RootLocalizadorEditActions.SaveLocalizadorSuccess(),
                            new RootLocalizadoresListActions.ReloadLocalizadores(),
                            new AddData<Localizador>({data: [response], schema: localizadorSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RootLocalizadorEditActions.SaveLocalizadorFailed(err));
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
                ofType<RootLocalizadorEditActions.SaveLocalizadorSuccess>(RootLocalizadorEditActions.SAVE_LOCALIZADOR_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.localizadorHandle), 'listar')]).then();
                })
            );
}