import {createSelector} from '@ngrx/store';
import * as fromStore from '../index';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';
import {Visibilidade} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Visibilidade>(visibilidadeSchema);

export const getClassificacaoVisibilidadeListState = createSelector(
    fromStore.getClassificacaoVisibilidadeListAppState,
    (state: fromStore.ClassificacaoVisibilidadeListAppState) => state.classificacaoVisibilidadeList
);

export const getClassificacaoVisibilidadeListIds = createSelector(
    getClassificacaoVisibilidadeListState,
    (state: fromStore.ClassificacaoVisibilidadeListState) => state.entitiesId
);

export const getClassificacaoVisibilidadeList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getClassificacaoVisibilidadeListIds,
    schemaSelectors.entitiesProjector
);

export const getClassificacaoVisibilidadeListLoaded = createSelector(
    getClassificacaoVisibilidadeListState,
    (state: fromStore.ClassificacaoVisibilidadeListState) => state.loaded
);

export const getClassificacaoVisibilidadeListIsLoading = createSelector(
    getClassificacaoVisibilidadeListState,
    (state: fromStore.ClassificacaoVisibilidadeListState) => state.loading
);

export const getClassificacaoVisibilidadeListDeletingIds = createSelector(
    getClassificacaoVisibilidadeListState,
    (state: fromStore.ClassificacaoVisibilidadeListState) => state.deletingIds
);

export const getClassificacaoVisibilidadeListDeletedIds = createSelector(
    getClassificacaoVisibilidadeListState,
    (state: fromStore.ClassificacaoVisibilidadeListState) => state.deletedIds
);

export const getClassificacaoVisibilidadeListDeletingErrors = createSelector(
    getClassificacaoVisibilidadeListState,
    (state: fromStore.ClassificacaoVisibilidadeListState) => state.deletingErrors
);
