import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TransicaoEditReducer, TransicaoEditState} from './transicao-edit.reducer';

export interface TransicaoEditAppState
{
    transicao: TransicaoEditState;
}

export const getTransicaoEditAppState = createFeatureSelector<TransicaoEditAppState>(
    'transicao-edit-app'
);

export const getAppState: any = createSelector(
    getTransicaoEditAppState,
    (state: TransicaoEditAppState) => state
);

export const reducers: ActionReducerMap<TransicaoEditAppState> = {
    transicao: TransicaoEditReducer
};

export * from './transicao-edit.reducer';
