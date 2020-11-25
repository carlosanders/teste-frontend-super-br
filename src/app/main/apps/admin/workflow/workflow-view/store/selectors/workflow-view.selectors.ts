import {createSelector} from '@ngrx/store';
import {getWorkflowViewAppState, WorkflowViewAppState, WorkflowViewState} from '../reducers';

export const getWorkflowViewState = createSelector(
    getWorkflowViewAppState,
    (state: WorkflowViewAppState) => state.workflowView
);

export const getBinary = createSelector(
    getWorkflowViewState,
    (state: WorkflowViewState) => state.binary
);

export const getHasLoaded = createSelector(
    getWorkflowViewState,
    (state: WorkflowViewState) => state.loaded
);
