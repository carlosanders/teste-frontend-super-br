import * as VinculacaoPessoaUsuarioListActions from '../actions';

export interface VinculacaoPessoaUsuarioListState {
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
}

export const VinculacaoPessoaUsuarioListInitialState: VinculacaoPessoaUsuarioListState = {
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
    deletingIds: []
};

export function VinculacaoPessoaUsuarioListReducer(
    state = VinculacaoPessoaUsuarioListInitialState,
    action: VinculacaoPessoaUsuarioListActions.VinculacaoPessoaUsuarioListActionsAll
): VinculacaoPessoaUsuarioListState {
    switch (action.type) {

        case VinculacaoPessoaUsuarioListActions.GET_VINCULACAO_PESSOA_USUARIO: {
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

        case VinculacaoPessoaUsuarioListActions.GET_VINCULACAO_PESSOA_USUARIO_SUCCESS: {
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

        case VinculacaoPessoaUsuarioListActions.GET_VINCULACAO_PESSOA_USUARIO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case VinculacaoPessoaUsuarioListActions.RELOAD_VINCULACAO_PESSOA_USUARIO: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case VinculacaoPessoaUsuarioListActions.DELETE_VINCULACAO_PESSOA_USUARIO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case VinculacaoPessoaUsuarioListActions.DELETE_VINCULACAO_PESSOA_USUARIO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case VinculacaoPessoaUsuarioListActions.DELETE_VINCULACAO_PESSOA_USUARIO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}