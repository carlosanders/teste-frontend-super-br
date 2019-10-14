import {createSelector} from '@ngrx/store';
import {DocumentoAppState, getDocumentoAppState, VisibilidadeState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr/visibilidade.schema';
import {Visibilidade} from '@cdk/models/visibilidade.model';

const schemaSelectors = createSchemaSelectors<Visibilidade>(visibilidadeSchema);

export const getVisibilidadeState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.visibilidades
);

export const getVisibilidadeIds = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.entitiesId
);

export const getVisibilidadeId = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.loaded ? state.loaded.value : null
);

export const getVisibilidadeListLoaded = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.loaded
);

export const getVisibilidadeList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVisibilidadeIds,
    schemaSelectors.entitiesProjector
);

export const getVisibilidade = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVisibilidadeId,
    schemaSelectors.entityProjector
);

export const getDeletingVisibilidadeIds = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.deletingIds
);

export const getDeletedVisibilidadeIds = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.deletedIds
);

export const getIsSaving = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.saving
);

export const getHasLoaded = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.loaded
);

export const getErrors = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.errors
);
