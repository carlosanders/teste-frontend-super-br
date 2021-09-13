import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AssinaturaListActions from '../actions';

import {AssinaturaService} from '@cdk/services/assinatura.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Assinatura} from '@cdk/models';
import {assinatura as assinaturaSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';

@Injectable()
export class AssinaturaListEffect {

    routerState: any;
    /**
     * Get Assinaturas with router parameters
     *
     * @type {Observable<any>}
     */
    getAssinaturas: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaListActions.GetAssinaturas>(AssinaturaListActions.GET_ASSINATURAS),
        switchMap(action => this._assinaturaService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate))),
        mergeMap(response => [
            new AddData<Assinatura>({data: response['entities'], schema: assinaturaSchema}),
            new AssinaturaListActions.GetAssinaturasSuccess({
                entitiesId: response['entities'].map(assinatura => assinatura.id),
                loaded: {
                    id: 'componenteDigitalHandle',
                    value: this.routerState.params.componenteDigitalHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new AssinaturaListActions.GetAssinaturasFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _assinaturaService: AssinaturaService,
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
