import {createSelector} from '@ngrx/store';
import {DocumentoEditVisibilidadeAppState, getDocumentoEditVisibilidadeAppState, VisibilidadeState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';
import {Visibilidade} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Visibilidade>(visibilidadeSchema);

export const getVisibilidadeState: any = createSelector(
    getDocumentoEditVisibilidadeAppState,
    (state: DocumentoEditVisibilidadeAppState) => state.visibilidades
);

export const getVisibilidadeIds: any = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.entitiesId
);

export const getVisibilidadeId: any = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.loaded ? state.loaded.value : null
);

export const getVisibilidadeListLoaded: any = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.loaded
);

export const getVisibilidadeList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVisibilidadeIds,
    schemaSelectors.entitiesProjector
);

export const getVisibilidade: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVisibilidadeId,
    schemaSelectors.entityProjector
);

export const getDeletingVisibilidadeIds: any = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.deletingIds
);

export const getDeletedVisibilidadeIds: any = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.deletedIds
);

export const getHasLoaded: any = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.loaded
);

export const getVisibilidadeIsLoading: any = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.loading
);

export const getIsSavingVisibilidade: any = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.saving
);

export const getErrors: any = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.errors
);
