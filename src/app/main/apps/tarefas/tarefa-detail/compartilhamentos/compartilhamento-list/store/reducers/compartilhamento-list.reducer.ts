import * as CompartilhamentoListActions from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-list/store/actions';

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
    deletingIds: []
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
                loading: false,
                loaded
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
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case CompartilhamentoListActions.DELETE_COMPARTILHAMENTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case CompartilhamentoListActions.DELETE_COMPARTILHAMENTO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
