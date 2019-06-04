import * as RepositorioListActions from '../actions';

export interface RepositorioListState {
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

export const RepositorioListInitialState: RepositorioListState = {
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

export function RepositorioListReducer(
    state = RepositorioListInitialState,
    action: RepositorioListActions.RepositorioListActionsAll
): RepositorioListState {
    switch (action.type) {

        case RepositorioListActions.GET_REPOSITORIOS: {
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

        case RepositorioListActions.GET_REPOSITORIOS_SUCCESS: {

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

        case RepositorioListActions.RELOAD_REPOSITORIOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RepositorioListActions.GET_REPOSITORIOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RepositorioListActions.DELETE_REPOSITORIO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case RepositorioListActions.DELETE_REPOSITORIO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case RepositorioListActions.DELETE_REPOSITORIO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}