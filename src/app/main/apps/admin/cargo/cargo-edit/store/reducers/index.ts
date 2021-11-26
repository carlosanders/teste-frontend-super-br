import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CargoEditReducer, CargoEditState} from './cargo-edit.reducer';

export interface CargoEditAppState {
    cargo: CargoEditState;
}

export const getCargoEditAppState = createFeatureSelector<CargoEditAppState>(
    'cargo-edit-app'
);

export const getAppState: any = createSelector(
    getCargoEditAppState,
    (state: CargoEditAppState) => state
);

export const reducers: ActionReducerMap<CargoEditAppState> = {
    cargo: CargoEditReducer
};

export * from './cargo-edit.reducer';
