import * as RepresentanteListActions
    from '../actions';
import * as _ from 'lodash';

export interface RepresentanteListState {
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

export const RepresentanteListInitialState: RepresentanteListState = {
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

export function RepresentanteListReducer(state = RepresentanteListInitialState, action: RepresentanteListActions.RepresentanteListActionsAll): RepresentanteListState {
    switch (action.type) {

        case RepresentanteListActions.GET_REPRESENTANTES: {
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

        case RepresentanteListActions.GET_REPRESENTANTES_SUCCESS: {

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

        case RepresentanteListActions.RELOAD_REPRESENTANTES: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case RepresentanteListActions.GET_REPRESENTANTES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RepresentanteListActions.DELETE_REPRESENTANTE: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.representanteId]
            };
        }

        case RepresentanteListActions.DELETE_REPRESENTANTE_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case RepresentanteListActions.DELETE_REPRESENTANTE_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                }
            };
        }

        case RepresentanteListActions.UNLOAD_REPRESENTANTES: {
            return {
                ...RepresentanteListInitialState
            };
        }

        default:
            return state;
    }
}
