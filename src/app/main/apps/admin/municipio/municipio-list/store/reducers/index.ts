import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {MunicipioListReducer, MunicipioListState} from './municipio-list.reducer';

export interface MunicipioListAppState {
    municipioList: MunicipioListState;
}

export const getMunicipioListAppState = createFeatureSelector<MunicipioListAppState>(
    'municipio-list'
);

export const getAppState: any = createSelector(
    getMunicipioListAppState,
    (state: MunicipioListAppState) => state
);

export const reducers: ActionReducerMap<MunicipioListAppState> = {
    municipioList: MunicipioListReducer
};

export * from './municipio-list.reducer';
