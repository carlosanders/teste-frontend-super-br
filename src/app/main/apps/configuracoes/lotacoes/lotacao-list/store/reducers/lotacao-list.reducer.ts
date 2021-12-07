import * as LotacaoListActions from '../actions';
import * as _ from 'lodash';

export interface LotacaoListState {
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

export const LotacaoListInitialState: LotacaoListState = {
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

export function LotacaoListReducer(
    state = LotacaoListInitialState,
    action: LotacaoListActions.LotacaoListActionsAll
): LotacaoListState {
    switch (action.type) {

        case LotacaoListActions.GET_LOTACOES: {
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

        case LotacaoListActions.GET_LOTACOES_SUCCESS: {

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

        case LotacaoListActions.UNLOAD_LOTACOES: {
            return {
                ...LotacaoListInitialState
            };
        }



        case LotacaoListActions.RELOAD_LOTACOES: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case LotacaoListActions.GET_LOTACOES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case LotacaoListActions.DELETE_LOTACAO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.lotacaoId]
            };
        }

        case LotacaoListActions.DELETE_LOTACAO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case LotacaoListActions.DELETE_LOTACAO_FAILED: {
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
