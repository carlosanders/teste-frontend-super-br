import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AcaoTransicaoWorkflowEditReducer, AcaoTransicaoWorkflowEditState} from './acao-transicao-workflow-edit.reducer';
import {TipoAcaoWorkflowReducer, TipoAcaoWorkflowState} from './tipo-acao-transicao-workflow.reducer';

export interface AcaoTransicaoWorkflowEditAppState {
    acaoTransicaoWorkflow: AcaoTransicaoWorkflowEditState;
    tipoAcaoWorkflowList: TipoAcaoWorkflowState;
}

export const getAcaoEditAppState = createFeatureSelector<AcaoTransicaoWorkflowEditAppState>(
    'admin-acao-transicao-workflow-edit-app'
);

export const getAppState: any = createSelector(
    getAcaoEditAppState,
    (state: AcaoTransicaoWorkflowEditAppState) => state
);

export const reducers: ActionReducerMap<AcaoTransicaoWorkflowEditAppState> = {
    acaoTransicaoWorkflow: AcaoTransicaoWorkflowEditReducer,
    tipoAcaoWorkflowList: TipoAcaoWorkflowReducer
};

export * from './acao-transicao-workflow-edit.reducer';
export * from './tipo-acao-transicao-workflow.reducer';
