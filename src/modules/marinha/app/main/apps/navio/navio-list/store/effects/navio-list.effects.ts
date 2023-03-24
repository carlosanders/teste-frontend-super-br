import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';
import {getRouterState, State} from '../../../../../../../../../app/store';
import * as NavioListActions from '../actions';
import {LoginService} from '../../../../../../../../../app/main/auth/login/login.service';
import {NavioService} from '../../../../../../../@cdk/services/navio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Navio} from '../../../../../../../@cdk/models/navio.model';
import {navio as navioSchema} from '../../../../../../../@cdk/normalizr';


@Injectable()
export class NavioListEffects {
    routerState: any;
    /**
     * Get Navio with router parameters
     *
     * @type {Observable<any>}
     */
    getNavio: any = createEffect(() => this._actions.pipe(
        ofType<NavioListActions.GetNavio>(NavioListActions.GET_NAVIO),
        switchMap(action => this._navioService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)).pipe(
            mergeMap(response => [
                new AddData<Navio>({data: response['entities'], schema: navioSchema}),
                new NavioListActions.GetNavioSuccess({
                    entitiesId: response['entities'].map(navio => navio.id),
                    loaded: {
                        id: 'navioHandle',
                        value: this.routerState.params.navioHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new NavioListActions.GetNavioFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _navioService: NavioService,
        private _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
