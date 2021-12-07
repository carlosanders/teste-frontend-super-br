import * as RelevanciaListActions from '../actions/relevancia-list.actions';
import * as _ from 'lodash';

export interface RelevanciaListState {
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

export const RelevanciaListInitialState: RelevanciaListState = {
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

export function RelevanciaListReducer(
    state = RelevanciaListInitialState,
    action: RelevanciaListActions.RelevanciaListActionsAll
): RelevanciaListState {
    switch (action.type) {

        case RelevanciaListActions.GET_RELEVANCIAS: {
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

        case RelevanciaListActions.GET_RELEVANCIAS_SUCCESS: {

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

        case RelevanciaListActions.RELOAD_RELEVANCIAS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case RelevanciaListActions.GET_RELEVANCIAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RelevanciaListActions.DELETE_RELEVANCIA: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.relevanciaId]
            };
        }

        case RelevanciaListActions.DELETE_RELEVANCIA_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case RelevanciaListActions.DELETE_RELEVANCIA_FAILED: {
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
