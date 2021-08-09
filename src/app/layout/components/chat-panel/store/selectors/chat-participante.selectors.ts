import {createSelector} from '@ngrx/store';
import {ChatParticipante} from '@cdk/models';
import {chatParticipante as chatParticipanteSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ChatAppState, ChatParticipanteState, getChatAppState} from '../reducers';

const schemaSelectors = createSchemaSelectors<ChatParticipante>(chatParticipanteSchema);


export const getChatParticipanteState = createSelector(
    getChatAppState,
    (state: ChatAppState) => state.chatParticipante
);

export const getChatParticipanteListIds = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.entitiesId
);

export const getChatParticipanteList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getChatParticipanteListIds,
    schemaSelectors.entitiesProjector
);

export const getChatParticipanteIsLoaded = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.loaded
);

export const getChatParticipanteIsSaving = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.saving
);

export const getChatParticipanteIsSaved = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.saved
);

export const getChatParticipanteIsLoading = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.loading
);

export const getChatParticipanteDeletingIds = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.deletingIds
);

export const getChatParticipanteDeletedIds = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.deletedIds
);

export const getChatParticipantePagination = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.pagination
);

export const getChatParticipanteErrors = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.errors
);
