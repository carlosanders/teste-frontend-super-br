import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AcaoEditReducer, AcaoEditState } from './acao-edit.reducer';

export interface AcaoEditAppState
{
    acao: AcaoEditState;
}

export const getAcaoEditAppState = createFeatureSelector<AcaoEditAppState>(
    'acao-edit-app'
);

export const getAppState = createSelector(
    getAcaoEditAppState,
    (state: AcaoEditAppState) => state
);

export const reducers: ActionReducerMap<AcaoEditAppState> = {
    acao: AcaoEditReducer
};

export * from './acao-edit.reducer';
