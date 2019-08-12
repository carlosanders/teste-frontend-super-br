import {createSelector} from '@ngrx/store';
import {
    getEspecieAtividadeListAppState,
    EspecieAtividadeListAppState,
    EspecieAtividadeListState
} from 'app/main/apps/configuracoes/favoritos/especie-atividade-list/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieAtividade as especieAtividadeSchema} from '@cdk/normalizr/especie-atividade.schema';
import {EspecieAtividade} from '@cdk/models/especie-atividade.model';

const schemaSelectors = createSchemaSelectors<EspecieAtividade>(especieAtividadeSchema);

export const getEspecieAtividadeListState = createSelector(
    getEspecieAtividadeListAppState,
    (state: EspecieAtividadeListAppState) => state.especieAtividadeList
);

export const getEspecieAtividadeListIds = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.entitiesId
);

export const getEspecieAtividadeList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieAtividadeListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.pagination
);

export const getEspecieAtividadeListLoaded = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.loaded
);

export const getIsLoading = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.loading
);

export const getDeletingIds = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.deletedIds
);


export const getEspecieAtividadeId = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.loaded && state.loaded.value !== 'criar' ? state.loaded.value : null
);

export const getEspecieAtividade = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieAtividadeId,
    schemaSelectors.entityProjector
);

export const getEspecieAtividadeLoaded = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.loaded
);

export const getIsSaving = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.saving
);

export const getErrors = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.errors
);
