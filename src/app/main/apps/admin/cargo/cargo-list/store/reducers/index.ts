import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CargoListReducer, CargoListState} from './cargo-list.reducer';

export interface CargoListAppState {
    cargoList: CargoListState;
}

export const getCargoListAppState = createFeatureSelector<CargoListAppState>(
    'cargo-list'
);

export const getAppState: any = createSelector(
    getCargoListAppState,
    (state: CargoListAppState) => state
);

export const reducers: ActionReducerMap<CargoListAppState> = {
    cargoList: CargoListReducer
};

export * from './cargo-list.reducer';
