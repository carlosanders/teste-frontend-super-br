import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AtividadeCreateReducer, AtividadeCreateState } from './atividade-create.reducer';

export interface AtividadeCreateAppState
{
    atividadeCreate: AtividadeCreateState;
}

export const getAtividadeCreateAppState = createFeatureSelector<AtividadeCreateAppState>(
    'atividade-create-bloco-app'
);

export const getAppState = createSelector(
    getAtividadeCreateAppState,
    (state: AtividadeCreateAppState) => state
);

export const reducers: ActionReducerMap<AtividadeCreateAppState> = {
    atividadeCreate: AtividadeCreateReducer
};

export * from './atividade-create.reducer';
