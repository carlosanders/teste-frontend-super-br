import {createSelector} from '@ngrx/store';
import {ChatMensagem} from '@cdk/models';
import {chatMensagem as chatMensagemSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ChatMensagemState} from '../reducers/chat-mensagem.reducer';
import {ChatAppState, getChatAppState} from '../reducers';

const schemaSelectors = createSchemaSelectors<ChatMensagem>(chatMensagemSchema);


export const getChatMensagemState: any = createSelector(
    getChatAppState,
    (state: ChatAppState) => state.chatMensagem
);

export const getChatMensagemListIds: any = createSelector(
    getChatMensagemState,
    (state: ChatMensagemState) => state.entitiesId
);

export const getChatMensagemList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getChatMensagemListIds,
    schemaSelectors.entitiesProjector
);

export const getChatMensagemIsLoaded: any = createSelector(
    getChatMensagemState,
    (state: ChatMensagemState) => state.loaded
);

export const getChatMensagemIsLoading: any = createSelector(
    getChatMensagemState,
    (state: ChatMensagemState) => state.loading
);

export const getChatMensagemDeletingIds: any = createSelector(
    getChatMensagemState,
    (state: ChatMensagemState) => state.deletingIds
);

export const getChatMensagemDeletedIds: any = createSelector(
    getChatMensagemState,
    (state: ChatMensagemState) => state.deletedIds
);

export const getChatMensagemPagination: any = createSelector(
    getChatMensagemState,
    (state: ChatMensagemState) => state.pagination
);

export const getChatMensagemIsSaving: any = createSelector(
    getChatMensagemState,
    (state: ChatMensagemState) => state.saving
);
