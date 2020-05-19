import * as DocumentosComplementaresActions from '../actions/documentos-complementar.actions';

export interface DocumentosComplementaresState {
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    assinandoDocumentoIds: number[];
    convertendoDocumentoIds: number[];
    loading: boolean;
    loaded: boolean;
}

export const DocumentosComplementaresInitialState: DocumentosComplementaresState = {
    documentosId: [],
    documentosLoaded: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    assinandoDocumentoIds: [],
    convertendoDocumentoIds: [],
    loading: false,
    loaded: false,
};

export function DocumentosComplementaresReducer(
    state = DocumentosComplementaresInitialState,
    action: DocumentosComplementaresActions.DocumentosComplementaresActionsAll
): DocumentosComplementaresState {
    switch (action.type) {
        case DocumentosComplementaresActions.GET_DOCUMENTOS_COMPLEMENTARES_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
            };
        }

        default:
            return state;
    }
}
