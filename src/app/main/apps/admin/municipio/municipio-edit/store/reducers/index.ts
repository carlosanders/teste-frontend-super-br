import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {MunicipioEditReducer, MunicipioEditState} from './municipio-edit.reducer';

export interface MunicipioEditAppState {
    municipio: MunicipioEditState;
}

export const getMunicipioEditAppState = createFeatureSelector<MunicipioEditAppState>(
    'municipio-edit-app'
);

export const getAppState: any = createSelector(
    getMunicipioEditAppState,
    (state: MunicipioEditAppState) => state
);

export const reducers: ActionReducerMap<MunicipioEditAppState> = {
    municipio: MunicipioEditReducer
};

export * from './municipio-edit.reducer';
