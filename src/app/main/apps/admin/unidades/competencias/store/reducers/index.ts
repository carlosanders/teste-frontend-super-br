import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CompetenciasReducer, CompetenciasState} from './competencias.reducer';

export interface CompetenciasAppState {
    competencias: CompetenciasState;
}

export const getCompetenciasAppState = createFeatureSelector<CompetenciasAppState>(
    'competencias-app'
);

export const getAppState: any = createSelector(
    getCompetenciasAppState,
    (state: CompetenciasAppState) => state
);

export const reducers: ActionReducerMap<CompetenciasAppState> = {
    competencias: CompetenciasReducer
};

export * from './competencias.reducer';
