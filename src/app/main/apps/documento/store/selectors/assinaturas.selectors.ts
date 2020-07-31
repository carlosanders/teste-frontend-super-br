import {createSelector} from '@ngrx/store';
import {DocumentoAppState, getDocumentoAppState, AssinaturasState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assinatura as schemaAssinatura} from '@cdk/normalizr';
import {Assinatura} from '@cdk/models';

const schemaAssinaturaSelectors = createSchemaSelectors<Assinatura>(schemaAssinatura);

export const getAssinaturasState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.assinaturas
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
