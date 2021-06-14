import {createSelector} from '@ngrx/store';
import {getProcessosAppState, ProcessosAppState, ProcessosState} from 'app/main/apps/pesquisa/processos/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr';
import {Processo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getProcessosState = createSelector(
    getProcessosAppState,
    (state: ProcessosAppState) => state.processos
);

export const getProcessosIds = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.entitiesId
);

export const getProcessos = createSelector(
    schemaSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.pagination
);

export const getIsLoading = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.loading
);
