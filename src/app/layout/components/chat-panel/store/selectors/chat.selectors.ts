import {createSelector} from '@ngrx/store';
import {Chat} from '@cdk/models';
import {chat as chatSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ChatState} from '../reducers/chat.reducer';
import {ChatAppState, getChatAppState} from '../reducers';

const schemaSelectors = createSchemaSelectors<Chat>(chatSchema);


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
