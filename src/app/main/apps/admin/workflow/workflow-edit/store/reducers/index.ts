import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {WorkflowEditReducer, WorkflowEditState} from './workflow-edit.reducer';

export interface WorkflowEditAppState {
    workflow: WorkflowEditState;
}

export const getWorkflowEditAppState = createFeatureSelector<WorkflowEditAppState>(
    'workflow-edit-app'
);

export const getAppState: any = createSelector(
    getWorkflowEditAppState,
    (state: WorkflowEditAppState) => state
);

export const reducers: ActionReducerMap<WorkflowEditAppState> = {
    workflow: WorkflowEditReducer
};

export * from './workflow-edit.reducer';
