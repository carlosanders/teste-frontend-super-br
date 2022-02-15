import {createSelector} from '@ngrx/store';
import {getTramitacaoListAppState, TramitacaoListAppState, TramitacaoListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';
import {Tramitacao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Tramitacao>(tramitacaoSchema);

export const getTramitacaoListState: any = createSelector(
    getTramitacaoListAppState,
    (state: TramitacaoListAppState) => state.tramitacaoList
);

export const getTramitacaoListIds: any = createSelector(
    getTramitacaoListState,
    (state: TramitacaoListState) => state.entitiesId
);

export const getTramitacaoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTramitacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getTramitacaoListState,
    (state: TramitacaoListState) => state.pagination
);

export const getTramitacaoListLoaded: any = createSelector(
    getTramitacaoListState,
    (state: TramitacaoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getTramitacaoListState,
    (state: TramitacaoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getTramitacaoListState,
    (state: TramitacaoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getTramitacaoListState,
    (state: TramitacaoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getTramitacaoListState,
    (state: TramitacaoListState) => state.deletingErrors
);
