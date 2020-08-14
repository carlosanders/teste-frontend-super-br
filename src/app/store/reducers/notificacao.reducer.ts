import * as NotificacaoActions from '../actions';

export interface NotificacaoState {
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
}

export const NotificacaoInitialState: NotificacaoState = {
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
    deletingIds: []
};

export function NotificacaoReducer(
    state = NotificacaoInitialState,
    action: NotificacaoActions.NotificacaoActionsAll
): NotificacaoState {
    switch (action.type) {

        case NotificacaoActions.GET_NOTIFICACOES: {
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

        case NotificacaoActions.GET_NOTIFICACOES_SUCCESS: {
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

        case NotificacaoActions.GET_NOTIFICACOES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case NotificacaoActions.TOGGLE_LIDA_NOTIFICACAO: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case NotificacaoActions.TOGGLE_LIDA_NOTIFICACAO_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true
            };
        }

        case NotificacaoActions.TOGGLE_LIDA_NOTIFICACAO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case NotificacaoActions.RELOAD_NOTIFICACOES: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }
}
