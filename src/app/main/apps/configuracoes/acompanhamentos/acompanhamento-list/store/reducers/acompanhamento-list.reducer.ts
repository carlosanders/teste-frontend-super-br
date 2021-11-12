import * as AcompanhamentoListActions from '../actions';
import * as _ from 'lodash';

export interface AcompanhamentoListState {
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

export const AcompanhamentoListInitialState: AcompanhamentoListState = {
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

export function AcompanhamentoListReducer(
    state = AcompanhamentoListInitialState,
    action: AcompanhamentoListActions.AcompanhamentoListActionsAll
): AcompanhamentoListState {
    switch (action.type) {

        case AcompanhamentoListActions.GET_ACOMPANHAMENTOS: {
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

        case AcompanhamentoListActions.GET_ACOMPANHAMENTOS_SUCCESS: {

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


        case AcompanhamentoListActions.UNLOAD_ACOMPANHAMENTOS: {
            return {
                ...AcompanhamentoListInitialState
            };
        }

        case AcompanhamentoListActions.RELOAD_ACOMPANHAMENTOS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case AcompanhamentoListActions.GET_ACOMPANHAMENTOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AcompanhamentoListActions.DELETE_ACOMPANHAMENTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.acompanhamentoId]
            };
        }

        case AcompanhamentoListActions.DELETE_ACOMPANHAMENTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case AcompanhamentoListActions.DELETE_ACOMPANHAMENTO_FAILED: {
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
