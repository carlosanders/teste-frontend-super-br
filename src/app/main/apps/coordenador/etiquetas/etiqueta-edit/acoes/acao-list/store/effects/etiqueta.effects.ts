import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as EtiquetaActions from '../actions/etiqueta.actions';

import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Etiqueta} from '@cdk/models';
import {etiqueta as etiquetaSchema} from '@cdk/normalizr';

@Injectable()
export class EtiquetaEffect {
    routerState: any;
    /**
     * Get Etiqueta with router parameters
     *
     * @type {Observable<any>}
     */
    getEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EtiquetaActions.GetEtiqueta>(EtiquetaActions.GET_ETIQUETA),
        switchMap(action => this._etiquetaService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll',
                'modalidadeEtiqueta'
            ]),
            JSON.stringify({isAdmin: true})
        )),
        switchMap(response => [
            new AddData<Etiqueta>({data: response['entities'], schema: etiquetaSchema}),
            new EtiquetaActions.GetEtiquetaSuccess({
                loaded: {
                    id: 'etiquetaHandle',
                    value: this.routerState.params.etiquetaHandle
                },
                etiquetaId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new EtiquetaActions.GetEtiquetaFailed(err));
        })
    ));
    private _profile: any;

    constructor(
        private _actions: Actions,
        private _etiquetaService: EtiquetaService,
        public _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._profile = _loginService.getUserProfile();
    }
}
