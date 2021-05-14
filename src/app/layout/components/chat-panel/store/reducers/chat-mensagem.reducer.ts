import * as ChatMensagemActions from '../actions/chat-mensagem.actions';

export interface ChatMensagemState {
    entitiesId: number[];
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
    saving: boolean;
    saved: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
}

export const ChatMensagemInitialState: ChatMensagemState = {
    entitiesId: [],
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
    saving: false,
    saved: false,
    deletedIds: [],
    deletingIds: []
};

export function ChatMensagemReducer(
    state = ChatMensagemInitialState,
    action: ChatMensagemActions.ChatMensagemActionsAll
): ChatMensagemState {
    switch (action.type) {

        case ChatMensagemActions.GET_MENSAGENS: {
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

        case ChatMensagemActions.GET_MENSAGENS_SUCCESS: {
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

        case ChatMensagemActions.GET_MENSAGENS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ChatMensagemActions.GET_MENSAGENS_INCREMENT: {
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

        case ChatMensagemActions.GET_MENSAGENS_INCREMENT_SUCCESS: {
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

        case ChatMensagemActions.GET_MENSAGENS_INCREMENT_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ChatMensagemActions.ENVIAR_MENSAGEM: {
            return {
                ...state,
                saving: true,
                saved: false
            };
        }

        case ChatMensagemActions.ENVIAR_MENSAGEM_SUCCESS: {
            return {
                ...state,
                saving: false,
                saved: true
            };
        }

        case ChatMensagemActions.ENVIAR_MENSAGEM_FAILED: {
            return {
                ...state,
                saving: false,
                saved: false
            };
        }

        case ChatMensagemActions.MENSAGEM_RECEBIDA: {
            return {
                ...state,
                entitiesId: [...state.entitiesId, action.payload.id],
                pagination: {
                    ...state.pagination,
                    total: state.entitiesId.length
                },
                saving: false,
                saved: true
            };
        }

        default:
            return state;
    }
}
