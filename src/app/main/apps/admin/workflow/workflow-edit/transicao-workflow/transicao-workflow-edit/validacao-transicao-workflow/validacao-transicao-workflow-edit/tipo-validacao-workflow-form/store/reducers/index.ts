import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TipoValidacaoWorkflowReducer, TipoValidacaoWorkflowState} from './tipo-validacao-workflow.reducer';

export interface TipoValidacaoWorkflowAppState {
    tipoValidacaoWorkflow: TipoValidacaoWorkflowState;
}

export const getValidacaoFormAppState = createFeatureSelector<TipoValidacaoWorkflowAppState>(
    'tipo-validacao-workflow-edit-app'
);

export const getAppState: any = createSelector(
    getValidacaoFormAppState,
    (state: TipoValidacaoWorkflowAppState) => state
);

export const reducers: ActionReducerMap<TipoValidacaoWorkflowAppState> = {
    tipoValidacaoWorkflow: TipoValidacaoWorkflowReducer
};

export * from './tipo-validacao-workflow.reducer';
