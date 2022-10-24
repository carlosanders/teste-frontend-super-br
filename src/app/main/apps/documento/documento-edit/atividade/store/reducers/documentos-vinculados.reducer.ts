import * as DocumentosVinculadosActions from '../actions/documentos-vinculados.actions';

export interface DocumentosVinculadosState {
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
    alterandoDocumentoIds: number[];
    downloadDocumentosP7SIds: number[];
    saving: boolean;
    loading: boolean;
    loaded: boolean;
    reloading: boolean;
    error: any;
}

export const documentosVinculadosInitialState: DocumentosVinculadosState = {
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
    alterandoDocumentoIds: [],
    downloadDocumentosP7SIds: [],
    saving: false,
    loading: false,
    loaded: false,
    reloading: false,
    error: null,
};

export const documentosVinculadosReducer = (
    state = documentosVinculadosInitialState,
    action: DocumentosVinculadosActions.DocumentosVinculadosActionsAll
): DocumentosVinculadosState => {
    switch (action.type) {
        case DocumentosVinculadosActions.RELOAD_DOCUMENTOS_VINCULADOS: {
            return {
                ...state,
                reloading: true
            };
        }

        case DocumentosVinculadosActions.GET_DOCUMENTOS_VINCULADOS: {
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

        case DocumentosVinculadosActions.GET_DOCUMENTOS_VINCULADOS_SUCCESS: {
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

        case DocumentosVinculadosActions.GET_DOCUMENTOS_VINCULADOS_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case DocumentosVinculadosActions.COMPLETE_DOCUMENTO_VINCULADO: {
            return {
                ...state,
                documentosId: [...state.documentosId, action.payload.id],
            };
        }

        case DocumentosVinculadosActions.DELETE_DOCUMENTO_VINCULADO: {
            return {
                ...state,
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload.documentoVinculadoId]
            };
        }

        case DocumentosVinculadosActions.DELETE_DOCUMENTO_VINCULADO_SUCCESS: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentosId: state.documentosId.filter(id => id !== action.payload),
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total - 1
                }
            };
        }

        case DocumentosVinculadosActions.DELETE_DOCUMENTO_VINCULADO_FAILED: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.id),
            };
        }

        case DocumentosVinculadosActions.CHANGE_SELECTED_DOCUMENTOS_VINCULADOS: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        case DocumentosVinculadosActions.UPDATE_DOCUMENTO_VINCULADO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload.documento.id],
                loaded: false,
                loading: true,
            };
        }

        case DocumentosVinculadosActions.UPDATE_DOCUMENTO_VINCULADO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                loaded: true,
                loading: false,
            };
        }

        case DocumentosVinculadosActions.UPDATE_DOCUMENTO_VINCULADO_FAILED: {
            return {
                ...state,
                loading: false,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        case DocumentosVinculadosActions.DOWNLOAD_DOCUMENTO_VINCULADO_P7S: {
            return {
                ...state,
                downloadDocumentosP7SIds: [...state.downloadDocumentosP7SIds, action.payload],
            };
        }
        case DocumentosVinculadosActions.DOWNLOAD_DOCUMENTO_VINCULADO_P7S_SUCCESS: {
            return {
                ...state,
                downloadDocumentosP7SIds: state.downloadDocumentosP7SIds.filter(id => id !== action.payload),
            };
        }
        case DocumentosVinculadosActions.DOWNLOAD_DOCUMENTO_VINCULADO_P7S_FAILED: {
            return {
                ...state,
                downloadDocumentosP7SIds: state.downloadDocumentosP7SIds.filter(id => id !== action.payload),
            };
        }
        case DocumentosVinculadosActions.SET_SAVING: {
            return {
                ...state,
                saving: !state.loading
            };
        }
        case DocumentosVinculadosActions.UNLOAD_DOCUMENTOS_VINCULADOS: {
            if (action.payload.reset) {
                return {
                    ...documentosVinculadosInitialState
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

        case DocumentosVinculadosActions.CONVERTE_ANEXO_EM_MINUTA: {
            return {
                ...state,
                alterandoDocumentoIds: [
                    ...state.alterandoDocumentoIds.filter((id) => id !== action.payload.documento.id),
                    action.payload.documento.id,
                ],
                loaded: false,
                loading: true,
            };
        }

        case DocumentosVinculadosActions.CONVERTE_ANEXO_EM_MINUTA_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter((id) => id !== action.payload.id),
                documentosId: state.documentosId.filter((id) => id !== action.payload.id),
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total-1
                },
                loaded: true,
                loading: false,
            };
        }

        case DocumentosVinculadosActions.CONVERTE_ANEXO_EM_MINUTA_FAILED: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter((id) => id !== action.payload.documento.id),
                loaded: true,
                loading: false,
            };
        }

        default:
            return state;
    }
};
