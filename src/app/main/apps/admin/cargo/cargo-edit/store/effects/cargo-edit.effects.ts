import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as CargoEditActions from '../actions/cargo-edit.actions';
import * as CargoListActions from '../../../cargo-list/store/actions/cargo-list.actions';

import {CargoService} from '@cdk/services/cargo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {cargo as cargoSchema} from '@cdk/normalizr';
import {Cargo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class CargoEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _cargoService: CargoService,
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
     * Get Cargo with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getCargo: any =
        this._actions
            .pipe(
                ofType<CargoEditActions.GetCargo>(CargoEditActions.GET_CARGO),
                switchMap(action => this._cargoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}))),
                switchMap(response => [
                    new AddData<Cargo>({data: response['entities'], schema: cargoSchema}),
                    new CargoEditActions.GetCargoSuccess({
                        loaded: {
                            id: 'cargoHandle',
                            value: this.routerState.params.cargoHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new CargoEditActions.GetCargoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Cargo
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveCargo: any =
        this._actions
            .pipe(
                ofType<CargoEditActions.SaveCargo>(CargoEditActions.SAVE_CARGO),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'cargo',
                    content: 'Salvando o cargo ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._cargoService.save(action.payload.cargo, context).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'cargo',
                                content: 'Cargo id ' + response.id + ' salvo com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: Cargo) => [
                            new CargoEditActions.SaveCargoSuccess(response),
                            new CargoListActions.ReloadCargo(),
                            new AddData<Cargo>({data: [response], schema: cargoSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'cargo',
                                content: 'Erro ao salvar o cargo!',
                                status: 2, // erro
                            }));
                            return of(new CargoEditActions.SaveCargoFailed(err));
                        })
                    )
                })
            );

    /**
     * Update Cargo
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateCargo: any =
        this._actions
            .pipe(
                ofType<CargoEditActions.UpdateCargo>(CargoEditActions.UPDATE_CARGO),
                switchMap(action => this._cargoService.patch(action.payload.cargo, action.payload.changes).pipe(
                        mergeMap((response: Cargo) => [
                            new CargoListActions.ReloadCargo(),
                            new AddData<Cargo>({data: [response], schema: cargoSchema}),
                            new CargoEditActions.UpdateCargoSuccess(response)
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new CargoEditActions.UpdateCargoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Cargo Success
     */
    @Effect({dispatch: false})
    saveCargoSuccess: any =
        this._actions
            .pipe(
                ofType<CargoEditActions.SaveCargoSuccess>(CargoEditActions.SAVE_CARGO_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/cargos/listar']).then();
                })
            );

}
