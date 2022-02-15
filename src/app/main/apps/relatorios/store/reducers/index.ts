import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RelatoriosReducer, RelatoriosState} from './relatorios.reducer';
import {FoldersReducer, FoldersState} from './folders.reducer';

export interface RelatoriosAppState
{
    relatorios: RelatoriosState;
    folders: FoldersState;
}

export const getRelatoriosAppState = createFeatureSelector<RelatoriosAppState>(
    'relatorios-app'
);

export const getAppState: any = createSelector(
    getRelatoriosAppState,
    (state: RelatoriosAppState) => state
);

export const reducers: ActionReducerMap<RelatoriosAppState> = {
    relatorios: RelatoriosReducer,
    folders: FoldersReducer
};

export * from './relatorios.reducer';
export * from './folders.reducer';
