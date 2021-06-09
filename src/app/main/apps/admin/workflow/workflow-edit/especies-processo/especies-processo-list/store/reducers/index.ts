import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import {WorkflowEspeciesProcessoListReducer, WorkflowEspecieProcessoListState} from './especies-processo-list.reducer';

export interface WorkflowEspecieProcessoListAppState
{
    especieProcessoList: WorkflowEspecieProcessoListState;
}

export const getEspecieProcessoListAppState = createFeatureSelector<WorkflowEspecieProcessoListAppState>(
    'workflow-especie-processo-list-app'
);

export const getAppState = createSelector(
    getEspecieProcessoListAppState,
    (state: WorkflowEspecieProcessoListAppState) => state
);

export const reducers: ActionReducerMap<WorkflowEspecieProcessoListAppState> = {
    especieProcessoList: WorkflowEspeciesProcessoListReducer
};

export * from './especies-processo-list.reducer';
