import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {WorkflowViewReducer, WorkflowViewState} from './workflow-view.reducer';

export interface WorkflowViewAppState {
    workflowView: WorkflowViewState;
}

export const getWorkflowViewAppState = createFeatureSelector<WorkflowViewAppState>(
    'workflow-view-app'
);

export const getAppState: any = createSelector(
    getWorkflowViewAppState,
    (state: WorkflowViewAppState) => state
);

export const reducers: ActionReducerMap<WorkflowViewAppState> = {
    workflowView: WorkflowViewReducer
};

export * from './workflow-view.reducer';
