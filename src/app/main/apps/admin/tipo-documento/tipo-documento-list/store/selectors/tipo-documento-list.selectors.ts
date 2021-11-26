import {createSelector} from '@ngrx/store';
import {getTipoDocumentoListAppState, TipoDocumentoListAppState, TipoDocumentoListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tipoDocumento as tipoDocumentoSchema} from '@cdk/normalizr';
import {TipoDocumento} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<TipoDocumento>(tipoDocumentoSchema);

export const getTipoDocumentoListState: any = createSelector(
    getTipoDocumentoListAppState,
    (state: TipoDocumentoListAppState) => state.tipoDocumentoList
);

export const getTipoDocumentoListIds: any = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.entitiesId
);

export const getTipoDocumentoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTipoDocumentoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.pagination
);

export const getTipoDocumentoListLoaded: any = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.deletingErrors
);
