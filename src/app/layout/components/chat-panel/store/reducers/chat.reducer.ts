import * as ChatActions from '../actions/chat.actions';

export interface ChatState {
    entitiesId: number[];
    chatOpenId: number;
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
}

export const ChatInitialState: ChatState = {
    entitiesId: [],
    chatOpenId: null,
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: []
};

export function ChatReducer(
    state = ChatInitialState,
    action: ChatActions.ChatActionsAll
): ChatState {
    switch (action.type) {

        case ChatActions.OPEN_CHAT: {
            return {
                ...state,
                chatOpenId: action.payload.id
            };
        }

        case ChatActions.CLOSE_CHAT: {
            return {
                ...state,
                chatOpenId: null
            };
        }

        case ChatActions.GET_CHAT: {
            return {
                ...state,
                loading: true,
                pagination: {
                    filter: action.payload.filter,
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case ChatActions.GET_CHAT_SUCCESS: {
            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded: true
            };
        }

        case ChatActions.GET_CHAT_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        // inclui o chat sem fazer refresh pelo backend
        case ChatActions.NOVO_CHAT_INICIADO: {
            return {
                ...state,
                entitiesId: [...state.entitiesId, action.payload.chat.id],
                pagination: {
                    ...state.pagination,
                    total: state.entitiesId.length
                },
                loading: false,
                loaded: true
            };
        }

        default:
            return state;
    }
}
