import * as CompartilhamentoListActions
    from 'app/main/apps/processo/processo-edit/tarefas/compartilhamento-list/store/actions';
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

        default:
            return state;
    }
}
