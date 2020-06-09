import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as TipoRelatorioEditActions from '../actions/tipo-relatorio-edit.actions';
import * as TipoRelatorioListActions from '../../../tipo-relatorio-list/store/actions/tipo-relatorio-list.actions';

import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tipoRelatorio as tipoRelatorioSchema} from '@cdk/normalizr/tipo-relatorio.schema';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class TipoRelatorioEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tipoRelatorioService: TipoRelatorioService,
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
     * Get TipoRelatorio with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTipoRelatorio: any =
        this._actions
            .pipe(
                ofType<TipoRelatorioEditActions.GetTipoRelatorio>(TipoRelatorioEditActions.GET_TIPO_RELATORIO),
                switchMap((action) => {
                    return this._tipoRelatorioService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}));
                }),
                switchMap(response => [
                    new AddData<TipoRelatorio>({data: response['entities'], schema: tipoRelatorioSchema}),
                    new TipoRelatorioEditActions.GetTipoRelatorioSuccess({
                        loaded: {
                            id: 'tipoRelatorioHandle',
                            value: this.routerState.params.tipoRelatorioHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoRelatorioEditActions.GetTipoRelatorioFailed(err));
                    return caught;
                })
            );

    /**
     * Save TipoRelatorio
     * @type {Observable<any>}
     */
    @Effect()
    saveTipoRelatorio: any =
        this._actions
            .pipe(
                ofType<TipoRelatorioEditActions.SaveTipoRelatorio>(TipoRelatorioEditActions.SAVE_TIPO_RELATORIO),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._tipoRelatorioService.save(action.payload, context).pipe(
                        mergeMap((response: TipoRelatorio) => [
                            new TipoRelatorioListActions.ReloadTipoRelatorio(),
                            new AddData<TipoRelatorio>({data: [response], schema: tipoRelatorioSchema}),
                            new TipoRelatorioEditActions.SaveTipoRelatorioSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoRelatorioEditActions.SaveTipoRelatorioFailed(err));
                    return caught;
                })
            );

    /**
     * Update TipoRelatorio
     * @type {Observable<any>}
     */
    @Effect()
    updateTipoRelatorio: any =
        this._actions
            .pipe(
                ofType<TipoRelatorioEditActions.UpdateTipoRelatorio>(TipoRelatorioEditActions.UPDATE_TIPO_RELATORIO),
                switchMap((action) => {
                    return this._tipoRelatorioService.patch(action.payload.tipoRelatorio, action.payload.changes).pipe(
                        mergeMap((response: TipoRelatorio) => [
                            new TipoRelatorioListActions.ReloadTipoRelatorio(),
                            new AddData<TipoRelatorio>({data: [response], schema: tipoRelatorioSchema}),
                            new TipoRelatorioEditActions.UpdateTipoRelatorioSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoRelatorioEditActions.UpdateTipoRelatorioFailed(err));
                    return caught;
                })
            );

    /**
     * Save TipoRelatorio Success
     */
    @Effect({dispatch: false})
    saveTipoRelatorioSuccess: any =
        this._actions
            .pipe(
                ofType<TipoRelatorioEditActions.SaveTipoRelatorioSuccess>(TipoRelatorioEditActions.SAVE_TIPO_RELATORIO_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/tipos-relatorios/listar']).then();
                })
            );


}
