import {createSelector} from '@ngrx/store';
import {AssinaturasState, DocumentoAppState, getDocumentoAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assinatura as schemaAssinatura} from '@cdk/normalizr';
import {Assinatura} from '@cdk/models';

const schemaAssinaturaSelectors = createSchemaSelectors<Assinatura>(schemaAssinatura);

export const getAssinaturasState: any = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.assinaturas
);

export const getAssinaturasIds: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.entitiesId
);

export const getAssinaturas: any = createSelector(
    schemaAssinaturaSelectors.getNormalizedEntities,
    getAssinaturasIds,
    schemaAssinaturaSelectors.entitiesProjector
);

export const getAssinaturaId: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.loaded ? state.loaded.value : null
);

export const getAssinaturasIsLoading: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.loading
);

export const getDeletingAssinaturaIds: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.deletingIds
);

export const getDeletedAssinaturaIds: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.deletedIds
);

export const getAssinaturasPagination: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state.pagination
);
