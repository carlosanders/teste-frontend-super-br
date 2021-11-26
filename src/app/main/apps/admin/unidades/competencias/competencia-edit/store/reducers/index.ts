import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CompetenciaEditReducer, CompetenciaEditState} from './competencia-edit.reducer';

export interface CompetenciaEditAppState {
    competencia: CompetenciaEditState;
}

export const getCompetenciaEditAppState = createFeatureSelector<CompetenciaEditAppState>(
    'competencia-edit-app'
);

export const getAppState: any = createSelector(
    getCompetenciaEditAppState,
    (state: CompetenciaEditAppState) => state
);

export const reducers: ActionReducerMap<CompetenciaEditAppState> = {
    competencia: CompetenciaEditReducer
};

export * from './competencia-edit.reducer';
