import {createSelector} from '@ngrx/store';
import {DocumentoEditSigilosAppState, getDocumentoEditSigilosAppState, SigilosState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {sigilo as schemaSigilo} from '@cdk/normalizr';
import {Sigilo} from '@cdk/models';

const schemaSigiloSelectors = createSchemaSelectors<Sigilo>(schemaSigilo);

export const getSigilosState: any = createSelector(
    getDocumentoEditSigilosAppState,
    (state: DocumentoEditSigilosAppState) => state.sigilos
);

export const getSigilosIds: any = createSelector(
    getSigilosState,
    (state: SigilosState) => state.entitiesId
);

export const getSigilos: any = createSelector(
    schemaSigiloSelectors.getNormalizedEntities,
    getSigilosIds,
    schemaSigiloSelectors.entitiesProjector
);

export const getSigiloId: any = createSelector(
    getSigilosState,
    (state: SigilosState) => state.loaded ? state.loaded.value : null
);

export const getSigilo: any = createSelector(
    schemaSigiloSelectors.getNormalizedEntities,
    getSigiloId,
    schemaSigiloSelectors.entityProjector
);

export const getSigilosLoaded: any = createSelector(
    getSigilosState,
    (state: SigilosState) => state.loaded
);

export const getSigilosIsLoading: any = createSelector(
    getSigilosState,
    (state: SigilosState) => state.loading
);

export const getIsSavingSigilos: any = createSelector(
    getSigilosState,
    (state: SigilosState) => state.saving
);

export const getErrorsSigilos: any = createSelector(
    getSigilosState,
    (state: SigilosState) => state.errors
);

export const getSigilosPagination: any = createSelector(
    getSigilosState,
    (state: SigilosState) => state.pagination
);
