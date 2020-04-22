import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as TipoDocumentoEditActions from '../actions/tipo-documento-list.actions';
import * as TipoDocumentoListActions
    from '../../../tipo-documento-list/store/actions/tipo-documento-list.actions';

import {TipoDocumentoService} from '@cdk/services/tipo-documento.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {especieAtividade as especieAtividadeSchema} from '@cdk/normalizr/tipo-documento.schema';
import {TipoDocumento} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class TipoDocumentoListEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _especieAtividadeService: TipoDocumentoService,
        private _colaboradorService: ColaboradorService,
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
     * Get TipoDocumento with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTipoDocumento: any =
        this._actions
            .pipe(
                ofType<TipoDocumentoEditActions.GetTipoDocumento>(TipoDocumentoEditActions.GET_ESPECIE_ATIVIDADE),
                switchMap((action) => {
                    return this._especieAtividadeService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<TipoDocumento>({data: response['entities'], schema: especieAtividadeSchema}),
                    new TipoDocumentoEditActions.GetTipoDocumentoSuccess({
                        loaded: {
                            id: 'especieAtividadeHandle',
                            value: this.routerState.params.especieAtividadeHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoDocumentoEditActions.GetTipoDocumentoFailed(err));
                    return caught;
                })
            );

    /**
     * Save TipoDocumento
     * @type {Observable<any>}
     */
    @Effect()
    saveTipoDocumento: any =
        this._actions
            .pipe(
                ofType<TipoDocumentoEditActions.SaveTipoDocumento>(TipoDocumentoEditActions.SAVE_ESPECIE_ATIVIDADE),
                switchMap((action) => {
                    return this._especieAtividadeService.save(action.payload).pipe(
                        mergeMap((response: TipoDocumento) => [
                            new TipoDocumentoListActions.ReloadTipoDocumento(),
                            new AddData<TipoDocumento>({data: [response], schema: especieAtividadeSchema}),
                            new TipoDocumentoEditActions.SaveTipoDocumentoSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoDocumentoEditActions.SaveTipoDocumentoFailed(err));
                    return caught;
                })
            );

    /**
     * Update TipoDocumento
     * @type {Observable<any>}
     */
    @Effect()
    updateTipoDocumento: any =
        this._actions
            .pipe(
                ofType<TipoDocumentoEditActions.UpdateTipoDocumento>(TipoDocumentoEditActions.UPDATE_ESPECIE_ATIVIDADE),
                switchMap((action) => {
                    return this._especieAtividadeService.patch(action.payload.especieAtividade, action.payload.changes).pipe(
                        mergeMap((response: TipoDocumento) => [
                            new TipoDocumentoListActions.ReloadTipoDocumento(),
                            new AddData<TipoDocumento>({data: [response], schema: especieAtividadeSchema}),
                            new TipoDocumentoEditActions.UpdateTipoDocumentoSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoDocumentoEditActions.UpdateTipoDocumentoFailed(err));
                    return caught;
                })
            );

    /**
     * Save TipoDocumento Success
     */
    @Effect({dispatch: false})
    saveTipoDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<TipoDocumentoEditActions.SaveTipoDocumentoSuccess>(TipoDocumentoEditActions.SAVE_ESPECIE_ATIVIDADE_SUCCESS),
                tap((action) => {
                    this._router.navigate([this.routerState.url.replace(('criar'), action.payload.id)]).then();
                })
            );

}
