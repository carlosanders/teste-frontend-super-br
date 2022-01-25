import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {filter} from 'rxjs/operators';

@Injectable()
export class AdminEffect {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
