import {createSelector} from '@ngrx/store';
import {getNotificacaoListAppState, NotificacaoListAppState, NotificacaoListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {notificacao as notificacaoSchema} from '@cdk/normalizr';
import {Notificacao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Notificacao>(notificacaoSchema);

export const getNotificacaoListState: any = createSelector(
    getNotificacaoListAppState,
    (state: NotificacaoListAppState) => state.notificacaoList
);

export const getNotificacaoListIds: any = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.entitiesId
);

export const getNotificacaoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getNotificacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.pagination
);

export const getNotificacaoListLoaded: any = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.deletingErrors
);

export const getToggleLidaErrors: any = createSelector(
    getNotificacaoListState,
    (state: NotificacaoListState) => state.toggleLidaErrors
);
