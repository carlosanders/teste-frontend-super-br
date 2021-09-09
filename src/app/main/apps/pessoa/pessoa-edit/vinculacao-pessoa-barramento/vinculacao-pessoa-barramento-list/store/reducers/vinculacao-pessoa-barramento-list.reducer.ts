import * as VinculacaoPessoaBarramentoListActions from '../actions';

export interface VinculacaoPessoaBarramentoListState {
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

export const VinculacaoPessoaBarramentoListInitialState: VinculacaoPessoaBarramentoListState = {
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

export function VinculacaoPessoaBarramentoListReducer(
    state = VinculacaoPessoaBarramentoListInitialState,
    action: VinculacaoPessoaBarramentoListActions.VinculacaoPessoaBarramentoListActionsAll
): VinculacaoPessoaBarramentoListState {
    switch (action.type) {

        case VinculacaoPessoaBarramentoListActions.GET_VINCULACAO_PESSOA_BARRAMENTOS: {
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

        case VinculacaoPessoaBarramentoListActions.GET_VINCULACAO_PESSOA_BARRAMENTOS_SUCCESS: {

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

        case VinculacaoPessoaBarramentoListActions.RELOAD_VINCULACAO_PESSOA_BARRAMENTOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case VinculacaoPessoaBarramentoListActions.GET_VINCULACAO_PESSOA_BARRAMENTOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case VinculacaoPessoaBarramentoListActions.DELETE_VINCULACAO_PESSOA_BARRAMENTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.vinculacaoPessoaBarramentoId]
            };
        }

        case VinculacaoPessoaBarramentoListActions.DELETE_VINCULACAO_PESSOA_BARRAMENTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case VinculacaoPessoaBarramentoListActions.DELETE_VINCULACAO_PESSOA_BARRAMENTO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
