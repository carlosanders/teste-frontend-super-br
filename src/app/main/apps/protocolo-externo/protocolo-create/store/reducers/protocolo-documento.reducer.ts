import * as ProtocoloDocumentoActions from '../actions/protocolo-documento.actions';

export interface ProtocoloDocumentoState {
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    assinandoDocumentoIds: number[];
    removendoAssinaturaDocumentoIds: number[];
    convertendoDocumentoIds: number[];
    loading: boolean;
    loaded: boolean;
    saving: boolean;
    errors: any;
}

export const ProtocoloDocumentoInitialState: ProtocoloDocumentoState = {
    documentosId: [],
    documentosLoaded: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    assinandoDocumentoIds: [],
    removendoAssinaturaDocumentoIds: [],
    convertendoDocumentoIds: [],
    loading: false,
    loaded: false,
    saving: false,
    errors: false
};

export function ProtocoloDocumentoReducer(state = ProtocoloDocumentoInitialState, action: ProtocoloDocumentoActions.ProtocoloDocumentoActionsAll): ProtocoloDocumentoState {
    switch (action.type) {

        case ProtocoloDocumentoActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
            };
        }

        case ProtocoloDocumentoActions.UNLOAD_DOCUMENTOS: {
            return {
                ...ProtocoloDocumentoInitialState
            };
        }

        case ProtocoloDocumentoActions.ENVIAR_DOCUMENTO: {
            return {
                assinandoDocumentoIds: [],
                deletingDocumentoIds: [],
                documentosId: [],
                documentosLoaded: undefined,
                removendoAssinaturaDocumentoIds: [],
                convertendoDocumentoIds: [],
                loaded: false,
                loading: false,
                selectedDocumentosId: [],
                saving: true,
                errors: false
            };
        }

        case ProtocoloDocumentoActions.ENVIAR_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ProtocoloDocumentoActions.ENVIAR_DOCUMENTO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case ProtocoloDocumentoActions.REMOVE_ASSINATURA_DOCUMENTO: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: [...state.removendoAssinaturaDocumentoIds, action.payload]
            };
        }

        case ProtocoloDocumentoActions.REMOVE_ASSINATURA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case ProtocoloDocumentoActions.REMOVE_ASSINATURA_DOCUMENTO_FAILED: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case ProtocoloDocumentoActions.CONVERTE_DOCUMENTO_ATIVIDADE: {
            return {
                ...state,
                convertendoDocumentoIds: [...state.convertendoDocumentoIds, action.payload],
            };
        }
        case ProtocoloDocumentoActions.CONVERTE_DOCUMENTO_SUCESS: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }
        case ProtocoloDocumentoActions.CONVERTE_DOCUMENTO_FAILED: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        default:
            return state;
    }
}
