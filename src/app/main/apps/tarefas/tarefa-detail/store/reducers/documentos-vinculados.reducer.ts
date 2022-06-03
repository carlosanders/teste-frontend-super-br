import * as fromStore from '../';

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

export const DocumentosVinculadosInitialState: DocumentosVinculadosState = {
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

export const DocumentosVinculadosReducer = (
    state = DocumentosVinculadosInitialState,
    action: fromStore.DocumentosVinculadosActionsAll
): DocumentosVinculadosState => {
    switch (action.type) {
        case fromStore.GET_DOCUMENTOS_VINCULADOS: {
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
        case fromStore.GET_DOCUMENTOS_VINCULADOS_SUCCESS: {
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
        case fromStore.GET_DOCUMENTOS_VINCULADOS_FAILED: {
            return {
                ...state,
                loading: false
            };
        }
        case fromStore.COMPLETE_DOCUMENTO_VINCULADO: {
            return {
                ...state,
                documentosId: [...state.documentosId, action.payload.componenteDigital.documento.id],
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total + 1
                }
            };
        }
        case fromStore.DELETE_DOCUMENTO_VINCULADO: {
            return {
                ...state,
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload.documentoId]
            };
        }
        case fromStore.DELETE_DOCUMENTO_VINCULADO_SUCCESS: {
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
        case fromStore.DELETE_DOCUMENTO_VINCULADO_FAILED: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.id),
            };
        }
        case fromStore.CHANGE_SELECTED_DOCUMENTOS_VINCULADOS: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }
        case fromStore.UPDATE_DOCUMENTO_VINCULADO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload.documento.id],
                loaded: false,
                loading: true,
            };
        }
        case fromStore.UPDATE_DOCUMENTO_VINCULADO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                loaded: true,
                loading: false,
            };
        }
        case fromStore.UPDATE_DOCUMENTO_VINCULADO_FAILED: {
            return {
                ...state,
                loading: false,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
            };
        }
        case fromStore.SET_SAVING: {
            return {
                ...state,
                saving: !state.loading
            };
        }
        case fromStore.UNLOAD_DOCUMENTOS_VINCULADOS: {
            if (action.payload.reset) {
                return {
                    ...DocumentosVinculadosInitialState
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
