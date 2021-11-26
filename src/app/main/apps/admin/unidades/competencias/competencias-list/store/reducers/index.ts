import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CompetenciasListReducer, CompetenciasListState} from './competencias-list.reducer';

export interface CompetenciasListAppState {
    competenciasList: CompetenciasListState;
}

export const getCompetenciasListAppState = createFeatureSelector<CompetenciasListAppState>(
    'competencias-list-app'
);

export const getAppState: any = createSelector(
    getCompetenciasListAppState,
    (state: CompetenciasListAppState) => state
);

export const reducers: ActionReducerMap<CompetenciasListAppState> = {
    competenciasList: CompetenciasListReducer
};

export * from './competencias-list.reducer';
