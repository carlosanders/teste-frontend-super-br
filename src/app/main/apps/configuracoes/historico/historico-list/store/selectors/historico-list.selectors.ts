import {createSelector} from '@ngrx/store';
import {getHistoricoConfigListAppState, HistoricoConfigListAppState, HistoricoConfigListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {historico as historicoSchema} from '@cdk/normalizr';
import {Historico} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Historico>(historicoSchema);

export const getHistoricoConfigListState: any = createSelector(
    getHistoricoConfigListAppState,
    (state: HistoricoConfigListAppState) => state.historicoConfigList
);

export const getHistoricoConfigListIds: any = createSelector(
    getHistoricoConfigListState,
    (state: HistoricoConfigListState) => state.entitiesId
);

export const getHistoricoConfigList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getHistoricoConfigListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getHistoricoConfigListState,
    (state: HistoricoConfigListState) => state.pagination
);

export const getHistoricoConfigListLoaded: any = createSelector(
    getHistoricoConfigListState,
    (state: HistoricoConfigListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getHistoricoConfigListState,
    (state: HistoricoConfigListState) => state.loading
);
