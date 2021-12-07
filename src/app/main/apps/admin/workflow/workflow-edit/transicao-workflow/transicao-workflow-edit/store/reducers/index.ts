import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TransicaoWorkflowEditReducer, TransicaoWorkflowEditState} from './transicao-workflow-edit.reducer';

export interface TransicaoWorkflowEditAppState {
    transicaoWorkflow: TransicaoWorkflowEditState;
}

export const getTransicaoWorkflowEditAppState = createFeatureSelector<TransicaoWorkflowEditAppState>(
    'transicao-workflow-edit-app'
);

export const getAppState: any = createSelector(
    getTransicaoWorkflowEditAppState,
    (state: TransicaoWorkflowEditAppState) => state
);

export const reducers: ActionReducerMap<TransicaoWorkflowEditAppState> = {
    transicaoWorkflow: TransicaoWorkflowEditReducer
};

export * from './transicao-workflow-edit.reducer';
