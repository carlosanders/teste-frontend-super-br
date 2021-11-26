import {createSelector} from '@ngrx/store';
import {EspecieTarefaListAppState, EspecieTarefaListState, getEspecieTarefaListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieTarefa as especieTarefaSchema} from '@cdk/normalizr';
import {EspecieTarefa} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<EspecieTarefa>(especieTarefaSchema);

export const getEspecieTarefaListState: any = createSelector(
    getEspecieTarefaListAppState,
    (state: EspecieTarefaListAppState) => state.especieTarefaList
);

export const getEspecieTarefaListIds: any = createSelector(
    getEspecieTarefaListState,
    (state: EspecieTarefaListState) => state.entitiesId
);

export const getEspecieTarefaList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieTarefaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getEspecieTarefaListState,
    (state: EspecieTarefaListState) => state.pagination
);

export const getEspecieTarefaListLoaded: any = createSelector(
    getEspecieTarefaListState,
    (state: EspecieTarefaListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getEspecieTarefaListState,
    (state: EspecieTarefaListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getEspecieTarefaListState,
    (state: EspecieTarefaListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getEspecieTarefaListState,
    (state: EspecieTarefaListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getEspecieTarefaListState,
    (state: EspecieTarefaListState) => state.deletingErrors
);
