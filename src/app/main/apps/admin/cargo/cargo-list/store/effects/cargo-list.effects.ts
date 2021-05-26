import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {getRouterState, State} from '../../../../../../../store/reducers';
import * as CargoListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {CargoService} from '@cdk/services/cargo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Cargo} from '@cdk/models';
import {cargo as cargoSchema} from '@cdk/normalizr';


@Injectable()
export class CargoListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _cargoService: CargoService,
        private _loginService: LoginService,
        private _store: Store<State>
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
                ofType<CargoListActions.GetCargo>(CargoListActions.GET_CARGO),
                switchMap(action => this._cargoService.query(
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
                            new AddData<Cargo>({data: response['entities'], schema: cargoSchema}),
                            new CargoListActions.GetCargoSuccess({
                                entitiesId: response['entities'].map(cargo => cargo.id),
                                loaded: {
                                    id: 'cargoHandle',
                                    value: this.routerState.params.cargoHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new CargoListActions.GetCargoFailed(err));
                        })
                    ))
            );
}
