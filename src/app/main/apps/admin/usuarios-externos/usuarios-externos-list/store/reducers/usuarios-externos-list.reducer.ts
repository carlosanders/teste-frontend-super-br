import * as UsuariosExternosListActions from '../actions';
import * as _ from 'lodash';

export interface UsuariosExternosListState {
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

export const UsuariosExternosListInitialState: UsuariosExternosListState = {
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
    deletingIds: [],
    deletingErrors: {}

};

export function UsuariosExternosListReducer(
    state = UsuariosExternosListInitialState,
    action: UsuariosExternosListActions.UsuariosExternosListActionsAll
): UsuariosExternosListState {
    switch (action.type) {

        case UsuariosExternosListActions.GET_USUARIOS_EXTERNOS_LIST: {
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

        case UsuariosExternosListActions.GET_USUARIOS_EXTERNOS_LIST_SUCCESS: {
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

        case UsuariosExternosListActions.GET_USUARIOS_EXTERNOS_LIST_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case UsuariosExternosListActions.UNLOAD_USUARIOS_EXTERNOS: {
            return {
                ...UsuariosExternosListInitialState
            };
        }

        case UsuariosExternosListActions.RELOAD_USUARIOS_EXTERNOS_LIST: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case UsuariosExternosListActions.DELETE_USUARIO_EXTERNOS_LIST: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case UsuariosExternosListActions.DELETE_USUARIO_EXTERNOS_LIST_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case UsuariosExternosListActions.DELETE_USUARIO_EXTERNOS_LIST_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== parseInt(Object.keys(action.payload)[0])),
                deletingErrors: {
                    ...state.deletingErrors,
                    ...action.payload
                }
            };
        }

        default:
            return state;
    }
}
