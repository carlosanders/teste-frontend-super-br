import * as ProcessoViewDocumentosActions from '../actions/documentos.actions';

export interface ProcessoViewDocumentosState {
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    alterandoDocumentoIds: number[];
    convertendoDocumentoIds: number[];
    convertendoDocumentoHtmlIds: number[];
    downloadP7SDocumentoIds: number[];
    undeletingDocumentoIds: number[];
    removendoVinculacoesDocumentoIds: number[];
    bufferingDelete: number;
    loading: boolean;
    loaded: boolean;
    loadingDocumentosExcluidos: boolean;
    lixeiraMinutas: boolean;
    error: any;
    errorDelete: number[];
    deleteVisibilidadeDocsIds: number[];
    deleteVisibilidadeDocsIdsError: number[];
}

export const processoViewDocumentosInitialState: ProcessoViewDocumentosState = {
    documentosId: [],
    documentosLoaded: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    alterandoDocumentoIds: [],
    convertendoDocumentoIds: [],
    convertendoDocumentoHtmlIds: [],
    downloadP7SDocumentoIds: [],
    undeletingDocumentoIds: [],
    removendoVinculacoesDocumentoIds: [],
    bufferingDelete: 0,
    loading: false,
    loaded: false,
    loadingDocumentosExcluidos: false,
    lixeiraMinutas: false,
    error: null,
    errorDelete: [],
    deleteVisibilidadeDocsIds: [],
    deleteVisibilidadeDocsIdsError: [],
};

export const processoViewDocumentosReducer = (
    state = processoViewDocumentosInitialState,
    action: ProcessoViewDocumentosActions.ProcessoViewDocumentosActionsAll
): ProcessoViewDocumentosState => {
    switch (action.type) {

        case ProcessoViewDocumentosActions.RELOAD_DOCUMENTO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload]
            };
        }

        case ProcessoViewDocumentosActions.RELOAD_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case ProcessoViewDocumentosActions.RELOAD_DOCUMENTO_FAILED: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload.id),
                error: action.payload.error
            };
        }

        case ProcessoViewDocumentosActions.COMPLETE_DOCUMENTO: {
            return {
                ...state,
                documentosId: [...state.documentosId, action.payload.id],
            };
        }

        case ProcessoViewDocumentosActions.DELETE_DOCUMENTO: {
            const entitiesId = state.documentosId.filter(id => id !== action.payload.documentoId);
            return {
                ...state,
                documentosId: entitiesId,
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload.documentoId],
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload.documentoId),
                error: null
            };
        }

        case ProcessoViewDocumentosActions.DELETE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload),
                errorDelete: [],
                error: null
            };
        }

        case ProcessoViewDocumentosActions.DELETE_DOCUMENTO_FAILED: {
            return {
                ...state,
                errorDelete: [...state.errorDelete, action.payload.id],
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.id),
                documentosId: [...state.documentosId, action.payload.id],
                error: action.payload.error
            };
        }

        case ProcessoViewDocumentosActions.DELETE_DOCUMENTO_CANCEL: {
            return {
                ...state,
                deletingDocumentoIds: [],
                bufferingDelete: state.bufferingDelete + 1,
                errorDelete: [],
                error: null
            };
        }

        case ProcessoViewDocumentosActions.DELETE_DOCUMENTO_FLUSH: {
            return {
                ...state,
                bufferingDelete: state.bufferingDelete + 1
            };
        }

        case ProcessoViewDocumentosActions.DELETE_DOCUMENTO_CANCEL_SUCCESS: {
            return {
                ...state,
                documentosId: [...state.documentosId, action.payload],
            };
        }

        case ProcessoViewDocumentosActions.UPDATE_DOCUMENTO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload.documento.id],
                loaded: false,
                loading: true,
            };
        }

        case ProcessoViewDocumentosActions.UPDATE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentosId: state.documentosId.filter(id => id !== action.payload),
                loaded: true,
                loading: false,
            };
        }

        case ProcessoViewDocumentosActions.UPDATE_DOCUMENTO_FAILED: {
            return {
                ...state,
                loaded: false,
                loading: false,
            };
        }

        case ProcessoViewDocumentosActions.CHANGE_SELECTED_DOCUMENTOS: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        case ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO: {
            return {
                ...state,
                convertendoDocumentoIds: [...state.convertendoDocumentoIds, action.payload],
            };
        }

        case ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO_SUCESS: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        case ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO_FAILED: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload.id),
                error: action.payload.error,
            };
        }

        case ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO_HTML: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: [...state.convertendoDocumentoHtmlIds, action.payload],
            };
        }

        case ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO_HTML_SUCESS: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }

        case ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO_HTML_FAILED: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }

        case ProcessoViewDocumentosActions.UNDELETE_DOCUMENTO: {
            return {
                ...state,
                undeletingDocumentoIds: [...state.undeletingDocumentoIds, action.payload.documento.id],
            };
        }

        case ProcessoViewDocumentosActions.UNDELETE_DOCUMENTO_SUCCESS: {
            let entitiesId = [];
            entitiesId = state.lixeiraMinutas ?
                state.documentosId.filter(id => id !== action.payload.documento.id) : [...state.documentosId, action.payload.documento.id];
            return {
                ...state,
                undeletingDocumentoIds: state.undeletingDocumentoIds.filter(id => id !== action.payload.documento.id),
                documentosId: !action.payload.loaded || action.payload.loaded === state.documentosLoaded ? entitiesId : state.documentosId
            };
        }

        case ProcessoViewDocumentosActions.UNDELETE_DOCUMENTO_FAILED: {
            return {
                ...state,
                undeletingDocumentoIds: state.undeletingDocumentoIds.filter(id => id !== action.payload.id)
            };
        }

        case ProcessoViewDocumentosActions.DOWNLOAD_DOCUMENTO_P7S: {
            return {
                ...state,
                downloadP7SDocumentoIds: [...state.downloadP7SDocumentoIds, action.payload],
            };
        }
        case ProcessoViewDocumentosActions.DOWNLOAD_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                downloadP7SDocumentoIds: state.downloadP7SDocumentoIds.filter(id => id !== action.payload),
            };
        }
        case ProcessoViewDocumentosActions.DOWNLOAD_DOCUMENTO_FAILED: {
            return {
                ...state,
                downloadP7SDocumentoIds: state.downloadP7SDocumentoIds.filter(id => id !== action.payload),
            };
        }
        case ProcessoViewDocumentosActions.DELETE_VISIBILIDADE_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                deleteVisibilidadeDocsIds: action.payload.id,
                deleteVisibilidadeDocsIdsError: action.payload.errors,
            };
        }
        case ProcessoViewDocumentosActions.REMOVE_VINCULACAO_DOCUMENTO: {
            return {
                ...state,
                removendoVinculacoesDocumentoIds: [...state.removendoVinculacoesDocumentoIds, action.payload.vinculacaoDocumento.id]
            }
        }
        case ProcessoViewDocumentosActions.REMOVE_VINCULACAO_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                removendoVinculacoesDocumentoIds: state.removendoVinculacoesDocumentoIds.filter(id => id !== action.payload)
            }
        }
        case ProcessoViewDocumentosActions.REMOVE_VINCULACAO_DOCUMENTO_FAILED: {
            return {
                ...state,
                removendoVinculacoesDocumentoIds: state.removendoVinculacoesDocumentoIds.filter(id => id !== action.payload)
            }
        }
        default:
            return state;
    }
};
