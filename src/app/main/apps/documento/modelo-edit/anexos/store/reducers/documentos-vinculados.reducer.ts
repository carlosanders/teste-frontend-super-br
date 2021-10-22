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
    assinandoDocumentoIds: number[];
    saving: boolean;
    loading: boolean;
    loaded: boolean;
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
    assinandoDocumentoIds: [],
    saving: false,
    loading: false,
    loaded: false,
    error: null
};

export const documentosVinculadosReducer = (
    state = documentosVinculadosInitialState,
    action: DocumentosVinculadosActions.DocumentosVinculadosActionsAll
): DocumentosVinculadosState => {
    switch (action.type) {

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
                documentosId: state.documentosId.filter(id => id !== action.payload)
            };
        }

        case DocumentosVinculadosActions.DELETE_DOCUMENTO_VINCULADO_FAILED: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.id),
            };
        }

        case DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload]
            };
        }

        case DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload.id),
                error: action.payload.error
            };
        }

        case DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload.documento.id],
                error: false
            };
        }

        case DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload),
                error: false
            };
        }

        case DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload.documentoId),
                error: action.payload.error
            };
        }

        case DocumentosVinculadosActions.CHANGE_SELECTED_DOCUMENTOS_VINCULADOS: {
            return {
                ...state,
                selectedDocumentosId: action.payload
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

        default:
            return state;
    }
};
