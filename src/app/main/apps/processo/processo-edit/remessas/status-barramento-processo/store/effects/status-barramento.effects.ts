import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap} from 'rxjs/operators';
import {AddData} from '@cdk/ngrx-normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';

import {getRouterState, State} from 'app/store/reducers';
import * as StatusBarramentoActions from '../actions/status-barramento.actions';
import {StatusBarramentoService} from '../../../../../../../../../@cdk/services/status-barramento';
import {StatusBarramento} from '../../../../../../../../../@cdk/models/status-barramento';
import {statusBarramento as statusBarramentoSchema} from '../../../../../../../../../@cdk/normalizr';

@Injectable()
export class StatusBarramentoEffects {
    routerState: any;
    /**
     * Get Remeter Barrramento with router parameters
     *
     * @type {Observable<any>}
     */
    getBarramento: any = createEffect(() => this._actions.pipe(
            ofType<StatusBarramentoActions.GetBarramento>(StatusBarramentoActions.GET_BARRAMENTO_PROCESSO),
            switchMap(action => this._statusBarramentoService.query(
                JSON.stringify(action.payload),
                1,
                0,
                JSON.stringify({}),
                JSON.stringify([
                    'populateAll'
                ]))),
            switchMap(response => [
                new AddData<StatusBarramento>({data: response['entities'], schema: statusBarramentoSchema}),
                new StatusBarramentoActions.GetBarramentoSuccess({
                    statusBarramentoId: response['entities'][0] ? response['entities'][0].id : null,
                    remessaId: response['entities'][0] ? response['entities'][0].id : 'criar',
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new StatusBarramentoActions.GetBarramentoFailed(err));
            })
        )
    );

    constructor(
        private _actions: Actions,
        private _statusBarramentoService: StatusBarramentoService,
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
