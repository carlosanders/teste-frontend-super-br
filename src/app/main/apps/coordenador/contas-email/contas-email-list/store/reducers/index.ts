import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ContaEmailListReducer, ContaEmailListState} from './contas-email-list.reducer';

export interface ContaEmailListAppState {
    contaEmailList: ContaEmailListState;
}

export const getContaEmailListAppState = createFeatureSelector<ContaEmailListAppState>(
    'contas-email-list'
);

export const getAppState: any = createSelector(
    getContaEmailListAppState,
    (state: ContaEmailListAppState) => state
);

export const reducers: ActionReducerMap<ContaEmailListAppState> = {
    contaEmailList: ContaEmailListReducer
};

export * from './contas-email-list.reducer';
