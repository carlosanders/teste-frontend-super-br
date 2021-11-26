import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AvisoEditReducer, AvisoEditState} from './aviso-edit.reducer';

export interface AvisoEditAppState {
    aviso: AvisoEditState;
}

export const getAvisoEditAppState = createFeatureSelector<AvisoEditAppState>(
    'aviso-edit-app'
);

export const getAppState: any = createSelector(
    getAvisoEditAppState,
    (state: AvisoEditAppState) => state
);

export const reducers: ActionReducerMap<AvisoEditAppState> = {
    aviso: AvisoEditReducer
};

export * from './aviso-edit.reducer';
