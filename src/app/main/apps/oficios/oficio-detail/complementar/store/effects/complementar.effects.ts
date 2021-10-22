import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from '../../../../../../../store';
import * as ComplementarActions from '../actions/complementar.actions';
import {filter, tap} from 'rxjs/operators';

@Injectable()
export class ComplementarEffects {
    routerState: any;
    /**
     * Converte Documento
     *
     */
    getResponderSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ComplementarActions.SaveComplementarSuccess>(ComplementarActions.SAVE_COMPLEMENTAR_SUCCESS),
        tap((action) => {
            this._router.navigate(['apps/oficios/' + action.payload + '/complementar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _router: Router,
        private _store: Store<State>,
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
