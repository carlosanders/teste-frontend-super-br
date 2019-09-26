import * as AfastamentoListActions from '../actions';

export interface AfastamentoListState {
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

export const AfastamentoListInitialState: AfastamentoListState = {
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

export function AfastamentoListReducer(
    state = AfastamentoListInitialState,
    action: AfastamentoListActions.AfastamentoListActionsAll
): AfastamentoListState {
    switch (action.type) {

        case AfastamentoListActions.GET_AFASTAMENTOS: {
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

        case AfastamentoListActions.GET_AFASTAMENTOS_SUCCESS: {

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

        case AfastamentoListActions.RELOAD_AFASTAMENTOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AfastamentoListActions.GET_AFASTAMENTOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AfastamentoListActions.DELETE_AFASTAMENTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case AfastamentoListActions.DELETE_AFASTAMENTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case AfastamentoListActions.DELETE_AFASTAMENTO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
