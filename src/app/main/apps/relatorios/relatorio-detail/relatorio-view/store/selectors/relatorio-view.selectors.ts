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

export const getRelatorioViewState = createSelector(
    getRelatorioViewAppState,
    (state: RelatorioViewAppState) => state.relatorioView
);

export const getRelatoriosIds = createSelector(
    getRelatorioViewState,
    (state: RelatorioViewState) => state.entitiesId
);

export const getRelatorios = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRelatoriosIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getRelatorioViewState,
    (state: RelatorioViewState) => state.pagination
);

export const getRelatoriosLoaded = createSelector(
    getRelatorioViewState,
    (state: RelatorioViewState) => state.loaded
);

export const getIsLoading = createSelector(
    getRelatorioViewState,
    (state: RelatorioViewState) => state.loading
);

export const getBinary = createSelector(
    getRelatorioViewState,
    (state: RelatorioViewState) => state.binary
);

export const getIndex = createSelector(
    getRelatorioViewState,
    (state: RelatorioViewState) => state.index
);

export const getCurrentStep = createSelector(
    getRelatorioViewState,
    (state: RelatorioViewState) => state.currentStep
);
