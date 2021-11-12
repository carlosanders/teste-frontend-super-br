import * as AfastamentoListActions from '../actions';
import * as _ from 'lodash';

export interface AfastamentoListState {
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

export const AfastamentoListInitialState: AfastamentoListState = {
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

export function AfastamentoListReducer(
    state = AfastamentoListInitialState,
    action: AfastamentoListActions.AfastamentoListActionsAll
): AfastamentoListState {
    switch (action.type) {

        case AfastamentoListActions.GET_AFASTAMENTOS: {
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

        case AfastamentoListActions.GET_AFASTAMENTOS_SUCCESS: {

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

        case AfastamentoListActions.UNLOAD_AFASTAMENTOS: {
            return {
                ...AfastamentoListInitialState
            };
        }


        case AfastamentoListActions.RELOAD_AFASTAMENTOS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case AfastamentoListActions.GET_AFASTAMENTOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AfastamentoListActions.DELETE_AFASTAMENTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.afastamentoId]
            };
        }

        case AfastamentoListActions.DELETE_AFASTAMENTO_SUCCESS: {

            console.log(state);

            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case AfastamentoListActions.DELETE_AFASTAMENTO_FAILED: {
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
