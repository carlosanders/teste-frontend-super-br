import {createSelector} from '@ngrx/store';
import {
    getClassificacaoTreeListAppState,
    ClassificacaoTreeListAppState,
    ClassificacaoTreeListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {classificacao as classificacaoSchema} from '@cdk/normalizr';
import {Classificacao} from '@cdk/models';
import {ClassificacaoEditState} from '../../../classificacao-edit/store/reducers';
import {getClassificacaoEditState} from '../../../classificacao-edit/store/selectors';

const schemaSelectors = createSchemaSelectors<Classificacao>(classificacaoSchema);

export const getClassificacaoTreeListState = createSelector(
    getClassificacaoTreeListAppState,
    (state: ClassificacaoTreeListAppState) => state.classificacaoTreeList
);

export const getClassificacaoTreeListIds = createSelector(
    getClassificacaoTreeListState,
    (state: ClassificacaoTreeListState) => state.entitiesId
);

export const getClassificacaoTreeList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getClassificacaoTreeListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getClassificacaoTreeListState,
    (state: ClassificacaoTreeListState) => state.pagination
);

export const getClassificacaoTreeListLoaded = createSelector(
    getClassificacaoTreeListState,
    (state: ClassificacaoTreeListState) => state.loaded
);

export const getIsLoading = createSelector(
    getClassificacaoTreeListState,
    (state: ClassificacaoTreeListState) => state.loading
);

export const getIsSaving = createSelector(
    getClassificacaoTreeListState,
    (state: ClassificacaoTreeListState) => state.saving
);

export const getHasLoaded = createSelector(
    getClassificacaoTreeListState,
    (state: ClassificacaoTreeListState) => state.loaded
);

export const getErrors = createSelector(
    getClassificacaoTreeListState,
    (state: ClassificacaoTreeListState) => state.errors
);

