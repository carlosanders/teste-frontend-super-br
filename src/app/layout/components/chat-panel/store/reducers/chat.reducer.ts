import * as ChatActions from '../actions/chat.actions';

export interface ChatState {
    entitiesId: number[];
    chatOpenId: number;
    activeCard: string;
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        context: any;
        sort: any;
        total: number;
    };
    chatForm: {
        saving: boolean;
        errors: any;
        capaId: number;
    }
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
}

export const ChatInitialState: ChatState = {
    entitiesId: [],
    activeCard: 'chat-list',
    chatOpenId: null,
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        context: {},
        sort: {},
        total: 0,
    },
    chatForm: {
        saving: false,
        errors: null,
        capaId: null
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
                activeCard: 'chat-mensagem-list',
                chatOpenId: action.payload.id
            };
        }

        case ChatActions.CLOSE_CHAT: {
            return {
                ...state,
                activeCard: 'chat-list',
                chatOpenId: null,
                chatForm: {
                    ...ChatInitialState.chatForm
                }
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
                    context: action.payload.context,
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
                    context: action.payload.context,
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
                    entitiesId: [
                        ...state.entitiesId.filter(id => id !== action.payload.id),
                        action.payload.id
                    ],
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

        case ChatActions.UPLOAD_IMAGEM_CAPA: {
            return {
                ...state,
                chatForm: {
                    ...state.chatForm,
                    capaId: null,
                    errors: null,
                    saving: true
                }
            };
        }

        case ChatActions.UPLOAD_IMAGEM_CAPA_SUCCESS: {
            return {
                ...state,
                chatForm: {
                    ...state.chatForm,
                    capaId: action.payload.id,
                    saving: false
                }
            };
        }

        case ChatActions.UPLOAD_IMAGEM_CAPA_FAILED: {
            return {
                ...state,
                chatForm: {
                    ...state.chatForm,
                    errors: action.payload,
                    saving: false
                }
            };
        }

        case ChatActions.CHAT_SAVE: {
            return {
                ...state,
                chatForm: {
                    ...state.chatForm,
                    errors: null,
                    saving: true
                }
            };
        }

        case ChatActions.CHAT_SAVE_SUCCESS: {
            return {
                ...state,
                chatForm: {
                    ...ChatInitialState.chatForm,
                }
            };
        }

        case ChatActions.CHAT_SAVE_FAILED: {
            return {
                ...state,
                chatForm: {
                    ...state.chatForm,
                    errors: action.payload,
                    saving: false
                }
            };
        }

        case ChatActions.SET_CHAT_ACTIVE_CARD: {
            return {
                ...state,
                activeCard: action.payload,
                chatForm: {
                    capaId: null,
                    errors: null,
                    saving: false
                }
            };
        }

        case ChatActions.UNLOAD_CHAT: {
            return {
                ...state,
                chatForm: {
                    ...ChatInitialState.chatForm
                },
                entitiesId: state.entitiesId.filter(id => id !== action.payload.id)
            };
        }

        case ChatActions.CHAT_EXCLUIR: {
            return {
                ...state,
                deletingIds: [
                    ...state.deletingIds.filter(id => id !== action.payload.chat.id),
                    action.payload.chat.id
                ],
                chatForm: {
                    ...state.chatForm,
                    saving: true,
                    errors: null
                }
            };
        }

        case ChatActions.CHAT_EXCLUIR_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletedIds.filter(id => id !== action.payload.chat.id),
                deletedIds: [
                    ...state.deletedIds.filter(id => id !== action.payload.chat.id),
                    action.payload.chat.id
                ],
                chatForm: {
                    ...state.chatForm,
                    saving: false,
                    errors: null
                },
                entitiesId: state.entitiesId.filter(id => id !== action.payload.chat.id)
            };
        }

        case ChatActions.CHAT_EXCLUIR_FAILED: {
            return {
                ...state,
                deletingIds: state.deletedIds.filter(id => id !== action.payload.chat.id),
                chatForm: {
                    ...state.chatForm,
                    saving: false,
                    errors: action.payload.errors
                }
            };
        }

        default:
            return state;
    }
}
