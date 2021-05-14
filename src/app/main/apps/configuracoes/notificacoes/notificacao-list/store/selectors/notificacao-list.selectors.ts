import {createSelector} from '@ngrx/store';
import {
    getNotificacaoListAppState,
    NotificacaoListAppState,
    NotificacaoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {notificacao as notificacaoSchema} from '@cdk/normalizr';
import {Notificacao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Notificacao>(notificacaoSchema);

export const getNotificacaoListState = createSelector(
    getNotificacaoListAppState,
    (state: NotificacaoListAppState) => state.notificacaoList
);

export const getNotificacaoListIds = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.entitiesId
);

export const getNotificacaoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getNotificacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.pagination
);

export const getNotificacaoListLoaded = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.deletingErrors
);
