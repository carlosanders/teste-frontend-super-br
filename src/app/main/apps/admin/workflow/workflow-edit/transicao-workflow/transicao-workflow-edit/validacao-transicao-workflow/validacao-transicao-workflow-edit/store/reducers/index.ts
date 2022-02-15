import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    ValidacaoTransicaoWorkflowEditReducer,
    ValidacaoTransicaoWorkflowEditState
} from './validacao-transicao-workflow-edit.reducer';
import {TipoValidacaoWorkflowReducer, TipoValidacaoWorkflowState} from './tipo-validacao-transicao-workflow.reducer';

export interface ValidacaoTransicaoWorkflowEditAppState {
    validacaoTransicaoWorkflow: ValidacaoTransicaoWorkflowEditState;
    tipoValidacaoWorkflowList: TipoValidacaoWorkflowState;

}

export const getValidacaoEditAppState = createFeatureSelector<ValidacaoTransicaoWorkflowEditAppState>(
    'admin-validacao-transicao-workflow-edit-app'
);

export const getAppState: any = createSelector(
    getValidacaoEditAppState,
    (state: ValidacaoTransicaoWorkflowEditAppState) => state
);

export const reducers: ActionReducerMap<ValidacaoTransicaoWorkflowEditAppState> = {
    validacaoTransicaoWorkflow: ValidacaoTransicaoWorkflowEditReducer,
    tipoValidacaoWorkflowList: TipoValidacaoWorkflowReducer

};

export * from './validacao-transicao-workflow-edit.reducer';
export * from './tipo-validacao-transicao-workflow.reducer';

