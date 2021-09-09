import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from '../../../../../../../store';
import * as ResponderActions from '../actions/responder.actions';
import {filter, tap} from 'rxjs/operators';

@Injectable()
export class ResponderEffects {
    routerState: any;
    /**
     * Converte Documento
     *
     * @type any
     */
    getResponderSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ResponderActions.SaveRespostaSuccess>(ResponderActions.SAVE_RESPOSTA_SUCCESS),
        tap((action) => {
            this._router.navigate(['apps/oficios/' + this.routerState.param['oficioTargetHandle']
                + '/' + action.payload + '/responder']
            ).then();
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
