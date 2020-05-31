import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RelatoriosReducer, RelatoriosState } from './relatorios.reducer';
import { FoldersReducer, FoldersState } from './folders.reducer';
import { TipoRelatoriosReducer, TipoRelatoriosState } from './tipo-relatorio.reducer';

export interface RelatoriosAppState
{
    relatorios: RelatoriosState;
    folders: FoldersState;
    tipoRelatorios: TipoRelatoriosState;
}

export const getRelatoriosAppState = createFeatureSelector<RelatoriosAppState>(
    'relatorios-app'
);

export const getAppState = createSelector(
    getRelatoriosAppState,
    (state: RelatoriosAppState) => state
);

export const reducers: ActionReducerMap<RelatoriosAppState> = {
    relatorios: RelatoriosReducer,
    folders: FoldersReducer,
    tipoRelatorios: TipoRelatoriosReducer
};

export * from './relatorios.reducer';
export * from './folders.reducer';
export * from './tipo-relatorio.reducer';
