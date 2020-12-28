import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import {AcaoTransicaoWorkflowEditReducer, AcaoTransicaoWorkflowEditState} from "./acao-transicao-workflow-edit.reducer";

export interface AcaoTransicaoWorkflowEditAppState
{
    acaoTransicaoWorkflow: AcaoTransicaoWorkflowEditState;
}

export const getAcaoEditAppState = createFeatureSelector<AcaoTransicaoWorkflowEditAppState>(
    'admin-acao-transicao-workflow-edit-app'
);

export const getAppState = createSelector(
    getAcaoEditAppState,
    (state: AcaoTransicaoWorkflowEditAppState) => state
);

export const reducers: ActionReducerMap<AcaoTransicaoWorkflowEditAppState> = {
    acaoTransicaoWorkflow: AcaoTransicaoWorkflowEditReducer
};

export * from './acao-transicao-workflow-edit.reducer';
