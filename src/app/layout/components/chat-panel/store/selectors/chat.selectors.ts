import {createSelector} from '@ngrx/store';
import {Chat, ComponenteDigital} from '@cdk/models';
import {chat as chatSchema, componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ChatState} from '../reducers/chat.reducer';
import {ChatAppState, getChatAppState} from '../reducers';

const schemaSelectors = createSchemaSelectors<Chat>(chatSchema);
const schemaSelectorsComponenteDigital = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);


export const getChatState = createSelector(
    getChatAppState,
    (state: ChatAppState) => state.chat
);

export const getChatListIds = createSelector(
    getChatState,
    (state: ChatState) => state.entitiesId
);

export const getChatList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getChatListIds,
    schemaSelectors.entitiesProjector
);

export const getChatOpenId = createSelector(
    getChatState,
    (state: ChatState) => state.chatOpenId
);

export const getChatOpen = createSelector(
    schemaSelectors.getNormalizedEntities,
    getChatOpenId,
    schemaSelectors.entityProjector
);

export const getChatIsLoaded = createSelector(
    getChatState,
    (state: ChatState) => state.loaded
);

export const getChatIsLoading = createSelector(
    getChatState,
    (state: ChatState) => state.loading
);

export const getChatDeletingIds = createSelector(
    getChatState,
    (state: ChatState) => state.deletingIds
);

export const getChatDeletedIds = createSelector(
    getChatState,
    (state: ChatState) => state.deletedIds
);

export const getChatPagination = createSelector(
    getChatState,
    (state: ChatState) => state.pagination
);

export const getChatFormSaving = createSelector(
    getChatState,
    (state: ChatState) => state.chatForm.saving
);

export const getChatFormErrors = createSelector(
    getChatState,
    (state: ChatState) => state.chatForm.errors
);

export const getChatFormCapaId = createSelector(
    getChatState,
    (state: ChatState) => state.chatForm.capaId
);

export const getChatFormCapa = createSelector(
    schemaSelectorsComponenteDigital.getNormalizedEntities,
    getChatFormCapaId,
    schemaSelectorsComponenteDigital.entityProjector
);


export const getChatActiveCard = createSelector(
    getChatState,
    (state: ChatState) => state.activeCard
);
