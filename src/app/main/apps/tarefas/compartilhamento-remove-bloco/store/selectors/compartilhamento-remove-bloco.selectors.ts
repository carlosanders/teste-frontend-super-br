import {createSelector} from '@ngrx/store';
import {
    CompartilhamentoRemoveBlocoAppState,
    CompartilhamentoRemoveBlocoState,
    getCompartilhamentoRemoveBlocoAppState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Compartilhamento} from '@cdk/models';
import {compartilhamento as compartilhamentoSchema} from '@cdk/normalizr';

const schemaCompartilhamentoSelectors = createSchemaSelectors<Compartilhamento>(compartilhamentoSchema);

export const getCompartilhamentoRemoveBlocoState: any = createSelector(
    getCompartilhamentoRemoveBlocoAppState,
    (state: CompartilhamentoRemoveBlocoAppState) => state.compartilhamentoRemoveBloco
);

export const getDeletingErrors: any = createSelector(
    getCompartilhamentoRemoveBlocoState,
    (state: CompartilhamentoRemoveBlocoState) => state.deletingErrors
);

export const getPagination: any = createSelector(
    getCompartilhamentoRemoveBlocoState,
    (state: CompartilhamentoRemoveBlocoState) => state.pagination
);

export const getLoaded: any = createSelector(
    getCompartilhamentoRemoveBlocoState,
    (state: CompartilhamentoRemoveBlocoState) => state.loaded
);

export const isLoading: any = createSelector(
    getCompartilhamentoRemoveBlocoState,
    (state: CompartilhamentoRemoveBlocoState) => state.loading
);

export const getDeletedIds: any = createSelector(
    getCompartilhamentoRemoveBlocoState,
    (state: CompartilhamentoRemoveBlocoState) => state.deletedIds
);

export const getDeletingIds: any = createSelector(
    getCompartilhamentoRemoveBlocoState,
    (state: CompartilhamentoRemoveBlocoState) => state.deletingIds
);

export const getIds: any = createSelector(
    getCompartilhamentoRemoveBlocoState,
    (state: CompartilhamentoRemoveBlocoState) => state.entitiesId
);

export const getCompartilhamentos: any = createSelector(
    schemaCompartilhamentoSelectors.getNormalizedEntities,
    getIds,
    schemaCompartilhamentoSelectors.entitiesProjector
);

