import * as RepositoriosListActions from '../actions';

export interface RepositoriosListState {
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
}

export const RepositoriosListInitialState: RepositoriosListState = {
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
    deletingIds: []
};

export function RepositoriosListReducer(
    state = RepositoriosListInitialState,
    action: RepositoriosListActions.RepositoriosListActionsAll
): RepositoriosListState {
    switch (action.type) {

        case RepositoriosListActions.GET_REPOSITORIOS: {
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

        case RepositoriosListActions.GET_REPOSITORIOS_SUCCESS: {

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

        case RepositoriosListActions.RELOAD_REPOSITORIOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RepositoriosListActions.GET_REPOSITORIOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RepositoriosListActions.DELETE_REPOSITORIO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case RepositoriosListActions.DELETE_REPOSITORIO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case RepositoriosListActions.DELETE_REPOSITORIO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
