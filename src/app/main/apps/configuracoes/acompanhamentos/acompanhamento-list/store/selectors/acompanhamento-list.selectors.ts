import {createSelector} from '@ngrx/store';
import {AcompanhamentoListAppState, AcompanhamentoListState, getAcompanhamentoListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {compartilhamento as acompanhamentoSchema} from '@cdk/normalizr';
import {Compartilhamento} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Compartilhamento>(acompanhamentoSchema);

export const getAcompanhamentoListState: any = createSelector(
    getAcompanhamentoListAppState,
    (state: AcompanhamentoListAppState) => state.acompanhamentoList
);

export const getAcompanhamentoListIds: any = createSelector(
    getAcompanhamentoListState,
    (state: AcompanhamentoListState) => state.entitiesId
);

export const getAcompanhamentoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAcompanhamentoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getAcompanhamentoListState,
    (state: AcompanhamentoListState) => state.pagination
);

export const getAcompanhamentoListLoaded: any = createSelector(
    getAcompanhamentoListState,
    (state: AcompanhamentoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getAcompanhamentoListState,
    (state: AcompanhamentoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getAcompanhamentoListState,
    (state: AcompanhamentoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getAcompanhamentoListState,
    (state: AcompanhamentoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getAcompanhamentoListState,
    (state: AcompanhamentoListState) => state.deletingErrors
);
