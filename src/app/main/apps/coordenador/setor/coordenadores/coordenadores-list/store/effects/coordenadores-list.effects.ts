import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as CoordenadoresListActions from '../actions';

import {CoordenadorService} from '@cdk/services/coordenador.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Coordenador} from '@cdk/models/coordenador.model';
import {coordenador as coordenadorSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class CoordenadoresListEffects {
    routerState: any;
    /**
     * Get Coordenadores with router parameters
     *
     * @type {Observable<any>}
     */
    getCoordenadores: any = createEffect(() => this._actions.pipe(
        ofType<CoordenadoresListActions.GetCoordenadores>(CoordenadoresListActions.GET_COORDENADORES_SETOR),
        switchMap(action => this._coordenadorService.query(
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
                new AddData<Coordenador>({data: response['entities'], schema: coordenadorSchema}),
                new CoordenadoresListActions.GetCoordenadoresSuccess({
                    entitiesId: response['entities'].map(coordenador => coordenador.id),
                    loaded: {
                        id: 'setorHandle',
                        value: this.routerState.params.setorHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new CoordenadoresListActions.GetCoordenadoresFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _coordenadorService: CoordenadorService,
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
