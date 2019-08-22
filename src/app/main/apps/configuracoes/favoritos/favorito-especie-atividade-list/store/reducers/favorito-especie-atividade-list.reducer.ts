import * as FavoritoListActions from '../actions';

export interface FavoritoListState {
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
    saving: boolean;
    errors: any;
}

export const FavoritoListInitialState: FavoritoListState = {
    saving: false,
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
    errors: false
};

export function FavoritoEspecieAtividadeListReducer(
    state = FavoritoListInitialState,
    action: FavoritoListActions.FavoritoListActionsAll
): FavoritoListState {
    switch (action.type) {

        case FavoritoListActions.GET_FAVORITOS: {
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

        case FavoritoListActions.GET_FAVORITOS_SUCCESS: {

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

        case FavoritoListActions.RELOAD_FAVORITOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case FavoritoListActions.GET_FAVORITOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case FavoritoListActions.DELETE_FAVORITO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case FavoritoListActions.DELETE_FAVORITO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case FavoritoListActions.DELETE_FAVORITO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }


        case FavoritoListActions.SAVE_FAVORITO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case FavoritoListActions.SAVE_FAVORITO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case FavoritoListActions.SAVE_FAVORITO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
