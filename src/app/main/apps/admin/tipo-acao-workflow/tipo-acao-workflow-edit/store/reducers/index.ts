import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TipoAcaoWorkflowEditReducer, TipoAcaoWorkflowEditState} from './tipo-acao-workflow-edit.reducer';

export interface TipoAcaoWorkflowEditAppState {
    tipoAcaoWorkflow: TipoAcaoWorkflowEditState;
}

export const getTipoAcaoWorkflowEditAppState = createFeatureSelector<TipoAcaoWorkflowEditAppState>(
    'tipo-acao-workflow-edit-app'
);

export const getAppState: any = createSelector(
    getTipoAcaoWorkflowEditAppState,
    (state: TipoAcaoWorkflowEditAppState) => state
);

export const reducers: ActionReducerMap<TipoAcaoWorkflowEditAppState> = {
    tipoAcaoWorkflow: TipoAcaoWorkflowEditReducer
};

export * from './tipo-acao-workflow-edit.reducer';
