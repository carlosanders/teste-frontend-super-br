import {createSelector} from '@ngrx/store';
import {getTipoDocumentoListAppState, TipoDocumentoListAppState, TipoDocumentoListState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {TipoDocumento} from '@cdk/models';
import {tipoDocumento as tipoDocumentoSchema} from '@cdk/normalizr/tipo-documento.schema';

const schemaTipoDocumentoSelectors = createSchemaSelectors<TipoDocumento>(tipoDocumentoSchema);

export const getTipoDocumentoListState = createSelector(
    getTipoDocumentoListAppState,
    (state: TipoDocumentoListAppState) => state.tipoDocumento
);

export const getTipoDocumentoId = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.entityId
);

export const getTipoDocumento = createSelector(
    schemaTipoDocumentoSelectors.getNormalizedEntities,
    getTipoDocumentoId,
    schemaTipoDocumentoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.saving
);

export const getHasLoaded = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.loaded
);

export const getErrors = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.errors
);

export const getDeletingIds = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.deletedIds
);

export const getTipoDocumentoListLoaded = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.loaded
);
