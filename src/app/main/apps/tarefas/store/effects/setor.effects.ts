import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RootSetorActions from '../actions/setor.actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models/setor.model';
import {setor as setorSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class SetorEffects {
    routerState: any;
    /**
     * Get Setores with router parameters
     *
     * @type {Observable<any>}
     */
    getSetores: any = createEffect(() => this._actions.pipe(
        ofType<RootSetorActions.GetSetores>(RootSetorActions.GET_SETORES),
        switchMap(action => this._setorService.query(
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
                new AddData<Setor>({data: response['entities'], schema: setorSchema}),
                new RootSetorActions.GetSetoresSuccess({
                    entitiesId: response['entities'].map(setor => setor.id),
                    unidadeId: action.payload.unidadeId,
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new RootSetorActions.GetSetoresFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _setorService: SetorService,
        public _loginService: LoginService,
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
