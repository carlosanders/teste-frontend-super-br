import * as VinculacaoUsuarioListActions from '../actions';

export interface VinculacaoUsuarioListState {
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

export const VinculacaoUsuarioListInitialState: VinculacaoUsuarioListState = {
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

export function VinculacaoUsuarioListReducer(
    state = VinculacaoUsuarioListInitialState,
    action: VinculacaoUsuarioListActions.VinculacaoUsuarioListActionsAll
): VinculacaoUsuarioListState {
    switch (action.type) {

        case VinculacaoUsuarioListActions.GET_VINCULACOES_USUARIOS: {
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

        case VinculacaoUsuarioListActions.GET_VINCULACOES_USUARIOS_SUCCESS: {

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

        case VinculacaoUsuarioListActions.RELOAD_VINCULACOES_USUARIOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case VinculacaoUsuarioListActions.GET_VINCULACOES_USUARIOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case VinculacaoUsuarioListActions.DELETE_VINCULACAO_USUARIO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case VinculacaoUsuarioListActions.DELETE_VINCULACAO_USUARIO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case VinculacaoUsuarioListActions.DELETE_VINCULACAO_USUARIO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}