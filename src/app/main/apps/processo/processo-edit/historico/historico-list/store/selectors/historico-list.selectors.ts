import {createSelector} from '@ngrx/store';
import {getHistoricoListAppState, HistoricoListAppState, HistoricoListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {historico as historicoSchema} from '@cdk/normalizr';
import {Historico} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Historico>(historicoSchema);

export const getHistoricoListState = createSelector(
    getHistoricoListAppState,
    (state: HistoricoListAppState) => state.historicoList
);

export const getHistoricoListIds = createSelector(
    getHistoricoListState,
    (state: HistoricoListState) => state.entitiesId
);

export const getHistoricoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getHistoricoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getHistoricoListState,
    (state: HistoricoListState) => state.pagination
);

export const getHistoricoListLoaded = createSelector(
    getHistoricoListState,
    (state: HistoricoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getHistoricoListState,
    (state: HistoricoListState) => state.loading
);
