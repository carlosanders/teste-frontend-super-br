import * as ComplementaresActions from '../actions/complementares.actions';

export interface ComplementaresState {
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
    loaded: boolean;
    error: any;
}

export const complementaresInitialState: ComplementaresState = {
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
    error: null,
};

export const complementaresReducer = (
    state = complementaresInitialState,
    action: ComplementaresActions.ComplementaresActionsAll
): ComplementaresState => {
    switch (action.type) {
        case ComplementaresActions.GET_DOCUMENTOS_COMPLEMENTARES: {
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

        case ComplementaresActions.GET_DOCUMENTOS_COMPLEMENTARES_SUCCESS: {
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

        case ComplementaresActions.GET_DOCUMENTOS_COMPLEMENTARES_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ComplementaresActions.COMPLETE_DOCUMENTO_COMPLEMENTAR: {
            return {
                ...state,
                documentosId: [...state.documentosId, action.payload.id],
            };
        }

        case ComplementaresActions.CONVERTE_DOCUMENTO_COMPLEMENTAR: {
            return {
                ...state,
                convertendoDocumentoIds: [...state.convertendoDocumentoIds, action.payload],
            };
        }

        case ComplementaresActions.CONVERTE_DOCUMENTO_COMPLEMENTAR_SUCESS: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        case ComplementaresActions.CONVERTE_DOCUMENTO_COMPLEMENTAR_FAILED: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        case ComplementaresActions.CONVERTE_DOCUMENTO_COMPLEMENTAR_HTML: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: [...state.convertendoDocumentoHtmlIds, action.payload],
            };
        }

        case ComplementaresActions.CONVERTE_DOCUMENTO_COMPLEMENTAR_HTML_SUCESS: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }

        case ComplementaresActions.CONVERTE_DOCUMENTO_COMPLEMENTAR_HTML_FAILED: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }

        case ComplementaresActions.DELETE_DOCUMENTO_COMPLEMENTAR: {
            return {
                ...state,
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload.documentoId]
            };
        }

        case ComplementaresActions.DELETE_DOCUMENTO_COMPLEMENTAR_SUCCESS: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentosId: state.documentosId.filter(id => id !== action.payload)
            };
        }

        case ComplementaresActions.DELETE_DOCUMENTO_COMPLEMENTAR_FAILED: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== parseInt(Object.keys(action.payload.id)[0], 10))
            };
        }

        case ComplementaresActions.ASSINA_DOCUMENTO_COMPLEMENTAR: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload]
            };
        }

        case ComplementaresActions.ASSINA_DOCUMENTO_COMPLEMENTAR_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case ComplementaresActions.ASSINA_DOCUMENTO_COMPLEMENTAR_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case ComplementaresActions.PREPARA_ASSINATURA_COMPLEMENTAR_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload.id),
                error: action.payload.error
            };
        }

        case ComplementaresActions.ASSINA_DOCUMENTO_COMPLEMENTAR_ELETRONICAMENTE: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload.documento.id],
                error: false
            };
        }

        case ComplementaresActions.ASSINA_DOCUMENTO_COMPLEMENTAR_ELETRONICAMENTE_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload),
                error: false
            };
        }

        case ComplementaresActions.ASSINA_DOCUMENTO_COMPLEMENTAR_ELETRONICAMENTE_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload.documentoId),
                error: action.payload.error
            };
        }

        case ComplementaresActions.REMOVE_ASSINATURA_DOCUMENTO_COMPLEMENTAR: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: [...state.removendoAssinaturaDocumentoIds, action.payload]
            };
        }

        case ComplementaresActions.REMOVE_ASSINATURA_DOCUMENTO_COMPLEMENTAR_SUCCESS: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case ComplementaresActions.REMOVE_ASSINATURA_DOCUMENTO_COMPLEMENTAR_FAILED: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case ComplementaresActions.UPDATE_DOCUMENTO_COMPLEMENTAR: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload.documento.id],
                loaded: false,
                loading: true,
            };
        }

        case ComplementaresActions.UPDATE_DOCUMENTO_COMPLEMENTAR_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentosId: state.documentosId.filter(id => id !== action.payload),
                loaded: true,
                loading: false,
            };
        }

        case ComplementaresActions.UPDATE_DOCUMENTO_COMPLEMENTAR_FAILED: {
            return {
                ...state,
                loading: false,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
            };
        }

        case ComplementaresActions.DOWNLOAD_DOCUMENTO_COMPLEMENTAR_P7S: {
            return {
                ...state,
                downloadDocumentosP7SIds: [...state.downloadDocumentosP7SIds, action.payload],
            };
        }
        case ComplementaresActions.DOWNLOAD_DOCUMENTO_COMPLEMENTAR_P7S_SUCCESS: {
            return {
                ...state,
                downloadDocumentosP7SIds: state.downloadDocumentosP7SIds.filter(id => id !== action.payload),
            };
        }
        case ComplementaresActions.DOWNLOAD_DOCUMENTO_COMPLEMENTAR_P7S_FAILED: {
            return {
                ...state,
                downloadDocumentosP7SIds: state.downloadDocumentosP7SIds.filter(id => id !== action.payload),
            };
        }

        case ComplementaresActions.SET_SAVING_COMPLEMENTAR: {
            return {
                ...state,
                saving: !state.loading
            };
        }

        case ComplementaresActions.CHANGE_SELECTED_DOCUMENTOS_COMPLEMENTARES: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        case ComplementaresActions.UNLOAD_DOCUMENTOS_COMPLEMENTARES: {
            if (action.payload.reset) {
                return {
                    ...complementaresInitialState
                };
            } else {
                return {
                    ...state,
                    documentosId: [],
                    documentosLoaded: false,
                    pagination: {
                        ...state.pagination,
                        limit: 10,
                        offset: 0,
                        total: 0
                    }
                };
            }
        }

        default:
            return state;
    }
};
