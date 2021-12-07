import * as GarantiaListActions from '../actions';
import * as _ from 'lodash';

export interface GarantiaListState {
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

export const GarantiaListInitialState: GarantiaListState = {
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

export function GarantiaListReducer(
    state = GarantiaListInitialState,
    action: GarantiaListActions.GarantiaListActionsAll
): GarantiaListState {
    switch (action.type) {

        case GarantiaListActions.GET_GARANTIAS: {
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

        case GarantiaListActions.GET_GARANTIAS_SUCCESS: {

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

        case GarantiaListActions.RELOAD_GARANTIAS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case GarantiaListActions.GET_GARANTIAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case GarantiaListActions.DELETE_GARANTIA: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.garantiaId]
            };
        }

        case GarantiaListActions.DELETE_GARANTIA_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case GarantiaListActions.DELETE_GARANTIA_FAILED: {
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
