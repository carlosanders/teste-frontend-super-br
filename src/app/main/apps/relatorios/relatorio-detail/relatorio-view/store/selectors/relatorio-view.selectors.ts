import {createSelector} from '@ngrx/store';
import {
    getRelatorioViewAppState,
    RelatorioViewAppState,
    RelatorioViewState
} from 'app/main/apps/relatorios/relatorio-detail/relatorio-view/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {relatorio as relatorioSchema} from '@cdk/normalizr';
import {Relatorio} from '@cdk/models/relatorio.model';

const schemaSelectors = createSchemaSelectors<Relatorio>(relatorioSchema);

export const getRelatorioViewState: any = createSelector(
    getRelatorioViewAppState,
    (state: RelatorioViewAppState) => state.relatorioView
);

export const getRelatorioId: any = createSelector(
    getRelatorioViewState,
    (state: RelatorioViewState) => state.loaded ? state.loaded.value : null
);

export const getRelatorio: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRelatorioId,
    schemaSelectors.entityProjector
);

export const getRelatoriosLoaded: any = createSelector(
    getRelatorioViewState,
    (state: RelatorioViewState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getRelatorioViewState,
    (state: RelatorioViewState) => state.loading
);

export const getBinary: any = createSelector(
    getRelatorioViewState,
    (state: RelatorioViewState) => state.binary
);

export const getIndex: any = createSelector(
    getRelatorioViewState,
    (state: RelatorioViewState) => state.index
);

export const getCurrentStep: any = createSelector(
    getRelatorioViewState,
    (state: RelatorioViewState) => state.currentStep
);
