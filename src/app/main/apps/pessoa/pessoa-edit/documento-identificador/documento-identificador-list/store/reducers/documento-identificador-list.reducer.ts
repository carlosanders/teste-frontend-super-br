import * as DocumentoIdentificadorListActions from '../actions';
import * as _ from 'lodash';

export interface DocumentoIdentificadorListState {
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

export const DocumentoIdentificadorListInitialState: DocumentoIdentificadorListState = {
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

export function DocumentoIdentificadorListReducer(
    state = DocumentoIdentificadorListInitialState,
    action: DocumentoIdentificadorListActions.DocumentoIdentificadorListActionsAll
): DocumentoIdentificadorListState {
    switch (action.type) {

        case DocumentoIdentificadorListActions.GET_DOCUMENTO_IDENTIFICADOR: {
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

        case DocumentoIdentificadorListActions.GET_DOCUMENTO_IDENTIFICADOR_SUCCESS: {

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

        case DocumentoIdentificadorListActions.RELOAD_DOCUMENTO_IDENTIFICADOR: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case DocumentoIdentificadorListActions.GET_DOCUMENTO_IDENTIFICADOR_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case DocumentoIdentificadorListActions.DELETE_DOCUMENTO_IDENTIFICADOR: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.documentoIdentificadorId]
            };
        }

        case DocumentoIdentificadorListActions.DELETE_DOCUMENTO_IDENTIFICADOR_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case DocumentoIdentificadorListActions.DELETE_DOCUMENTO_IDENTIFICADOR_FAILED: {
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
