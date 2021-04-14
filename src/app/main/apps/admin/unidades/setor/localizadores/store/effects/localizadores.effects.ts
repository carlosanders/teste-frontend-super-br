import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

import * as RootLocalizadoresActions from '../actions/localizadores.actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models/setor.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';

@Injectable()
export class LocalizadoresEffects {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _setorService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _setorService: SetorService,
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
     * Get Setor with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getSetor: any =
        this._actions
            .pipe(
                ofType<RootLocalizadoresActions.GetSetor>(RootLocalizadoresActions.GET_SETOR),
                switchMap((action) => {
                    return this._setorService.get(
                        action.payload.id,
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true})
                    );
                }),
                switchMap(response => [
                    new AddData<Setor>({data: [response], schema: setorSchema}),
                    new RootLocalizadoresActions.GetSetorSuccess({
                        loaded: {
                            id: 'setorHandle',
                            value: this.routerState.params.setorHandle
                        },
                        setorId: this.routerState.params.setorHandle
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RootLocalizadoresActions.GetSetorFailed(err));
                    return caught;
                })
            );
}
