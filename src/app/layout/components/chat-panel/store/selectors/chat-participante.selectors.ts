import {createSelector} from '@ngrx/store';
import {ChatParticipante} from '@cdk/models';
import {chatParticipante as chatParticipanteSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ChatAppState, ChatParticipanteState, getChatAppState} from '../reducers';

const schemaSelectors = createSchemaSelectors<ChatParticipante>(chatParticipanteSchema);


export const getChatParticipanteState: any = createSelector(
    getChatAppState,
    (state: ChatAppState) => state.chatParticipante
);

export const getChatParticipanteListIds: any = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.entitiesId
);

export const getChatParticipanteList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getChatParticipanteListIds,
    schemaSelectors.entitiesProjector
);

export const getChatParticipanteIsLoaded: any = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.loaded
);

export const getChatParticipanteIsSaving: any = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.saving
);

export const getChatParticipanteIsSaved: any = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.saved
);

export const getChatParticipanteIsLoading: any = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.loading
);

export const getChatParticipanteDeletingIds: any = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.deletingIds
);

export const getChatParticipanteDeletedIds: any = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.deletedIds
);

export const getChatParticipantePagination: any = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.pagination
);

export const getChatParticipanteErrors: any = createSelector(
    getChatParticipanteState,
    (state: ChatParticipanteState) => state.errors
);
