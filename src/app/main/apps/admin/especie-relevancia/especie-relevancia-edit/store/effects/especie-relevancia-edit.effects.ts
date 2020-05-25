import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as EspecieRelevanciaEditActions from '../actions/especie-relevancia-edit.actions';
import * as EspecieRelevanciaListActions
    from '../../../especie-relevancia-list/store/actions/especie-relevancia-list.actions';

import {EspecieRelevanciaService} from '@cdk/services/especie-relevancia.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {especieRelevancia as especieRelevanciaSchema} from '@cdk/normalizr/especie-relevancia.schema';
import {EspecieRelevancia} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class EspecieRelevanciaEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _especieRelevanciaService: EspecieRelevanciaService,
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
     * Get EspecieRelevancia with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getEspecieRelevancia: any =
        this._actions
            .pipe(
                ofType<EspecieRelevanciaEditActions.GetEspecieRelevancia>(EspecieRelevanciaEditActions.GET_ESPECIE_RELEVANCIA),
                switchMap((action) => {
                    return this._especieRelevanciaService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<EspecieRelevancia>({data: response['entities'], schema: especieRelevanciaSchema}),
                    new EspecieRelevanciaEditActions.GetEspecieRelevanciaSuccess({
                        loaded: {
                            id: 'especieRelevanciaHandle',
                            value: this.routerState.params.especieRelevanciaHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EspecieRelevanciaEditActions.GetEspecieRelevanciaFailed(err));
                    return caught;
                })
            );

    /**
     * Save EspecieRelevancia
     * @type {Observable<any>}
     */
    @Effect()
    saveEspecieRelevancia: any =
        this._actions
            .pipe(
                ofType<EspecieRelevanciaEditActions.SaveEspecieRelevancia>(EspecieRelevanciaEditActions.SAVE_ESPECIE_RELEVANCIA),
                switchMap((action) => {
                    return this._especieRelevanciaService.save(action.payload).pipe(
                        mergeMap((response: any) => [
                            new EspecieRelevanciaListActions.ReloadEspecieRelevancia(),
                            new AddData<EspecieRelevancia>({data: [response], schema: especieRelevanciaSchema}),
                            new EspecieRelevanciaEditActions.SaveEspecieRelevanciaSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EspecieRelevanciaEditActions.SaveEspecieRelevanciaFailed(err));
                    return caught;
                })
            );

    /**
     * Update EspecieRelevancia
     * @type {Observable<any>}
     */
    @Effect()
    updateEspecieRelevancia: any =
        this._actions
            .pipe(
                ofType<EspecieRelevanciaEditActions.UpdateEspecieRelevancia>(EspecieRelevanciaEditActions.UPDATE_ESPECIE_RELEVANCIA),
                switchMap((action) => {
                    return this._especieRelevanciaService.patch(action.payload.especieRelevancia, action.payload.changes).pipe(
                        mergeMap((response: EspecieRelevancia) => [
                            new EspecieRelevanciaListActions.ReloadEspecieRelevancia(),
                            new AddData<EspecieRelevancia>({data: [response], schema: especieRelevanciaSchema}),
                            new EspecieRelevanciaEditActions.UpdateEspecieRelevanciaSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EspecieRelevanciaEditActions.UpdateEspecieRelevanciaFailed(err));
                    return caught;
                })
            );

    /**
     * Save EspecieRelevancia Success
     */
    @Effect({dispatch: false})
    saveEspecieRelevanciaSuccess: any =
        this._actions
            .pipe(
                ofType<EspecieRelevanciaEditActions.SaveEspecieRelevanciaSuccess>(EspecieRelevanciaEditActions.SAVE_ESPECIE_RELEVANCIA_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/especie-relevancias/listar']).then();
                })
            );

}
