import * as NotificacaoActions from '../actions';
import {Notificacao} from "../../../@cdk/models";

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
    snackbar: {
        exibir: boolean,
        notificacao: Notificacao
    };
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
    deletingIds: [],
    snackbar: {
        exibir: false,
        notificacao: null
    }
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

        case NotificacaoActions.SNACKBAR_EXIBIR_NOTIFICACAO: {
            const snackbar = {
                exibir:action.payload.exibir,
                notificacao: action.payload.notificacao ?? null
            };

            return {
                ...state,
                snackbar: snackbar
            };
        }

        default:
            return state;
    }
}
