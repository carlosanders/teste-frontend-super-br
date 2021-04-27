import {createSelector} from '@ngrx/store';
import {Notificacao} from '@cdk/models';
import {notificacao as notificacaoSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {NotificacaoState} from '../reducers/notificacao.reducer';
import {getNotificacoesState} from '../reducers';

const schemaSelectors = createSchemaSelectors<Notificacao>(notificacaoSchema);

export const getNotificacaoListIds = createSelector(
    getNotificacoesState,
    (state: NotificacaoState) => state.entitiesId
);

export const getNormalizedNotificacaoEntities = createSelector(
    schemaSelectors.getNormalizedEntities,
    schemaSelectors.entitiesProjector
);

export const getNotificacaoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getNotificacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getNotificacoesState,
    (state: NotificacaoState) => state.pagination
);

export const getNotificacaoListLoaded = createSelector(
    getNotificacoesState,
    (state: NotificacaoState) => state.loaded
);

export const getIsLoading = createSelector(
    getNotificacoesState,
    (state: NotificacaoState) => state.loading
);

export const getDeletingIds = createSelector(
    getNotificacoesState,
    (state: NotificacaoState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getNotificacoesState,
    (state: NotificacaoState) => state.deletedIds
);

export const getSnackbar = createSelector(
    getNotificacoesState,
    (state: NotificacaoState) => state.snackbar
);
