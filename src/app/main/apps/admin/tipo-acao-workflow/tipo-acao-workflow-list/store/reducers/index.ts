import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import {TipoAcaoWorkflowListReducer,TipoAcaoWorkflowListState} from './tipo-acao-workflow-list.reducer';

export interface TipoAcaoWorkflowListAppState
{
    tipoAcaoWorkflowList: TipoAcaoWorkflowListState;
}

export const getTipoAcaoWorkflowListAppState = createFeatureSelector<TipoAcaoWorkflowListAppState>(
    'tipo-acao-workflow-edit-list'
);

export const getAppState = createSelector(
    getTipoAcaoWorkflowListAppState,
    (state: TipoAcaoWorkflowListAppState) => state
);

export const reducers: ActionReducerMap<TipoAcaoWorkflowListAppState> = {
    tipoAcaoWorkflowList: TipoAcaoWorkflowListReducer
};

export * from './tipo-acao-workflow-list.reducer';
