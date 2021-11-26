import {createSelector} from '@ngrx/store';
import {AcaoListAppState, AcaoListState, getAcaoListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {acao as acaoSchema} from '@cdk/normalizr';
import {Acao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Acao>(acaoSchema);

export const getAcaoListState: any = createSelector(
    getAcaoListAppState,
    (state: AcaoListAppState) => state.acaoList
);

export const getAcaoListIds: any = createSelector(
    getAcaoListState,
    (state: AcaoListState) => state.entitiesId
);

export const getAcaoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAcaoListIds,
    schemaSelectors.entitiesProjector
);

export const getAcaoListLoaded: any = createSelector(
    getAcaoListState,
    (state: AcaoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getAcaoListState,
    (state: AcaoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getAcaoListState,
    (state: AcaoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getAcaoListState,
    (state: AcaoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getAcaoListState,
    (state: AcaoListState) => state.deletingErrors
);
