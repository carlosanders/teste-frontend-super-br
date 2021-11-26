import {createSelector} from '@ngrx/store';
import {
    getRelatorioCreateAppState,
    RelatorioCreateAppState,
    RelatorioCreateState
} from 'app/main/apps/relatorios/relatorio-create/store/reducers';

export const getRelatorioCreateState: any = createSelector(
    getRelatorioCreateAppState,
    (state: RelatorioCreateAppState) => state.relatorio
);

export const getIsSaving: any = createSelector(
    getRelatorioCreateState,
    (state: RelatorioCreateState) => state.saving
);

export const getErrors: any = createSelector(
    getRelatorioCreateState,
    (state: RelatorioCreateState) => state.errors
);
