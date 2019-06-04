import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as EtiquetaEditActions from '../actions/etiqueta-edit.actions';
import * as EtiquetaListActions from '../../../etiqueta-list/store/actions/etiqueta-list.actions';

import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {etiqueta as etiquetaSchema} from '@cdk/normalizr/etiqueta.schema';
import {Etiqueta} from '@cdk/models/etiqueta.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class EtiquetaEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _etiquetaService: EtiquetaService,
        private _store: Store<State>,
        private _loginService: LoginService,
        private _router: Router
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
     * Get Etiqueta with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getEtiqueta: any =
        this._actions
            .pipe(
                ofType<EtiquetaEditActions.GetEtiqueta>(EtiquetaEditActions.GET_ETIQUETA),
                switchMap((action) => {
                    return this._etiquetaService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Etiqueta>({data: response['entities'], schema: etiquetaSchema}),
                    new EtiquetaEditActions.GetEtiquetaSuccess({
                        loaded: {
                            id: 'etiquetaHandle',
                            value: this.routerState.params.etiquetaHandle
                        },
                        etiquetaId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EtiquetaEditActions.GetEtiquetaFailed(err));
                    return caught;
                })
            );

    /**
     * Save Etiqueta
     * @type {Observable<any>}
     */
    @Effect()
    saveEtiqueta: any =
        this._actions
            .pipe(
                ofType<EtiquetaEditActions.SaveEtiqueta>(EtiquetaEditActions.SAVE_ETIQUETA),
                switchMap((action) => {
                    return this._etiquetaService.save(action.payload).pipe(
                        mergeMap((response: Etiqueta) => [
                            new EtiquetaEditActions.SaveEtiquetaSuccess(),
                            new EtiquetaListActions.ReloadEtiquetas(),
                            new AddData<Etiqueta>({data: [response], schema: etiquetaSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EtiquetaEditActions.SaveEtiquetaFailed(err));
                    return caught;
                })
            );

    /**
     * Save Etiqueta Success
     */
    @Effect({dispatch: false})
    saveEtiquetaSuccess: any =
        this._actions
            .pipe(
                ofType<EtiquetaEditActions.SaveEtiquetaSuccess>(EtiquetaEditActions.SAVE_ETIQUETA_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.etiquetaHandle), 'listar')]).then();
                })
            );
}
