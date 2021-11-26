import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CompartilhamentoListReducer, CompartilhamentoListState} from './compartilhamento-list.reducer';

export interface CompartilhamentoListAppState
{
    compartilhamentoList: CompartilhamentoListState;
}

export const getCompartilhamentoListAppState = createFeatureSelector<CompartilhamentoListAppState>(
    'compartilhamento-list-app'
);

export const getAppState: any = createSelector(
    getCompartilhamentoListAppState,
    (state: CompartilhamentoListAppState) => state
);

export const reducers: ActionReducerMap<CompartilhamentoListAppState> = {
    compartilhamentoList: CompartilhamentoListReducer
};

export * from './compartilhamento-list.reducer';
