import {createSelector} from '@ngrx/store';
import {AssinaturasState, DocumentoEditAssinaturasAppState, getDocumentoEditAssinaturasAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assinatura as schemaAssinatura} from '@cdk/normalizr';
import {Assinatura} from '@cdk/models';

const schemaAssinaturaSelectors = createSchemaSelectors<Assinatura>(schemaAssinatura);

export const getAssinaturasState = createSelector(
    getDocumentoEditAssinaturasAppState,
    (state: DocumentoEditAssinaturasAppState) => state.assinaturas
);

export const getAssinaturasIds = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.entitiesId
);

export const getAssinaturas = createSelector(
    schemaAssinaturaSelectors.getNormalizedEntities,
    getAssinaturasIds,
    schemaAssinaturaSelectors.entitiesProjector
);

export const getAssinaturaId = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.loaded ? state.loaded.value : null
);

export const getAssinaturasIsLoading = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.loading
);

export const getDeletingAssinaturaIds = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.deletingIds
);

export const getDeletedAssinaturaIds = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.deletedIds
);

export const getAssinaturasPagination = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.pagination
);

export const getDeletingAssinaturaErrors = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.deletingErrors
);

export const getAssinaturasLoaded = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.loaded
);
