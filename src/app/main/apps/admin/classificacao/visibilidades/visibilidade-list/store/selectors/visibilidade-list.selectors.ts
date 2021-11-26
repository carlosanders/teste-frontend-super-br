import {createSelector} from '@ngrx/store';
import * as fromStore from '../index';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';
import {Visibilidade} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Visibilidade>(visibilidadeSchema);

export const getClassificacaoVisibilidadeListState: any = createSelector(
    fromStore.getClassificacaoVisibilidadeListAppState,
    (state: fromStore.ClassificacaoVisibilidadeListAppState) => state.classificacaoVisibilidadeList
);

export const getClassificacaoVisibilidadeListIds: any = createSelector(
    getClassificacaoVisibilidadeListState,
    (state: fromStore.ClassificacaoVisibilidadeListState) => state.entitiesId
);

export const getClassificacaoVisibilidadeList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getClassificacaoVisibilidadeListIds,
    schemaSelectors.entitiesProjector
);

export const getClassificacaoVisibilidadeListLoaded: any = createSelector(
    getClassificacaoVisibilidadeListState,
    (state: fromStore.ClassificacaoVisibilidadeListState) => state.loaded
);

export const getClassificacaoVisibilidadeListIsLoading: any = createSelector(
    getClassificacaoVisibilidadeListState,
    (state: fromStore.ClassificacaoVisibilidadeListState) => state.loading
);

export const getClassificacaoVisibilidadeListDeletingIds: any = createSelector(
    getClassificacaoVisibilidadeListState,
    (state: fromStore.ClassificacaoVisibilidadeListState) => state.deletingIds
);

export const getClassificacaoVisibilidadeListDeletedIds: any = createSelector(
    getClassificacaoVisibilidadeListState,
    (state: fromStore.ClassificacaoVisibilidadeListState) => state.deletedIds
);

export const getClassificacaoVisibilidadeListDeletingErrors: any = createSelector(
    getClassificacaoVisibilidadeListState,
    (state: fromStore.ClassificacaoVisibilidadeListState) => state.deletingErrors
);
