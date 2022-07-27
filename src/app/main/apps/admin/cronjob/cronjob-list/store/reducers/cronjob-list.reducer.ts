import * as CronjobListActions from '../actions';
import * as _ from 'lodash'

export interface CronjobListState {
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
    executingIds: number[];
}

export const CronjobListInitialState: CronjobListState = {
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
    deletingErrors: {},
    executingIds: []
};

export function CronjobListReducer(
    state = CronjobListInitialState,
    action: CronjobListActions.CronjobListActionsAll
): CronjobListState {
    switch (action.type) {

        case CronjobListActions.GET_CRONJOB: {
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

        case CronjobListActions.GET_CRONJOB_SUCCESS: {
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

        case CronjobListActions.GET_CRONJOB_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case CronjobListActions.UNLOAD_CRONJOB: {
            return {
                ...CronjobListInitialState
            };
        }

        case CronjobListActions.RELOAD_CRONJOB: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case CronjobListActions.DELETE_CRONJOB: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.cronjobId]
            };
        }

        case CronjobListActions.DELETE_CRONJOB_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case CronjobListActions.DELETE_CRONJOB_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                }
            };
        }

        case CronjobListActions.EXECUTE_CRONJOB: {
            return {
                ...state,
                executingIds: [...state.executingIds, action.payload]
            };
        }

        case CronjobListActions.EXECUTE_CRONJOB_SUCCESS: {
            return {
                ...state,
                executingIds: state.executingIds.filter(id => id !== action.payload),
            };
        }

        case CronjobListActions.EXECUTE_CRONJOB_FAILED: {
            return {
                ...state,
                executingIds:  state.executingIds.filter(id => id !== action.payload),
            };
        }

        default:
            return state;
    }
}
