import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import {TipoValidacaoWorkflowListReducer,TipoValidacaoWorkflowListState} from './tipo-validacao-workflow-list.reducer';

export interface TipoValidacaoWorkflowListAppState
{
    tipoValidacaoWorkflowList: TipoValidacaoWorkflowListState;
}

export const getTipoValidacaoWorkflowListAppState = createFeatureSelector<TipoValidacaoWorkflowListAppState>(
    'tipo-validacao-workflow-edit-list'
);

export const getAppState = createSelector(
    getTipoValidacaoWorkflowListAppState,
    (state: TipoValidacaoWorkflowListAppState) => state
);

export const reducers: ActionReducerMap<TipoValidacaoWorkflowListAppState> = {
    tipoValidacaoWorkflowList: TipoValidacaoWorkflowListReducer
};

export * from './tipo-validacao-workflow-list.reducer';
