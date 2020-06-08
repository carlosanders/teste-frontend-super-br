import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as TipoRelatorioCreateActions from '../actions/tipo-relatorio-create.actions';

import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tipoRelatorio as tipoRelatorioSchema} from '@cdk/normalizr/tipo-relatorio.schema';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as fromStoreRelatorio from '../../../store';

@Injectable()
export class TipoRelatorioCreateEffects {
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
                ofType<TipoRelatorioCreateActions.GetTipoRelatorio>(TipoRelatorioCreateActions.GET_TIPO_RELATORIO),
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
                    new TipoRelatorioCreateActions.GetTipoRelatorioSuccess({
                        loaded: {
                            id: 'tipoRelatorioHandle',
                            value: this.routerState.params.tipoRelatorioHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoRelatorioCreateActions.GetTipoRelatorioFailed(err));
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
                ofType<TipoRelatorioCreateActions.SaveTipoRelatorio>(TipoRelatorioCreateActions.SAVE_TIPO_RELATORIO),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._tipoRelatorioService.save(action.payload, context).pipe(
                        mergeMap((response: TipoRelatorio) => [
                            new fromStoreRelatorio.UnloadTipoRelatorios({reset: true}),
                            new fromStoreRelatorio.GetTipoRelatorios({
                                limit: 10,
                                offset: 0,
                                sort: {criadoEm: 'DESC'},
                                populate: ['populateAll']
                            }),
                            new AddData<TipoRelatorio>({data: [response], schema: tipoRelatorioSchema}),
                            new TipoRelatorioCreateActions.SaveTipoRelatorioSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoRelatorioCreateActions.SaveTipoRelatorioFailed(err));
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
                ofType<TipoRelatorioCreateActions.SaveTipoRelatorioSuccess>(TipoRelatorioCreateActions.SAVE_TIPO_RELATORIO_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/relatorios/' + this.routerState.params.generoHandle + '/'
                    + '/tipo-relatorio/entrada']).then();
                })
            );


}
