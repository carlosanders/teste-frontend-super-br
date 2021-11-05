import * as CompartilhamentoListActions
    from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-list/store/actions';
import * as _ from 'lodash';

export interface CompartilhamentoListState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
    bufferingDelete: number;
    error: any;
    errorDelete: number[];
}

export const CompartilhamentoListInitialState: CompartilhamentoListState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    bufferingDelete: 0,
    error: null,
    errorDelete: [],
    deletingErrors: {}
};

export function CompartilhamentoListReducer(state = CompartilhamentoListInitialState, action: CompartilhamentoListActions.CompartilhamentoListActionsAll): CompartilhamentoListState {
    switch (action.type) {

        case CompartilhamentoListActions.GET_COMPARTILHAMENTOS: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case CompartilhamentoListActions.GET_COMPARTILHAMENTOS_SUCCESS: {

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

        case CompartilhamentoListActions.UNLOAD_COMPARTILHAMENTOS: {
            return {
                ...CompartilhamentoListInitialState
            };
        }

        case CompartilhamentoListActions.GET_COMPARTILHAMENTOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case CompartilhamentoListActions.DELETE_COMPARTILHAMENTO: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload.compartilhamentoId);
            return {
                ...state,
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                deletingIds: [...state.deletingIds, action.payload.compartilhamentoId]
            };
        }

        case CompartilhamentoListActions.DELETE_COMPARTILHAMENTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload]),
                errorDelete: [],
                error: null
            };
        }

        case CompartilhamentoListActions.DELETE_COMPARTILHAMENTO_FAILED: {
            return {
                ...state,
                errorDelete: [...state.errorDelete, action.payload.id],
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                },
                entitiesId: [...state.entitiesId, action.payload.id],
                error: action.payload.error
            };
        }

        case CompartilhamentoListActions.DELETE_COMPARTILHAMENTO_CANCEL: {
            return {
                ...state,
                deletingIds: [],
                bufferingDelete: state.bufferingDelete + 1,
                errorDelete: [],
                error: null
            };
        }

        case CompartilhamentoListActions.DELETE_COMPARTILHAMENTO_FLUSH: {
            return {
                ...state,
                bufferingDelete: state.bufferingDelete + 1
            };
        }

        case CompartilhamentoListActions.DELETE_COMPARTILHAMENTO_CANCEL_SUCCESS: {
            return {
                ...state,
                entitiesId: [...state.entitiesId, action.payload],
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total + 1
                },
            };
        }

        default:
            return state;
    }
}
