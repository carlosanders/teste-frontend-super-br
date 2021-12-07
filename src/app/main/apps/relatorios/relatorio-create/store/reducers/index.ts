import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RelatorioCreateReducer, RelatorioCreateState} from './relatorio-create.reducer';
import {GeneroRelatorioReducer, GeneroRelatorioState} from './genero-relatorio.reducer';

export interface RelatorioCreateAppState
{
    relatorio: RelatorioCreateState;
    generoRelatorios: GeneroRelatorioState;
}

export const getRelatorioCreateAppState = createFeatureSelector<RelatorioCreateAppState>(
    'relatorio-create-app'
);

export const getAppState: any = createSelector(
    getRelatorioCreateAppState,
    (state: RelatorioCreateAppState) => state
);

export const reducers: ActionReducerMap<RelatorioCreateAppState> = {
    relatorio: RelatorioCreateReducer,
    generoRelatorios: GeneroRelatorioReducer
};

export * from './relatorio-create.reducer';
export * from './genero-relatorio.reducer';
