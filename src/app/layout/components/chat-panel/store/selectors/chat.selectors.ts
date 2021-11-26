import {createSelector} from '@ngrx/store';
import {Chat, ComponenteDigital} from '@cdk/models';
import {chat as chatSchema, componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ChatState} from '../reducers/chat.reducer';
import {ChatAppState, getChatAppState} from '../reducers';

const schemaSelectors = createSchemaSelectors<Chat>(chatSchema);
const schemaSelectorsComponenteDigital = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);


export const getChatState: any = createSelector(
    getChatAppState,
    (state: ChatAppState) => state.chat
);

export const getChatListIds: any = createSelector(
    getChatState,
    (state: ChatState) => state.entitiesId
);

export const getChatList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getChatListIds,
    schemaSelectors.entitiesProjector
);

export const getChatOpenId: any = createSelector(
    getChatState,
    (state: ChatState) => state.chatOpenId
);

export const getChatOpen: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getChatOpenId,
    schemaSelectors.entityProjector
);

export const getChatIsLoaded: any = createSelector(
    getChatState,
    (state: ChatState) => state.loaded
);

export const getChatIsLoading: any = createSelector(
    getChatState,
    (state: ChatState) => state.loading
);

export const getChatDeletingIds: any = createSelector(
    getChatState,
    (state: ChatState) => state.deletingIds
);

export const getChatDeletedIds: any = createSelector(
    getChatState,
    (state: ChatState) => state.deletedIds
);

export const getChatPagination: any = createSelector(
    getChatState,
    (state: ChatState) => state.pagination
);

export const getChatFormSaving: any = createSelector(
    getChatState,
    (state: ChatState) => state.chatForm.saving
);

export const getChatFormErrors: any = createSelector(
    getChatState,
    (state: ChatState) => state.chatForm.errors
);

export const getChatFormCapaId: any = createSelector(
    getChatState,
    (state: ChatState) => state.chatForm.capaId
);

export const getChatFormCapa: any = createSelector(
    schemaSelectorsComponenteDigital.getNormalizedEntities,
    getChatFormCapaId,
    schemaSelectorsComponenteDigital.entityProjector
);


export const getChatActiveCard: any = createSelector(
    getChatState,
    (state: ChatState) => state.activeCard
);
