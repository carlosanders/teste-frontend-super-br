import {createSelector} from '@ngrx/store';
import {getCaixaEmailAppState, CaixaEmailAppState, MessageState} from '../reducers';

export const getMessageState: any = createSelector(
    getCaixaEmailAppState,
    (state: CaixaEmailAppState) => state.message
);

export const getMessageList: any = createSelector(
    getMessageState,
    (state: MessageState) => state.messages
);

export const getMessageListIsLoading: any = createSelector(
    getMessageState,
    (state: MessageState) => state.loading
);

export const getMessageListIsLoaded: any = createSelector(
    getMessageState,
    (state: MessageState) => state.loaded
);

export const getMessagePagination: any = createSelector(
    getMessageState,
    (state: MessageState) => state.pagination
);

export const getMessageListError: any = createSelector(
    getMessageState,
    (state: MessageState) => state.error
);

export const getMessageIsLoading: any = createSelector(
    getMessageState,
    (state: MessageState) => state.selectedMessage.loading
);

export const getSelectedMessage: any = createSelector(
    getMessageState,
    (state: MessageState) => state.selectedMessage.message
);

export const getMessageError: any = createSelector(
    getMessageState,
    (state: MessageState) => state.selectedMessage.error
);

export const getMessageDownloadingAttachments: any = createSelector(
    getMessageState,
    (state: MessageState) => state.selectedMessage.downloadingAttachments
);
