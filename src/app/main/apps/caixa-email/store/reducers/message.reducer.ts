import * as fromStore from '../index';
import {Folder} from '../../models/folder.model';
import {Message} from '../../models/message.model';

export interface MessageState {
    folder: Folder;
    messages: Message[];
    selectedMessage: {
        loading: boolean;
        loaded: boolean;
        error: any;
        message: Message;
        downloadingAttachments: string[];
    };
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    error: any;
}

export const MessageInitialState: MessageState = {
    folder: null,
    messages: [],
    selectedMessage: {
        loading: false,
        loaded: false,
        error: null,
        message: null,
        downloadingAttachments: []
    },
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    error: null
};

export function MessageReducer(state = MessageInitialState, action: fromStore.MessageActionsAll): MessageState {
    switch (action.type) {

        case fromStore.GET_MESSAGES: {

            const selectedMessage = {
                loading: false,
                loaded: false,
                error: null,
                message: null,
                downloadingAttachments: []
            };

            return {
                ...state,
                folder: action.payload.folder,
                selectedMessage: action.payload?.increment === true ? state.selectedMessage : selectedMessage,
                messages: (action.payload?.increment === true ? state.messages : []),
                loading: true,
                loaded: false,
                pagination: {
                    filter: action.payload.pagination.filter,
                    limit: action.payload.pagination.limit,
                    offset: action.payload.pagination.offset,
                    total: state.pagination.total
                },
                error: null
            };
        }

        case fromStore.GET_MESSAGES_SUCCESS: {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    ...action.payload.messages.filter(newMessage => action.payload.messages.find(message => message.uuid !== newMessage.uuid))
                ],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded: action.payload.folder.uuid,
                error: null
            };
        }

        case fromStore.GET_MESSAGES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }

        case fromStore.UNLOAD_MESSAGE: {
            return {
                ...state,
                folder: null,
                messages: [],
                selectedMessage: {
                    loading: false,
                    loaded: false,
                    error: null,
                    message: null,
                    downloadingAttachments: []
                },
                loading: false,
                loaded: false,
                pagination: {
                    limit: 0,
                    offset: 0,
                    filter: {},
                    total: 0,
                },
                error: null
            };
        }

        case fromStore.GET_MESSAGE: {
            return {
                ...state,
                selectedMessage: {
                    loading: true,
                    loaded: false,
                    message: action.payload.message,
                    error: null,
                    downloadingAttachments: []
                },
            };
        }

        case fromStore.GET_MESSAGE_SUCCESS: {
            const messages = state.messages.slice();

            const message = messages.find(message => message.uuid === action.payload.uuid);

            messages.splice(
                messages.indexOf(message),
                1,
                action.payload
            );

            return {
                ...state,
                messages: messages,
                selectedMessage: {
                    loading: false,
                    loaded: true,
                    message: action.payload,
                    error: null,
                    downloadingAttachments: []
                },
            };
        }

        case fromStore.GET_MESSAGE_FAILED: {
            return {
                ...state,
                selectedMessage: {
                    loading: false,
                    loaded: false,
                    error: action.payload,
                    message: null,
                    downloadingAttachments: []
                }
            };
        }

        case fromStore.SET_MESSAGE: {
            return {
                ...state,
                selectedMessage: {
                    loading: false,
                    loaded: true,
                    error: null,
                    message: action.payload,
                    downloadingAttachments: []
                }
            };
        }

        case fromStore.DOWNLOAD_ATTACHMENT: {
            return {
                ...state,
                selectedMessage: {
                    ...state.selectedMessage,
                    downloadingAttachments: [
                        ...state.selectedMessage.downloadingAttachments,
                        action.payload.attachment
                    ],
                    error: null
                }
            };
        }

        case fromStore.DOWNLOAD_ATTACHMENT_SUCCESS: {
            return {
                ...state,
                selectedMessage: {
                    ...state.selectedMessage,
                    downloadingAttachments: [
                        ...state.selectedMessage.downloadingAttachments.filter(attachment => attachment !== action.payload),
                    ]
                }
            };
        }

        case fromStore.DOWNLOAD_ATTACHMENT_FAILED: {
            return {
                ...state,
                selectedMessage: {
                    ...state.selectedMessage,
                    downloadingAttachments: [
                        ...state.selectedMessage.downloadingAttachments.filter(attachment => attachment !== action.payload.attachment),
                    ],
                    error: action.payload.error
                }
            };
        }

        default:
            return state;
    }
}


