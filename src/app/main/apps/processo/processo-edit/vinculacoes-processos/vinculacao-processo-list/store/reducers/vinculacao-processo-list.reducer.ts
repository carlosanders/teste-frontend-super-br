import * as VinculacaoProcessoListActions from '../actions';

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
    deletingIds: []
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
                loading: false,
                loaded
            };
        }

        case VinculacaoProcessoListActions.RELOAD_VINCULACOES_PROCESSOS: {
            return {
                ...state,
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
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case VinculacaoProcessoListActions.DELETE_VINCULACAO_PROCESSO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case VinculacaoProcessoListActions.DELETE_VINCULACAO_PROCESSO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
