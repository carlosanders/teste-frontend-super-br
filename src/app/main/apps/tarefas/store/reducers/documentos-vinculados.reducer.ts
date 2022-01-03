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
    saving: boolean;
    loading: boolean;
    loaded: any;
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
    saving: false,
    loading: false,
    loaded: false,
    error: null,
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
                    limit: action.payload?.filters?.limit,
                    offset: action.payload?.filters?.offset,
                    filter: action.payload?.filters?.filter,
                    listFilter: action.payload?.filters?.listFilter,
                    populate: action.payload?.filters?.populate,
                    sort: action.payload?.filters?.sort,
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
                documentosId: [...state.documentosId, action.payload.componenteDigital.documento.id],
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total + 1
                }
            };
        }
        case DocumentosVinculadosActions.DELETE_DOCUMENTO_VINCULADO: {
            return {
                ...state,
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload.documentoId]
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
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
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
