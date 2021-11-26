import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TipoRelatorioListReducer, TipoRelatorioListState} from './tipo-relatorio-list.reducer';

export interface TipoRelatorioListAppState {
    tipoRelatorioList: TipoRelatorioListState;
}

export const getTipoRelatorioListAppState = createFeatureSelector<TipoRelatorioListAppState>(
    'tipo-relatorio-list'
);

export const getAppState: any = createSelector(
    getTipoRelatorioListAppState,
    (state: TipoRelatorioListAppState) => state
);

export const reducers: ActionReducerMap<TipoRelatorioListAppState> = {
    tipoRelatorioList: TipoRelatorioListReducer
};

export * from './tipo-relatorio-list.reducer';
