import * as ChatParticipanteActions from '../actions/chat-participante.actions';
import * as _ from 'lodash';

export interface ChatParticipanteState {
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
    errors: any;
    deletingIds: number[];
    deletedIds: number[];
}

export const ChatParticipanteInitialState: ChatParticipanteState = {
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
    errors: null,
    deletedIds: [],
    deletingIds: []
};

export function ChatParticipanteReducer(
    state = ChatParticipanteInitialState,
    action: ChatParticipanteActions.ChatParticipanteActionsAll
): ChatParticipanteState {
    switch (action.type) {

        case ChatParticipanteActions.GET_PARTICIPANTES: {
            let entitiesId = [];
            if (action.payload?.increment === true) {
                entitiesId = state.entitiesId
            }

            return {
                ...state,
                entitiesId: entitiesId,
                loading: true,
                pagination: {
                    filter: action.payload.pagination.filter,
                    limit: action.payload.pagination.limit,
                    offset: action.payload.pagination.offset,
                    gridFilter: action.payload.pagination.gridFilter,
                    populate: action.payload.pagination.populate,
                    sort: action.payload.pagination.sort,
                    total: state.pagination.total
                }
            };
        }

        case ChatParticipanteActions.GET_PARTICIPANTES_SUCCESS: {
            let entitiesId = [];
            return {
                ...state,
                entitiesId: _.uniq([
                    ...action.payload.entitiesId,
                    ...state.entitiesId
                ]),
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded: true
            };
        }

        case ChatParticipanteActions.GET_PARTICIPANTES_FAILED: {
            return {
                ...state,
                errors: action.payload,
                loading: false,
                loaded: false
            };
        }

        case ChatParticipanteActions.ADD_PARTICIPANTE: {
            return {
                ...state,
                errors: null,
                saving: true
            };
        }

        case ChatParticipanteActions.ADD_PARTICIPANTE_SUCCESS: {
            return {
                ...state,
                entitiesId: [
                    ...state.entitiesId.filter(id => id !== action.payload.id),
                    action.payload.id
                ],
                saving: false,
                errors: null
            };
        }

        case ChatParticipanteActions.ADD_PARTICIPANTE_FAILED: {
            return {
                ...state,
                errors: action.payload,
                saving: false
            };
        }

        case ChatParticipanteActions.UPDATE_PARTICIPANTE: {
            return {
                ...state,
                saving: true,
                errors: null
            };
        }

        case ChatParticipanteActions.UPDATE_PARTICIPANTE_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: null
            };
        }

        case ChatParticipanteActions.UPDATE_PARTICIPANTE_FAILED: {
            return {
                ...state,
                errors: action.payload,
                saving: false
            };
        }

        case ChatParticipanteActions.REMOVER_PARTICIPANTE: {
            return {
                ...state,
                deletingIds: [
                    ...state.deletingIds.filter(id => id !== action.payload.chatParticipante.id),
                    action.payload.chatParticipante.id
                ],
                errors: null,
                saving: true
            };
        }

        case ChatParticipanteActions.REMOVER_PARTICIPANTE_SUCCESS: {
            return {
                ...state,
                entitiesId: state.entitiesId.filter(id => id !== action.payload.chatParticipante.id),
                errors: null,
                saving: false,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.chatParticipante.id),
                deletedIds: [
                    ...state.deletedIds.filter(id => id !== action.payload.chatParticipante.id),
                    action.payload.chatParticipante.id
                ],
            };
        }

        case ChatParticipanteActions.REMOVER_PARTICIPANTE_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.chatParticipante.id),
                errors: action.payload.errors,
                saving: false
            };
        }

        case ChatParticipanteActions.UNLOAD_CHAT_PARTICIPANTES: {
            return {
                ...ChatParticipanteInitialState,
            };
        }

        case ChatParticipanteActions.CHAT_PARTICIPANTE_UPDATE_BROADCAST: {
            return {
                ...state,
                entitiesId: [
                    ...state.entitiesId.filter(id => id !== action.payload.chatParticipante.id),
                    action.payload.chatParticipante.id
                ],
            };
        }

        case ChatParticipanteActions.CHAT_PARTICIPANTE_LIMPAR_ERROS: {
            return {
                ...state,
                errors: null
            };
        }

        default:
            return state;
    }
}
