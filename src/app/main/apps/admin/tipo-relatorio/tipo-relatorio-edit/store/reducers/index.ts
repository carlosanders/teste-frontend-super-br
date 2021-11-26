import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TipoRelatorioEditReducer, TipoRelatorioEditState} from './tipo-relatorio-edit.reducer';

export interface TipoRelatorioEditAppState {
    tipoRelatorio: TipoRelatorioEditState;
}

export const getTipoRelatorioEditAppState = createFeatureSelector<TipoRelatorioEditAppState>(
    'tipo-relatorio-edit-app'
);

export const getAppState: any = createSelector(
    getTipoRelatorioEditAppState,
    (state: TipoRelatorioEditAppState) => state
);

export const reducers: ActionReducerMap<TipoRelatorioEditAppState> = {
    tipoRelatorio: TipoRelatorioEditReducer
};

export * from './tipo-relatorio-edit.reducer';
