import {createSelector} from '@ngrx/store';
import {Notificacao} from '@cdk/models';
import {notificacao as notificacaoSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {NotificacaoState} from '../reducers/notificacao.reducer';
import {getNotificacoesState} from '../reducers';

const schemaSelectors = createSchemaSelectors<Notificacao>(notificacaoSchema);

export const getNotificacaoListIds: any = createSelector(
    getNotificacoesState,
    (state: NotificacaoState) => state.entitiesId
);

export const getNormalizedNotificacaoEntities: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    schemaSelectors.entitiesProjector
);

export const getNotificacaoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getNotificacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getNotificacoesState,
    (state: NotificacaoState) => state.pagination
);

export const getNotificacaoListLoaded: any = createSelector(
    getNotificacoesState,
    (state: NotificacaoState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getNotificacoesState,
    (state: NotificacaoState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getNotificacoesState,
    (state: NotificacaoState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getNotificacoesState,
    (state: NotificacaoState) => state.deletedIds
);

export const getSnackbar: any = createSelector(
    getNotificacoesState,
    (state: NotificacaoState) => state.snackbar
);
