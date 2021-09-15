import * as fromStore from '../index';
import {Folder} from "../../models/folder.model";
import {Message} from "../../models/message.model";

export interface MessageState {
    folder: Folder,
    messages: Message[];
    selectedMessage: {
        loading: boolean;
        loaded: boolean;
        error: any;
        message: Message;
    };
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    error: any
}

export const MessageInitialState: MessageState = {
    folder: null,
    messages: [],
    selectedMessage: {
        loading: false,
        loaded: false,
        error: null,
        message: null
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
                message: null
            }

            return {
                ...state,
                folder: action.payload.folder,
                selectedMessage: action.payload?.increment === true ? state.selectedMessage : selectedMessage,
                messages: (action.payload?.increment === true ? state.messages : []),
                loading: true,
                loaded: false,
                pagination: {
                    filter: action.payload.filter,
                    limit: action.payload.limit,
                    offset: action.payload.offset,
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
                    ...action.payload.messages.filter(newMessage => action.payload.messages.find(message => message.id !== newMessage.id))
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
                    message: null
                },
                loading: true,
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
                    error: null
                },
            };
        }

        case fromStore.GET_MESSAGE_SUCCESS: {
            const messages = state.messages.slice();

            const message = messages.find(message => message.id === action.payload.id);

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
                    error: null
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
                    message: null
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
                    message: action.payload
                }
            };
        }

        default:
            return state;
    }
}


