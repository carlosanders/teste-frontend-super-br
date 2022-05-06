import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, tap} from 'rxjs/operators';

import * as RouterActions from 'app/store/actions/router.action';
import {Store} from '@ngrx/store';
import {State} from '../reducers';

@Injectable()
export class RouterEffects {
    /**
     * Navigate
     */
    navigate$ = createEffect(() => this._actions.pipe(
        ofType(RouterActions.GO),
        map((action: RouterActions.Go) => action.payload),
        tap(({path, query: queryParams, extras}) => {
            this.router.navigate(path, {...queryParams, ...extras}).then();
        })
    ), {dispatch: false});
    /**
     * Navigate back
     */
    navigateBack$ = createEffect(() => this._actions.pipe(
        ofType(RouterActions.BACK),
        tap(() => {
            this.location.back();
        })
    ), {dispatch: false});
    /**
     * Navigate forward
     */
    navigateForward$ = createEffect(() => this._actions.pipe(
        ofType(RouterActions.FORWARD),
        tap(() => this.location.forward())
    ), {dispatch: false});

    /**
     * Constructor
     *
     * @param _actions
     * @param router
     * @param location
     * @param _store
     */
    constructor(
        private _actions: Actions,
        private router: Router,
        private location: Location,
        private _store: Store<State>
    ) {
    }
}
