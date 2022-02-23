import * as AssinaturaActions from '../actions/assinatura.actions';

export interface AssinaturaState {
    assinandoDocumentosId: number[];
    removendoAssinaturaDocumentosId: number[];
    errors: any;
}

export const assinaturaInitialState: AssinaturaState = {
    assinandoDocumentosId: [],
    removendoAssinaturaDocumentosId: [],
    errors: false
};

export const assinaturaReducer = (
    state = assinaturaInitialState,
    action: AssinaturaActions.AssinaturaActionsAll
): AssinaturaState => {
    switch (action.type) {

        case AssinaturaActions.ASSINA_DOCUMENTO: {
            return {
                ...state,
                assinandoDocumentosId: [...state.assinandoDocumentosId, ...action.payload],
                errors: false
            };
        }

        case AssinaturaActions.ASSINA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                assinandoDocumentosId: state.assinandoDocumentosId.filter(id => id !== action.payload),
            };
        }

        case AssinaturaActions.ASSINA_DOCUMENTO_FAILED: {
            return {
                ...state,
                assinandoDocumentosId: state.assinandoDocumentosId.filter(id => id !== action.payload),
            };
        }

        case AssinaturaActions.PREPARA_ASSINATURA_FAILED: {
            return {
                ...state,
                assinandoDocumentosId: state.assinandoDocumentosId.filter(el => action.payload.ids.includes(el)),
                errors: action.payload.error
            };
        }

        case AssinaturaActions.ASSINA_DOCUMENTO_ELETRONICAMENTE: {
            return {
                ...state,
                assinandoDocumentosId: [...state.assinandoDocumentosId, action.payload.documento.id],
                errors: false
            };
        }

        case AssinaturaActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS: {
            return {
                ...state,
                assinandoDocumentosId: state.assinandoDocumentosId.filter(id => id !== action.payload),
                errors: false
            };
        }

        case AssinaturaActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED: {
            return {
                ...state,
                assinandoDocumentosId: state.assinandoDocumentosId.filter(id => id !== action.payload.documentoId),
                errors: action.payload.error
            };
        }

        case AssinaturaActions.REMOVE_ASSINATURA_DOCUMENTO: {
            return {
                ...state,
                removendoAssinaturaDocumentosId: [...state.removendoAssinaturaDocumentosId, action.payload]
            };
        }

        case AssinaturaActions.REMOVE_ASSINATURA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                removendoAssinaturaDocumentosId: state.removendoAssinaturaDocumentosId.filter(id => id !== action.payload)
            };
        }

        case AssinaturaActions.REMOVE_ASSINATURA_DOCUMENTO_FAILED: {
            return {
                ...state,
                removendoAssinaturaDocumentosId: state.removendoAssinaturaDocumentosId.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
};