import * as DocumentoAvulsoListActions from '../actions';
import * as _ from 'lodash';

export interface DocumentoAvulsoListState {
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
    respondendoIds: number[];
}

export const DocumentoAvulsoListInitialState: DocumentoAvulsoListState = {
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
    deletingErrors: {},
    respondendoIds: []
};

export function DocumentoAvulsoListReducer(
    state = DocumentoAvulsoListInitialState,
    action: DocumentoAvulsoListActions.DocumentoAvulsoListActionsAll
): DocumentoAvulsoListState {
    switch (action.type) {

        case DocumentoAvulsoListActions.GET_DOCUMENTOS_AVULSOS: {
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

        case DocumentoAvulsoListActions.GET_DOCUMENTOS_AVULSOS_SUCCESS: {

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

        case DocumentoAvulsoListActions.RELOAD_DOCUMENTOS_AVULSOS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case DocumentoAvulsoListActions.GET_DOCUMENTOS_AVULSOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case DocumentoAvulsoListActions.DELETE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.documentoAvulsoId]
            };
        }

        case DocumentoAvulsoListActions.DELETE_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])

            };
        }

        case DocumentoAvulsoListActions.DELETE_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                }
            };
        }

        case DocumentoAvulsoListActions.RESPONDER_DOCUMENTO_AVULSO: {
            return {
                ...state,
                respondendoIds: action.payload
            };
        }

        default:
            return state;
    }
}
