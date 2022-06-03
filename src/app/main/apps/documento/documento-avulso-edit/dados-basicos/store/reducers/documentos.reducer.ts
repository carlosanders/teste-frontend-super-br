import * as DocumentosActions from '../actions/documentos.actions';

export interface DocumentosState {
    documentosId: number[];
    selectedDocumentosId: number[];
    alterandoDocumentoIds: number[];
    pagination: {
        limit: number;
        offset: number;
        total: number;
    };
    loading: boolean;
    loaded: any;
}

export const documentosInitialState: DocumentosState = {
    documentosId: [],
    selectedDocumentosId: [],
    alterandoDocumentoIds: [],
    pagination: {
        limit: 0,
        offset: 0,
        total: 0,
    },
    loading: false,
    loaded: false
};

export const documentosReducer = (
    state = documentosInitialState,
    action: DocumentosActions.DocumentosActionsAll
): DocumentosState => {
    switch (action.type) {

        case DocumentosActions.GET_DOCUMENTOS: {
            return {
                ...state,
                loading: true,
                pagination: action.payload,
            };
        }

        case DocumentosActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: [...state.documentosId, ...action.payload.entitiesId],
                loaded: action.payload.loaded,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false
            };
        }

        case DocumentosActions.GET_DOCUMENTOS_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case DocumentosActions.CHANGE_SELECTED_DOCUMENTOS: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        case DocumentosActions.UPDATE_DOCUMENTO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload.documento.id],
                loaded: false,
            };
        }

        case DocumentosActions.UPDATE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                loaded: true,
            };
        }

        case DocumentosActions.UPDATE_DOCUMENTO_FAILED: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                loaded: false,
            };
        }

        case DocumentosActions.UNLOAD_DOCUMENTOS: {
            return {
                ...documentosInitialState
            };
        }

        default:
            return state;

    }
};
