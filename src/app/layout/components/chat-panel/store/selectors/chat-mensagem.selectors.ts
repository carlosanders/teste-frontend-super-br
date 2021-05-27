import {createSelector} from '@ngrx/store';
import {ChatMensagem} from '@cdk/models';
import {chatMensagem as chatMensagemSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ChatMensagemState} from '../reducers/chat-mensagem.reducer';
import {ChatAppState, getChatAppState} from '../reducers';

const schemaSelectors = createSchemaSelectors<ChatMensagem>(chatMensagemSchema);


export const getChatMensagemState = createSelector(
    getChatAppState,
    (state: ChatAppState) => state.chatMensagem
);

export const getChatMensagemListIds = createSelector(
    getChatMensagemState,
    (state: ChatMensagemState) => state.entitiesId
);

export const getChatMensagemList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getChatMensagemListIds,
    schemaSelectors.entitiesProjector
);

export const getChatMensagemIsLoaded = createSelector(
    getChatMensagemState,
    (state: ChatMensagemState) => state.loaded
);

export const getChatMensagemIsLoading = createSelector(
    getChatMensagemState,
    (state: ChatMensagemState) => state.loading
);

export const getChatMensagemDeletingIds = createSelector(
    getChatMensagemState,
    (state: ChatMensagemState) => state.deletingIds
);

export const getChatMensagemDeletedIds = createSelector(
    getChatMensagemState,
    (state: ChatMensagemState) => state.deletedIds
);

export const getChatMensagemPagination = createSelector(
    getChatMensagemState,
    (state: ChatMensagemState) => state.pagination
);

export const getChatMensagemIsSaving = createSelector(
    getChatMensagemState,
    (state: ChatMensagemState) => state.saving
);
