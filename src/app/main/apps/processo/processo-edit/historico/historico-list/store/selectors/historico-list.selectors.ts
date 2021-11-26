import {createSelector} from '@ngrx/store';
import {getHistoricoListAppState, HistoricoListAppState, HistoricoListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {historico as historicoSchema} from '@cdk/normalizr';
import {Historico} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Historico>(historicoSchema);

export const getHistoricoListState: any = createSelector(
    getHistoricoListAppState,
    (state: HistoricoListAppState) => state.historicoList
);

export const getHistoricoListIds: any = createSelector(
    getHistoricoListState,
    (state: HistoricoListState) => state.entitiesId
);

export const getHistoricoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getHistoricoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getHistoricoListState,
    (state: HistoricoListState) => state.pagination
);

export const getHistoricoListLoaded: any = createSelector(
    getHistoricoListState,
    (state: HistoricoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getHistoricoListState,
    (state: HistoricoListState) => state.loading
);
