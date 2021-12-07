import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TipoValidacaoWorkflowEditReducer, TipoValidacaoWorkflowEditState} from './tipo-validacao-workflow-edit.reducer';

export interface TipoValidacaoWorkflowEditAppState {
    tipoValidacaoWorkflow: TipoValidacaoWorkflowEditState;
}

export const getTipoValidacaoWorkflowEditAppState = createFeatureSelector<TipoValidacaoWorkflowEditAppState>(
    'tipo-validacao-workflow-edit-app'
);

export const getAppState: any = createSelector(
    getTipoValidacaoWorkflowEditAppState,
    (state: TipoValidacaoWorkflowEditAppState) => state
);

export const reducers: ActionReducerMap<TipoValidacaoWorkflowEditAppState> = {
    tipoValidacaoWorkflow: TipoValidacaoWorkflowEditReducer
};

export * from './tipo-validacao-workflow-edit.reducer';
