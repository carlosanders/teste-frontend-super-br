import {createSelector} from '@ngrx/store';
import {DadosBasicosAppState, getDadosBasicosAppState, InteressadoState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {interessado as interessadoSchema} from '@cdk/normalizr';
import {Interessado} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Interessado>(interessadoSchema);

export const getInteressadoState: any = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.interessados
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

export const getInteressadosPagination: any = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.pagination
);

export const getInteressadosLoaded: any = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.loaded
);

export const getInteressadosIsLoading: any = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.loading
);

export const getInteressadosDeletingIds: any = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.deletingIds
);

export const getInteressadosDeletedIds: any = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.deletedIds
);

export const getInteressadoIsSaving: any = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.saving
);

export const getInteressadoErrors: any = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.errors
);
