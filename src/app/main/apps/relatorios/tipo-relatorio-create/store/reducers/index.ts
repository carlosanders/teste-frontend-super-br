import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TipoRelatorioCreateReducer, TipoRelatorioCreateState } from './tipo-relatorio-create.reducer';

export interface TipoRelatorioCreateAppState
{
    tipoRelatorio: TipoRelatorioCreateState;
}

export const getTipoRelatorioCreateAppState = createFeatureSelector<TipoRelatorioCreateAppState>(
    'tipo-relatorio-create-app'
);

export const getAppState = createSelector(
    getTipoRelatorioCreateAppState,
    (state: TipoRelatorioCreateAppState) => state
);

export const reducers: ActionReducerMap<TipoRelatorioCreateAppState> = {
    tipoRelatorio: TipoRelatorioCreateReducer
};

export * from './tipo-relatorio-create.reducer';
