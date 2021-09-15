import * as AfastamentosListActions from '../actions';

export interface AfastamentosListState {
    entitiesId: number[];
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
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
}

export const AfastamentosListInitialState: AfastamentosListState = {
    entitiesId: [],
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
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
};

export function AfastamentosListReducer(
    state = AfastamentosListInitialState,
    action: AfastamentosListActions.AfastamentosListActionsAll
): AfastamentosListState {
    switch (action.type) {

        case AfastamentosListActions.GET_AFASTAMENTOS: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    context: action.payload.context,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case AfastamentosListActions.GET_AFASTAMENTOS_SUCCESS: {

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

        case AfastamentosListActions.RELOAD_AFASTAMENTOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AfastamentosListActions.GET_AFASTAMENTOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AfastamentosListActions.DELETE_AFASTAMENTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.afastamentoId]
            };
        }

        case AfastamentosListActions.DELETE_AFASTAMENTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case AfastamentosListActions.DELETE_AFASTAMENTO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
