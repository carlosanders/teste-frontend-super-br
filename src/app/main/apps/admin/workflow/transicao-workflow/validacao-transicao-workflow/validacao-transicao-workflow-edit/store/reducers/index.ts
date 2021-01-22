import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import {ValidacaoTransicaoWorkflowEditReducer, ValidacaoTransicaoWorkflowEditState} from "./validacao-transicao-workflow-edit.reducer";

export interface ValidacaoTransicaoWorkflowEditAppState
{
    validacaoTransicaoWorkflow: ValidacaoTransicaoWorkflowEditState;
}

export const getValidacaoEditAppState = createFeatureSelector<ValidacaoTransicaoWorkflowEditAppState>(
    'admin-validacao-transicao-workflow-edit-app'
);

export const getAppState = createSelector(
    getValidacaoEditAppState,
    (state: ValidacaoTransicaoWorkflowEditAppState) => state
);

export const reducers: ActionReducerMap<ValidacaoTransicaoWorkflowEditAppState> = {
    validacaoTransicaoWorkflow: ValidacaoTransicaoWorkflowEditReducer
};

export * from './validacao-transicao-workflow-edit.reducer';
