import * as NumeroUnicoDocumentoListActions from '../actions';
import * as _ from 'lodash';

export interface NumeroUnicoDocumentoListState {
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

export const NumeroUnicoDocumentoListInitialState: NumeroUnicoDocumentoListState = {
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

export function NumeroUnicoDocumentoListReducer(
    state = NumeroUnicoDocumentoListInitialState,
    action: NumeroUnicoDocumentoListActions.NumeroUnicoDocumentoListActionsAll
): NumeroUnicoDocumentoListState {
    switch (action.type) {

        case NumeroUnicoDocumentoListActions.GET_NUMEROS_UNICOS_DOCUMENTOS: {
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

        case NumeroUnicoDocumentoListActions.GET_NUMEROS_UNICOS_DOCUMENTOS_SUCCESS: {

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

        case NumeroUnicoDocumentoListActions.UNLOAD_NUMEROS_UNICOS_DOCUMENTOS: {
            return {
                ...NumeroUnicoDocumentoListInitialState
            };
        }

        case NumeroUnicoDocumentoListActions.RELOAD_NUMEROS_UNICOS_DOCUMENTOS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case NumeroUnicoDocumentoListActions.GET_NUMEROS_UNICOS_DOCUMENTOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case NumeroUnicoDocumentoListActions.DELETE_NUMERO_UNICO_DOCUMENTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.numeroUnicoDocumentoId]
            };
        }

        case NumeroUnicoDocumentoListActions.DELETE_NUMERO_UNICO_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case NumeroUnicoDocumentoListActions.DELETE_NUMERO_UNICO_DOCUMENTO_FAILED: {
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
