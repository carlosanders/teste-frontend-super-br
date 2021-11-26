import {createSelector} from '@ngrx/store';
import {ClassificacaoTreeListAppState, ClassificacaoTreeListState, getClassificacaoTreeListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {classificacao as classificacaoSchema} from '@cdk/normalizr';
import {Classificacao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Classificacao>(classificacaoSchema);

export const getClassificacaoTreeListState: any = createSelector(
    getClassificacaoTreeListAppState,
    (state: ClassificacaoTreeListAppState) => state.classificacaoTreeList
);

export const getClassificacaoTreeListIds: any = createSelector(
    getClassificacaoTreeListState,
    (state: ClassificacaoTreeListState) => state.entitiesId
);

export const getClassificacaoTreeList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getClassificacaoTreeListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getClassificacaoTreeListState,
    (state: ClassificacaoTreeListState) => state.pagination
);

export const getClassificacaoTreeListLoaded: any = createSelector(
    getClassificacaoTreeListState,
    (state: ClassificacaoTreeListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getClassificacaoTreeListState,
    (state: ClassificacaoTreeListState) => state.loading
);

export const getIsSaving: any = createSelector(
    getClassificacaoTreeListState,
    (state: ClassificacaoTreeListState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getClassificacaoTreeListState,
    (state: ClassificacaoTreeListState) => state.loaded
);

export const getErrors: any = createSelector(
    getClassificacaoTreeListState,
    (state: ClassificacaoTreeListState) => state.errors
);

