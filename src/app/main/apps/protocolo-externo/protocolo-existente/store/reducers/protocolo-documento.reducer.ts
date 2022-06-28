import * as ProtocoloDocumentoActions from '../actions/protocolo-documento.actions';

export interface ProtocoloDocumentoState {
    documentosId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        listFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    assinandoDocumentoIds: number[];
    alterandoDocumentoIds: number[];
    removendoAssinaturaDocumentoIds: number[];
    downloadDocumentosP7SIds: number[];
    convertendoDocumentoIds: number[];
    convertendoDocumentoHtmlIds: number[];
    saving: boolean;
    loading: boolean;
    loaded: any;
    errors: any;
}

export const protocoloDocumentoInitialState: ProtocoloDocumentoState = {
    documentosId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        listFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    documentosLoaded: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    assinandoDocumentoIds: [],
    alterandoDocumentoIds: [],
    removendoAssinaturaDocumentoIds: [],
    downloadDocumentosP7SIds: [],
    convertendoDocumentoIds: [],
    convertendoDocumentoHtmlIds: [],
    saving: false,
    loading: false,
    loaded: false,
    errors: false
};

export const protocoloDocumentoReducer = (state = protocoloDocumentoInitialState, action: ProtocoloDocumentoActions.ProtocoloDocumentoActionsAll): ProtocoloDocumentoState => {
    switch (action.type) {

        case ProtocoloDocumentoActions.GET_DOCUMENTOS: {
            return {
                ...state,
                saving: false,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    listFilter: action.payload.listFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case ProtocoloDocumentoActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                loading: false,
                documentosId: [...state.documentosId, ...action.payload.entitiesId],
                documentosLoaded: action.payload.loaded,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                }
            };
        }

        case ProtocoloDocumentoActions.GET_DOCUMENTOS_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ProtocoloDocumentoActions.UNLOAD_DOCUMENTOS: {
            return {
                ...protocoloDocumentoInitialState
            };
        }

        case ProtocoloDocumentoActions.ENVIAR_DOCUMENTO: {
            return {
                ...state,
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

        case ProtocoloDocumentoActions.CONVERTE_DOCUMENTO_ATIVIDADE_HTML: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: [...state.convertendoDocumentoHtmlIds, action.payload],
            };
        }
        case ProtocoloDocumentoActions.CONVERTE_DOCUMENTO_HTML_SUCESS: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }
        case ProtocoloDocumentoActions.CONVERTE_DOCUMENTO_HTML_FAILED: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }
        case ProtocoloDocumentoActions.UPDATE_DOCUMENTO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload.documento.id],
                loaded: false,
                loading: true,
            };
        }

        case ProtocoloDocumentoActions.UPDATE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentosId: state.documentosId.filter(id => id !== action.payload),
                loaded: true,
                loading: false,
            };
        }

        case ProtocoloDocumentoActions.UPDATE_DOCUMENTO_FAILED: {
            return {
                ...state,
                loading: false,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
            };
        }

        case ProtocoloDocumentoActions.SET_SAVING: {
            return {
                ...state,
                saving: !state.loading
            };
        }

        case ProtocoloDocumentoActions.CHANGE_SELECTED_DOCUMENTOS: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        default:
            return state;
    }
};
