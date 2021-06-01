import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {WorkflowListReducer, WorkflowListState} from './workflow-list.reducer';

export interface WorkflowListAppState {
    workflowList: WorkflowListState;
}

export const getWorkflowListAppState = createFeatureSelector<WorkflowListAppState>(
    'workflow-edit-list'
);

export const getAppState = createSelector(
    getWorkflowListAppState,
    (state: WorkflowListAppState) => state
);

export const reducers: ActionReducerMap<WorkflowListAppState> = {
    workflowList: WorkflowListReducer
};

export * from './workflow-list.reducer';
