import * as DocumentosActions from '../actions/documentos.actions';

export interface DocumentosState {
    documentosId: number[];
    documentosLoaded: any;
    convertendoDocumentoIds: number[];
    loading: boolean;
    loaded: boolean;

}

export const DocumentosInitialState: DocumentosState = {
    documentosId: [],
    documentosLoaded: false,
    convertendoDocumentoIds: [],
    loading: false,
    loaded: false,
};

export function DocumentosReducer(
    state = DocumentosInitialState,
    action: DocumentosActions.DocumentosActionsAll
): DocumentosState {
    switch (action.type) {
        case DocumentosActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
            };
        }

        case DocumentosActions.COMPLETE_DOCUMENTO: {
            return {
                ...state,
                documentosId: [...state.documentosId, action.payload.id],
            };
        }

        case DocumentosActions.CONVERTE_DOCUMENTO: {
            return {
                ...state,
                convertendoDocumentoIds: [...state.convertendoDocumentoIds, action.payload],
            };
        }
        case DocumentosActions.CONVERTE_DOCUMENTO_SUCESS: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }
        case DocumentosActions.CONVERTE_DOCUMENTO_FAILED: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }
        default:
            return state;
    }
}
