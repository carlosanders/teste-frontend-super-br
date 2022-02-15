import {createSelector} from '@ngrx/store';
import {getRelacionamentoListAppState, RelacionamentoListAppState, RelacionamentoListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {relacionamentoPessoal as relacionamentoSchema} from '@cdk/normalizr';
import {RelacionamentoPessoal} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<RelacionamentoPessoal>(relacionamentoSchema);

export const getRelacionamentoListState: any = createSelector(
    getRelacionamentoListAppState,
    (state: RelacionamentoListAppState) => state.relacionamentoList
);

export const getRelacionamentoListIds: any = createSelector(
    getRelacionamentoListState,
    (state: RelacionamentoListState) => state.entitiesId
);

export const getRelacionamentoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRelacionamentoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getRelacionamentoListState,
    (state: RelacionamentoListState) => state.pagination
);

export const getRelacionamentoListLoaded: any = createSelector(
    getRelacionamentoListState,
    (state: RelacionamentoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getRelacionamentoListState,
    (state: RelacionamentoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getRelacionamentoListState,
    (state: RelacionamentoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getRelacionamentoListState,
    (state: RelacionamentoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getRelacionamentoListState,
    (state: RelacionamentoListState) => state.deletingErrors
);
