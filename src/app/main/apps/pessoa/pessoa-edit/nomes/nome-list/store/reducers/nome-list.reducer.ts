import * as NomeListActions from '../actions';

export interface NomeListState {
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

export const NomeListInitialState: NomeListState = {
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

export function NomeListReducer(
    state = NomeListInitialState,
    action: NomeListActions.NomeListActionsAll
): NomeListState {
    switch (action.type) {

        case NomeListActions.GET_NOMES: {
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

        case NomeListActions.GET_NOMES_SUCCESS: {

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

        case NomeListActions.RELOAD_NOMES: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case NomeListActions.GET_NOMES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case NomeListActions.DELETE_NOME: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case NomeListActions.DELETE_NOME_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case NomeListActions.DELETE_NOME_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}