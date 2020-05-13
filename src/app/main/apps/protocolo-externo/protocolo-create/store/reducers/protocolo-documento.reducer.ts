import * as ProtocoloDocumentoActions from '../actions/protocolo-documento.actions';

export interface ProtocoloDocumentoState {
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    assinandoDocumentoIds: number[];
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

        default:
            return state;
    }
}
