import {createSelector} from '@ngrx/store';
import {DocumentoAppState, getDocumentoAppState, SigilosState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {sigilo as schemaSigilo} from '@cdk/normalizr';
import {Sigilo} from '@cdk/models';

const schemaSigiloSelectors = createSchemaSelectors<Sigilo>(schemaSigilo);

export const getSigilosState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.sigilos
);

export const getSigilosIds = createSelector(
    getSigilosState,
    (state: SigilosState) => state.entitiesId
);

export const getSigilos = createSelector(
    schemaSigiloSelectors.getNormalizedEntities,
    getSigilosIds,
    schemaSigiloSelectors.entitiesProjector
);

export const getSigiloId = createSelector(
    getSigilosState,
    (state: SigilosState) => state.loaded ? state.loaded.value : null
);

export const getSigilo = createSelector(
    schemaSigiloSelectors.getNormalizedEntities,
    getSigiloId,
    schemaSigiloSelectors.entityProjector
);

export const getSigilosLoaded = createSelector(
    getSigilosState,
    (state: SigilosState) => state.loaded
);

export const getSigilosIsLoading = createSelector(
    getSigilosState,
    (state: SigilosState) => state.loading
);

export const getIsSavingSigilos = createSelector(
    getSigilosState,
    (state: SigilosState) => state.saving
);

export const getErrorsSigilos = createSelector(
    getSigilosState,
    (state: SigilosState) => state.errors
);

export const getDeletingSigiloIds = createSelector(
    getSigilosState,
    (state: SigilosState) => state.deletingIds
);

export const getDeletedSigiloIds = createSelector(
    getSigilosState,
    (state: SigilosState) => state.deletedIds
);

export const getSigilosPagination = createSelector(
    getSigilosState,
    (state: SigilosState) => state.pagination
);
