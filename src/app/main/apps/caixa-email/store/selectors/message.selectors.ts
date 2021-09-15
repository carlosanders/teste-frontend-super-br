import {createSelector} from '@ngrx/store';
import {getCaixaEmailAppState, CaixaEmailAppState, MessageState} from '../reducers';

export const getMessageState = createSelector(
    getCaixaEmailAppState,
    (state: CaixaEmailAppState) => state.message
);

export const getMessageList = createSelector(
    getMessageState,
    (state: MessageState) => state.messages
);

export const getMessageListIsLoading = createSelector(
    getMessageState,
    (state: MessageState) => state.loading
);

export const getMessageListIsLoaded = createSelector(
    getMessageState,
    (state: MessageState) => state.loaded
);

export const getMessagePagination = createSelector(
    getMessageState,
    (state: MessageState) => state.pagination
);

export const getMessageListError = createSelector(
    getMessageState,
    (state: MessageState) => state.error
);

export const getMessageIsLoading = createSelector(
    getMessageState,
    (state: MessageState) => state.selectedMessage.loading
);

export const getSelectedMessage = createSelector(
    getMessageState,
    (state: MessageState) => state.selectedMessage.message
);

export const getMessageError = createSelector(
    getMessageState,
    (state: MessageState) => state.selectedMessage.error
);
