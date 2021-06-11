import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as EspecieSetorEditActions from '../actions/especie-setor-edit.actions';
import * as EspecieSetorListActions from '../../../especie-setor-list/store/actions/especie-setor-list.actions';
import {EspecieSetorService} from '@cdk/services/especie-setor.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {especieSetor as especieSetorSchema} from '@cdk/normalizr';
import {EspecieSetor} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class EspecieSetorEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _especieSetorService: EspecieSetorService,
        private _colaboradorService: ColaboradorService,
        private _store: Store<State>,
        private _loginService: LoginService,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get EspecieSetor with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getEspecieSetor: any =
        this._actions
            .pipe(
                ofType<EspecieSetorEditActions.GetEspecieSetor>(EspecieSetorEditActions.GET_ESPECIE_SETOR),
                switchMap(action => this._especieSetorService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}))),
                switchMap(response => [
                    new AddData<EspecieSetor>({data: response['entities'], schema: especieSetorSchema}),
                    new EspecieSetorEditActions.GetEspecieSetorSuccess({
                        loaded: {
                            id: 'especieSetorHandle',
                            value: this.routerState.params.especieSetorHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EspecieSetorEditActions.GetEspecieSetorFailed(err));
                    return caught;
                })
            );

    /**
     * Save EspecieSetor
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveEspecieSetor: any =
        this._actions
            .pipe(
                ofType<EspecieSetorEditActions.SaveEspecieSetor>(EspecieSetorEditActions.SAVE_ESPECIE_SETOR),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._especieSetorService.save(action.payload, context).pipe(
                        mergeMap((response: EspecieSetor) => [
                            new EspecieSetorListActions.ReloadEspecieSetor(),
                            new AddData<EspecieSetor>({data: [response], schema: especieSetorSchema}),
                            new EspecieSetorEditActions.SaveEspecieSetorSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EspecieSetorEditActions.SaveEspecieSetorFailed(err));
                    return caught;
                })
            );

    /**
     * Update EspecieSetor
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateEspecieSetor: any =
        this._actions
            .pipe(
                ofType<EspecieSetorEditActions.UpdateEspecieSetor>(EspecieSetorEditActions.UPDATE_ESPECIE_SETOR),
                switchMap(action => this._especieSetorService.patch(action.payload.especieSetor, action.payload.changes).pipe(
                        mergeMap((response: EspecieSetor) => [
                            new EspecieSetorListActions.ReloadEspecieSetor(),
                            new AddData<EspecieSetor>({data: [response], schema: especieSetorSchema}),
                            new EspecieSetorEditActions.UpdateEspecieSetorSuccess(response)
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EspecieSetorEditActions.UpdateEspecieSetorFailed(err));
                    return caught;
                })
            );

    /**
     * Save EspecieSetor Success
     */
    @Effect({dispatch: false})
    saveEspecieSetorSuccess: any =
        this._actions
            .pipe(
                ofType<EspecieSetorEditActions.SaveEspecieSetorSuccess>(EspecieSetorEditActions.SAVE_ESPECIE_SETOR_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/especie-setor/listar']).then();
                })
            );


}
