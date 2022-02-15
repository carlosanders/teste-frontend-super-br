import {createSelector} from '@ngrx/store';
import {getProcessosAppState, ProcessosAppState, ProcessosState} from 'app/main/apps/pesquisa/processos/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr';
import {Processo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getProcessosState: any = createSelector(
    getProcessosAppState,
    (state: ProcessosAppState) => state.processos
);

export const getProcessosIds: any = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.entitiesId
);

export const getProcessos: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.pagination
);

export const getIsLoading: any = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.loading
);
