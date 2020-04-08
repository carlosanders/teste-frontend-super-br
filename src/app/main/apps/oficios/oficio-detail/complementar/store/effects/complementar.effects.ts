import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getRouterState, State } from '../../../../../../../store/reducers';
import * as ComplementarActions from '../actions/complementar.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class ComplementarEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _router: Router,
        private _store: Store<State>,
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
     * Converte Documento
     * @type {Observable<any>}
     */
    @Effect()
    getResponderSuccess: any =
        this._actions
            .pipe(
                ofType<ComplementarActions.SaveComplementarSuccess>(ComplementarActions.SAVE_COMPLEMENTAR_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/oficios/' + action.payload + '/complementar']
                    ).then();
                })
            );
}