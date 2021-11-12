import * as NotificacaoListActions from '../actions';
import * as _ from 'lodash';

export interface NotificacaoListState {
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
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
    toggleLidaErrors: any;
}

export const NotificacaoListInitialState: NotificacaoListState = {
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
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {},
    toggleLidaErrors: {}
};

export function NotificacaoListReducer(
    state = NotificacaoListInitialState,
    action: NotificacaoListActions.NotificacaoListActionsAll
): NotificacaoListState {
    switch (action.type) {

        case NotificacaoListActions.GET_NOTIFICACOES: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case NotificacaoListActions.GET_NOTIFICACOES_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                deletingErrors: {},
                loading: false,
                loaded
            };
        }

        case NotificacaoListActions.UNLOAD_NOTIFICACOES: {
            return {
                ...NotificacaoListInitialState
            };
        }

        case NotificacaoListActions.RELOAD_NOTIFICACOES: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case NotificacaoListActions.GET_NOTIFICACOES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case NotificacaoListActions.DELETE_NOTIFICACAO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.notificacaoId]
            };
        }

        case NotificacaoListActions.DELETE_NOTIFICACAO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case NotificacaoListActions.DELETE_NOTIFICACAO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                }
            };
        }

        case NotificacaoListActions.TOGGLE_LIDA_NOTIFICACAO_SUCCESS: {
            return {
                ...state,
                toggleLidaErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case NotificacaoListActions.TOGGLE_LIDA_NOTIFICACAO_FAILED: {
            return {
                ...state,
                toggleLidaErrors: {
                    ...state.toggleLidaErrors,
                    ...action.payload
                }
            };
        }

        default:
            return state;
    }
}
