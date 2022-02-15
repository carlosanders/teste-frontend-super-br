import {createSelector} from '@ngrx/store';
import {getProcessoCapaAppState, InteressadoState, ProcessoCapaAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {interessado as interessadoSchema} from '@cdk/normalizr';
import {Interessado} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Interessado>(interessadoSchema);

export const getInteressadoState: any = createSelector(
    getProcessoCapaAppState,
    (state: ProcessoCapaAppState) => state.interessados
);

export const getInteressadosIds: any = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.entitiesId
);

export const getInteressados: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getInteressadosIds,
    schemaSelectors.entitiesProjector
);

export const getPaginationInteressados: any = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.pagination
);

export const getInteressadosLoaded: any = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.loaded
);

export const getIsInteressadosLoading: any = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.loading
);
