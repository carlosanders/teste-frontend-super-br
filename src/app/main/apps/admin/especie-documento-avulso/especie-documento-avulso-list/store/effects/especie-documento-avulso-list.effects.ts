import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store';
import * as fromStore from '../';
import {LoginService} from 'app/main/auth/login/login.service';
import {EspecieDocumentoAvulsoService} from '@cdk/services/especie-documento-avulso.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {EspecieDocumentoAvulso} from '@cdk/models';
import {especieDocumentoAvulso as especieDocumentoAvulsoSchema} from '@cdk/normalizr';

@Injectable()
export class EspecieDocumentoAvulsoListEffects {

    routerState: any;

    getDocumentoAvulso: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetEspecieDocumentoAvulso>(fromStore.GET_ESPECIE_DOCUMENTO_AVULSO),
        switchMap(action => this._especieDocumentoAvulso.query(
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
                new AddData<EspecieDocumentoAvulso>({data: response['entities'], schema: especieDocumentoAvulsoSchema}),
                new fromStore.GetEspecieDocumentoAvulsoSuccess({
                    entitiesId: response['entities'].map(especieDocumentoAvulso => especieDocumentoAvulso.id),
                    loaded: {
                        id: 'especieDocumentoAvulsoHandle',
                        value: this.routerState.params['especieDocumentoAvulsoHandle']
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new fromStore.GetEspecieDocumentoAvulsoFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _especieDocumentoAvulso: EspecieDocumentoAvulsoService,
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
