import * as UsuarioListActions from '../actions';

export interface UsuarioListState {
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

export const UsuarioListInitialState: UsuarioListState = {
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

export function UsuarioListReducer(
    state = UsuarioListInitialState,
    action: UsuarioListActions.UsuarioListActionsAll
): UsuarioListState {
    switch (action.type) {

        case UsuarioListActions.GET_USUARIOS: {
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

        case UsuarioListActions.GET_USUARIOS_SUCCESS: {
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

        case UsuarioListActions.GET_USUARIOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case UsuarioListActions.RELOAD_USUARIOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case UsuarioListActions.DELETE_USUARIO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case UsuarioListActions.DELETE_USUARIO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case UsuarioListActions.DELETE_USUARIO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}