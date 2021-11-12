import * as UsuariosListActions from '../actions';
import * as _ from 'lodash';

export interface UsuariosListState {
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
}

export const UsuariosListInitialState: UsuariosListState = {
    entitiesId: [],
    pagination: {
        limit: 10,
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
    deletingErrors: {}
};

export function UsuariosListReducer(
    state = UsuariosListInitialState,
    action: UsuariosListActions.TarefaActionsAll | UsuariosListActions.UsuariosListActionsAll
): UsuariosListState {
    switch (action.type) {

        case UsuariosListActions.GET_USUARIOS: {
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

        case UsuariosListActions.GET_USUARIOS_SUCCESS: {
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

        case UsuariosListActions.GET_USUARIOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case UsuariosListActions.UNLOAD_USUARIOS: {
            return {
                ...UsuariosListInitialState
            };
        }

        case UsuariosListActions.RELOAD_USUARIOS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case UsuariosListActions.RESET_SENHA: {
            return {
                ...state,
                loading: true
            };
        }

        case UsuariosListActions.RESET_SENHA_SUCCESS: {
            return {
                ...state,
                loading: false
            };
        }

        case UsuariosListActions.RESET_SENHA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case UsuariosListActions.DELETE_USUARIO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.usuarioId]
            };
        }

        case UsuariosListActions.DELETE_USUARIO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case UsuariosListActions.DELETE_USUARIO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                }
            };
        }

        case UsuariosListActions.DISTRIBUIR_TAREFAS_USUARIO: {
            return {
                ...state,
                loading: true
            };
        }

        case UsuariosListActions.DISTRIBUIR_TAREFAS_USUARIO_SUCCESS: {
            return {
                ...state,
                loading: false
            };
        }

        case UsuariosListActions.DISTRIBUIR_TAREFAS_USUARIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
