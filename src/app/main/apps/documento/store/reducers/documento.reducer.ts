import * as DocumentoActions from '../actions/documento.actions';

export interface DocumentoState {
    documentoId: number;
    currentComponenteDigitalId: number;
    loading: boolean;
    loaded: any;
    saving: boolean;
    errors: any;
    assinandoDocumentoIds: number[];
    vinculacaoEtiquetaErrors: any;
    savingVinculacaoEtiquetaId: number;
}

export const DocumentoInitialState: DocumentoState = {
    documentoId: null,
    currentComponenteDigitalId: null,
    loading: false,
    loaded: false,
    saving: false,
    errors: false,
    assinandoDocumentoIds: [],
    vinculacaoEtiquetaErrors: false,
    savingVinculacaoEtiquetaId: null
};

export function DocumentoReducer(state = DocumentoInitialState, action: DocumentoActions.DocumentoActionsAll): DocumentoState {
    switch (action.type) {

        case DocumentoActions.GET_DOCUMENTO: {
            return {
                ...state,
                loading: true
            };
        }

        case DocumentoActions.UNLOAD_DOCUMENTO: {
            return {
                ...DocumentoInitialState
            };
        }

        case DocumentoActions.GET_DOCUMENTO_SUCCESS: {

            return {
                ...state,
                documentoId: action.payload.documentoId,
                currentComponenteDigitalId: action.payload.currentComponenteDigitalId,
                loading: false,
                loaded: action.payload.loaded,
                saving: false,
                errors: false,
                assinandoDocumentoIds: [],
                vinculacaoEtiquetaErrors: false,
                savingVinculacaoEtiquetaId: null,
            };
        }

        case DocumentoActions.GET_DOCUMENTO_FAILED: {
            return {
                ...state,
                documentoId: null,
                currentComponenteDigitalId: null,
                loading: false,
                loaded: false,
                saving: false,
                errors: false,
                assinandoDocumentoIds: [],
                vinculacaoEtiquetaErrors: false,
                savingVinculacaoEtiquetaId: null
            };
        }

        case DocumentoActions.SAVE_DOCUMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case DocumentoActions.SAVE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DocumentoActions.SAVE_DOCUMENTO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case DocumentoActions.SET_CURRENT_STEP: {
            return {
                ...state,
                currentComponenteDigitalId: action.payload.id
            };
        }

        case DocumentoActions.ASSINA_DOCUMENTO: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, state.documentoId]
            };
        }

        case DocumentoActions.ASSINA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case DocumentoActions.ASSINA_DOCUMENTO_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case DocumentoActions.ASSINA_DOCUMENTO_ELETRONICAMENTE: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, state.documentoId]
            };
        }

        case DocumentoActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case DocumentoActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload.documentoId)
            };
        }

        case DocumentoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA: {
            return {
                ...state,
                vinculacaoEtiquetaErrors: false,
                savingVinculacaoEtiquetaId: action.payload.vinculacaoEtiqueta.id
            };
        }

        case DocumentoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                vinculacaoEtiquetaErrors: false,
                savingVinculacaoEtiquetaId: null
            };
        }

        case DocumentoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                vinculacaoEtiquetaErrors: action.payload,
                savingVinculacaoEtiquetaId: null
            };
        }

        default:
            return state;
    }
}
