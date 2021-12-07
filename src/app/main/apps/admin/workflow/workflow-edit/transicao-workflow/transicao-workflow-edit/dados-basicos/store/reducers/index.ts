import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TransicaoWorkflowDadosBasicosReducer, TransicaoWorkflowDadosBasicosState} from './dados-basicos.reducer';

export interface TransicaoWorkflowDadosBasicosAppState {
    transicaoWorkflow: TransicaoWorkflowDadosBasicosState;
}

export const getTransicaoWorkflowDadosBasicosAppState = createFeatureSelector<TransicaoWorkflowDadosBasicosAppState>(
    'transicao-workflow-dados-basicos-app'
);

export const getAppState: any = createSelector(
    getTransicaoWorkflowDadosBasicosAppState,
    (state: TransicaoWorkflowDadosBasicosAppState) => state
);

export const reducers: ActionReducerMap<TransicaoWorkflowDadosBasicosAppState> = {
    transicaoWorkflow: TransicaoWorkflowDadosBasicosReducer
};

export * from './dados-basicos.reducer';
