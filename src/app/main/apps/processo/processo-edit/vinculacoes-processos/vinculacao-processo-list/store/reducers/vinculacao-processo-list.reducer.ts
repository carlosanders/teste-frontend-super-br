import * as VinculacaoProcessoListActions from '../actions';
import * as _ from 'lodash';

export interface VinculacaoProcessoListState {
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

export const VinculacaoProcessoListInitialState: VinculacaoProcessoListState = {
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

export function VinculacaoProcessoListReducer(
    state = VinculacaoProcessoListInitialState,
    action: VinculacaoProcessoListActions.VinculacaoProcessoListActionsAll
): VinculacaoProcessoListState {
    switch (action.type) {

        case VinculacaoProcessoListActions.GET_VINCULACOES_PROCESSOS: {
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

        case VinculacaoProcessoListActions.GET_VINCULACOES_PROCESSOS_SUCCESS: {

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

        case VinculacaoProcessoListActions.RELOAD_VINCULACOES_PROCESSOS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case VinculacaoProcessoListActions.GET_VINCULACOES_PROCESSOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case VinculacaoProcessoListActions.DELETE_VINCULACAO_PROCESSO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.vinculacaoProcessoId]
            };
        }

        case VinculacaoProcessoListActions.DELETE_VINCULACAO_PROCESSO_SUCCESS: {
            return {
                ...state,
                entitiesId: state.entitiesId.filter((id) => id !== action.payload),
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case VinculacaoProcessoListActions.DELETE_VINCULACAO_PROCESSO_FAILED: {
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
