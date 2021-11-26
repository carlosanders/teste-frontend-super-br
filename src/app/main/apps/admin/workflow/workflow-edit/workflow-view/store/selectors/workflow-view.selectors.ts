import {createSelector} from '@ngrx/store';
import {getWorkflowViewAppState, WorkflowViewAppState, WorkflowViewState} from '../reducers';

export const getWorkflowViewState: any = createSelector(
    getWorkflowViewAppState,
    (state: WorkflowViewAppState) => state.workflowView
);

export const getBinary: any = createSelector(
    getWorkflowViewState,
    (state: WorkflowViewState) => state.binary
);

export const getHasLoaded: any = createSelector(
    getWorkflowViewState,
    (state: WorkflowViewState) => state.loaded
);
