import * as DocumentoAvulsoListActions from '../actions';

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
    deletingIds: []
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
                loading: false,
                loaded
            };
        }

        case DocumentoAvulsoListActions.RELOAD_DOCUMENTOS_AVULSOS: {
            return {
                ...state,
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
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case DocumentoAvulsoListActions.DELETE_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case DocumentoAvulsoListActions.DELETE_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
