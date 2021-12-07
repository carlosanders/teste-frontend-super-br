import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AtividadeListReducer, AtividadeListState} from './atividade-list.reducer';

export interface AtividadeListAppState
{
    atividadeList: AtividadeListState;
}

export const getAtividadeListAppState = createFeatureSelector<AtividadeListAppState>(
    'atividade-list-app'
);

export const getAppState: any = createSelector(
    getAtividadeListAppState,
    (state: AtividadeListAppState) => state
);

export const reducers: ActionReducerMap<AtividadeListAppState> = {
    atividadeList: AtividadeListReducer
};

export * from './atividade-list.reducer';
