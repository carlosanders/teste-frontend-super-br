import * as _ from 'lodash';
import * as CompartilhamentoRemoveBlocoActions from '../actions/compartilhamento-remove-bloco.actions';

export interface CompartilhamentoRemoveBlocoState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        sort: any;
        total: number;
        context: any;
    };
    deletingIds: number[];
    deletedIds: number[];
    loaded: any;
    loading: boolean;
    error?: any;
    errorDelete: number[];
    deletingErrors: any;
}

export const CompartilhamentoCreateInitialState: CompartilhamentoRemoveBlocoState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
        context: {}
    },
    deletedIds: [],
    deletingIds: [],
    loaded: false,
    loading: false,
    error: null,
    errorDelete: [],
    deletingErrors: {}
};

export function CompartilhamentoRemoveBlocoReducer(
    state = CompartilhamentoCreateInitialState, action: CompartilhamentoRemoveBlocoActions.CompartilhamentoBlocoRemoveActionsAll
): CompartilhamentoRemoveBlocoState {
    switch (action.type) {

        case CompartilhamentoRemoveBlocoActions.GET_COMPARTILHAMENTOS: {
            return {
                ...state,
                entitiesId: [],
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total,
                    context: action.payload.context
                },
                loading: true,
                error: null,
                deletingErrors: {},
                errorDelete: [],
                deletedIds: [],
                deletingIds: [],
            };
        }

        case CompartilhamentoRemoveBlocoActions.GET_COMPARTILHAMENTOS_SUCCESS: {
            return {
                ...state,
                entitiesId: [...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded: action.payload.loaded ?? state.loading,
            };
        }

        case CompartilhamentoRemoveBlocoActions.GET_COMPARTILHAMENTOS_FAILED: {
            return {
                ...state,
                error: action.payload
            };
        }

        case CompartilhamentoRemoveBlocoActions.DELETE_COMPARTILHAMENTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.compartilhamentoId]
            };
        }

        case CompartilhamentoRemoveBlocoActions.DELETE_COMPARTILHAMENTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.compartilhamentoId),
                deletedIds: [...state.deletedIds, action.payload.compartilhamentoId],
                deletingErrors: _.omit(state.deletingErrors, [action.payload.compartilhamentoId]),
                errorDelete: [],
                error: null
            };
        }

        case CompartilhamentoRemoveBlocoActions.DELETE_COMPARTILHAMENTO_FAILED: {
            return {
                ...state,
                errorDelete: [...state.errorDelete, action.payload.id],
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                },
                error: action.payload.error
            };
        }

        case CompartilhamentoRemoveBlocoActions.UNLOAD_COMPARTILHAMENTOS: {
            return {
                ...CompartilhamentoCreateInitialState
            };
        }


        default:
            return state;
    }
}
