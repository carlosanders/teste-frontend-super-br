import * as DocumentoAvulsoResponderActions from '../actions/responder.actions';

export interface DocumentoAvulsoResponderState {
    documentoAvulsoId: number;
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    assinandoDocumentoIds: number[];
    convertendoDocumentoIds: number[];
    convertendoDocumentoHtmlIds: number[];
    removendoAssinaturaDocumentoIds: number[];
    loading: boolean;
    loaded: any;
    saving: boolean;
    errors: any;
}

export const DocumentoAvulsoResponderInitialState: DocumentoAvulsoResponderState = {
    documentoAvulsoId: null,
    documentosId: [],
    documentosLoaded: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    assinandoDocumentoIds: [],
    convertendoDocumentoIds: [],
    convertendoDocumentoHtmlIds: [],
    removendoAssinaturaDocumentoIds: [],
    loading: false,
    loaded: false,
    saving: false,
    errors: false,
};

export function DocumentoAvulsoResponderReducer(
    state = DocumentoAvulsoResponderInitialState,
    action: DocumentoAvulsoResponderActions.ResponderActionsAll
): DocumentoAvulsoResponderState {
    switch (action.type) {

        case DocumentoAvulsoResponderActions.GET_DOCUMENTO_AVULSO: {
            return {
                ...state,
                documentoAvulsoId: null,
                loading: true
            };
        }

        case DocumentoAvulsoResponderActions.GET_DOCUMENTO_AVULSO_SUCCESS: {

            return {
                ...state,
                documentoAvulsoId: action.payload.documentoAvulsoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }


        case DocumentoAvulsoResponderActions.GET_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        }

        case DocumentoAvulsoResponderActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
            };
        }

        case DocumentoAvulsoResponderActions.COMPLETE_DOCUMENTO: {
            return {
                ...state,
                documentosId: [...state.documentosId, action.payload.id],
            };
        }

        case DocumentoAvulsoResponderActions.CONVERTE_DOCUMENTO: {
            return {
                ...state,
                convertendoDocumentoIds: [...state.convertendoDocumentoIds, action.payload],
            };
        }

        case DocumentoAvulsoResponderActions.CONVERTE_DOCUMENTO_SUCESS: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        case DocumentoAvulsoResponderActions.CONVERTE_DOCUMENTO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload,
            };
        }

        case DocumentoAvulsoResponderActions.CONVERTE_DOCUMENTO_HTML: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: [...state.convertendoDocumentoHtmlIds, action.payload],
            };
        }

        case DocumentoAvulsoResponderActions.CONVERTE_DOCUMENTO_HTML_SUCESS: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }

        case DocumentoAvulsoResponderActions.CONVERTE_DOCUMENTO_HTML_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload,
            };
        }

        case DocumentoAvulsoResponderActions.DELETE_DOCUMENTO: {
            return {
                ...state,
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload.documentoAvulsoId]
            };
        }

        case DocumentoAvulsoResponderActions.DELETE_DOCUMENTO_FAILED: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.id),
                errors: action.payload
            };
        }

        case DocumentoAvulsoResponderActions.DELETE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentosId: state.documentosId.filter(id => id !== action.payload)
            };
        }

        case DocumentoAvulsoResponderActions.ASSINA_DOCUMENTO: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload]
            };
        }

        case DocumentoAvulsoResponderActions.ASSINA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case DocumentoAvulsoResponderActions.ASSINA_DOCUMENTO_FAILED: {
            return {
                ...state,
                errors: action.payload
            };
        }

        case DocumentoAvulsoResponderActions.ASSINA_DOCUMENTO_ELETRONICAMENTE: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload.documento.id],
                errors: false
            };
        }

        case DocumentoAvulsoResponderActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload),
                errors: false
            };
        }

        case DocumentoAvulsoResponderActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload.documentoId),
                errors: action.payload.error
            };
        }

        case DocumentoAvulsoResponderActions.REMOVE_ASSINATURA_DOCUMENTO: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: [...state.removendoAssinaturaDocumentoIds, action.payload]
            };
        }

        case DocumentoAvulsoResponderActions.REMOVE_ASSINATURA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case DocumentoAvulsoResponderActions.REMOVE_ASSINATURA_DOCUMENTO_FAILED: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case DocumentoAvulsoResponderActions.CHANGE_SELECTED_DOCUMENTOS: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        case DocumentoAvulsoResponderActions.SAVE_RESPOSTA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case DocumentoAvulsoResponderActions.SAVE_RESPOSTA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DocumentoAvulsoResponderActions.SAVE_RESPOSTA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case DocumentoAvulsoResponderActions.SAVE_COMPLEMENTAR: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DocumentoAvulsoResponderActions.SAVE_COMPLEMENTAR_SUCCESS: {
            return {
                ... state,
                saving: true,
                errors: false
            };
        }

        case DocumentoAvulsoResponderActions.SAVE_COMPLEMENTAR_FAILED: {
            return {
                ... state,
                saving: true,
                errors: action.payload
            };
        }

        case DocumentoAvulsoResponderActions.GET_DOCUMENTOS_COMPLEMENTARES_SUCCESS: {
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
