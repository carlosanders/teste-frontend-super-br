import * as FavoritoListActions from '../actions';
import * as _ from 'lodash';

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
    deletingErrors: any;
}

export const FavoritoListInitialState: FavoritoListState = {
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
    deletingErrors: {}
};

export function FavoritoListReducer(
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
                deletingErrors: {},
                loading: false,
                loaded
            };
        }

        case FavoritoListActions.RELOAD_FAVORITOS: {
            return {
                ...state,
                deletingErrors: {},
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
                deletingIds: [...state.deletingIds, action.payload.favoritoId]
            };
        }

        case FavoritoListActions.DELETE_FAVORITO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case FavoritoListActions.DELETE_FAVORITO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                }
            };
        }

        default:
            return state;
    }
}
