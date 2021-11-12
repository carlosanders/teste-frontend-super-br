import * as GrupoContatoListActions from '../actions';
import * as _ from 'lodash';

export interface GrupoContatoListState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        sort: any;
        total: number;
        context: any;
    };
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
}

export const GrupoContatoListInitialState: GrupoContatoListState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
        context: {}
    },
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
};

export function GrupoContatoListReducer(
    state = GrupoContatoListInitialState,
    action: GrupoContatoListActions.GrupoContatoListActionsAll
): GrupoContatoListState {
    switch (action.type) {

        case GrupoContatoListActions.GET_GRUPO_CONTATOS: {
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
                    total: state.pagination.total,
                    context: action.payload.context
                }
            };
        }

        case GrupoContatoListActions.GET_GRUPO_CONTATOS_SUCCESS: {

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

        case GrupoContatoListActions.UNLOAD_GRUPO_CONTATOS: {
            return {
                ...GrupoContatoListInitialState
            };
        }

        case GrupoContatoListActions.RELOAD_GRUPO_CONTATOS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case GrupoContatoListActions.GET_GRUPO_CONTATOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case GrupoContatoListActions.DELETE_GRUPO_CONTATO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.grupoContatoId]
            };
        }

        case GrupoContatoListActions.DELETE_GRUPO_CONTATO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case GrupoContatoListActions.DELETE_GRUPO_CONTATO_FAILED: {
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
