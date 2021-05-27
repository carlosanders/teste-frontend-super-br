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

        case ChatActions.GET_CHAT_INCREMENT: {
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

        case ChatActions.GET_CHAT_INCREMENT_SUCCESS: {
            let entitiesId = [...state.entitiesId, ...action.payload.entitiesId];
            return {
                ...state,
                entitiesId: entitiesId.filter((item, pos) => entitiesId.indexOf(item) == pos),
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded: true
            };
        }

        case ChatActions.GET_CHAT_INCREMENT_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        // Inclui/atualiza o item na lista do chat com a informação vinda do mercure
        case ChatActions.CHAT_UPDATED_BROADCAST: {
            // Validando se existe filtro setado para não incluir um chat que não atende os critérios
            const filters = (Object.values(state.pagination.gridFilter || {}));
            if (!filters.length || state.entitiesId.includes(action.payload.id)) {
                return {
                    ...state,
                    entitiesId: state.entitiesId.includes(action.payload.id)
                        ? state.entitiesId : [...state.entitiesId, action.payload.id],
                    pagination: {
                        ...state.pagination,
                        total: action.payload.total
                    },
                    loading: false,
                    loaded: true
                };
            }

            return state;
        }

        default:
            return state;
    }
}
