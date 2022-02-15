import * as MinutasActions from '../actions/minutas.actions';

export interface AgrupadorTarefa {
    id: number;
    processoId: number;
    nupFormatado?: string;
    documentosId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        listFilter: any;
        populate: any;
        sort: any;
        total: number;
        tarefaId: number;
        processoId: number;
        nupFormatado: string;
    };
    loaded: any;
    saving: boolean;
    loading: boolean;
    error?: any;
}

export interface MinutasState {
    tarefas: { [id: number]: AgrupadorTarefa };
    documentos: number[];
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    assinandoDocumentoIds: number[];
    removendoAssinaturaDocumentoIds: number[];
    convertendoDocumentoIds: number[];
    convertendoDocumentoHtmlIds: number[];
    downloadDocumentosP7SIds: number[];
    alterandoDocumentoIds: number[];
    undeletingDocumentoIds: number[];
    lixeira: boolean;
    saving: boolean;
    loading: boolean;
    loaded: boolean;
}

export const minutasInitialState: MinutasState = {
    tarefas: {},
    documentos: [],
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    assinandoDocumentoIds: [],
    removendoAssinaturaDocumentoIds: [],
    convertendoDocumentoIds: [],
    convertendoDocumentoHtmlIds: [],
    downloadDocumentosP7SIds: [],
    alterandoDocumentoIds: [],
    undeletingDocumentoIds: [],
    saving: false,
    loading: false,
    loaded: false,
    lixeira: false
};

export const agrupadorTarefaInitialState: AgrupadorTarefa = {
    id: null,
    processoId: null,
    nupFormatado: '',
    documentosId: [],
    pagination: {
        limit: 10,
        offset: 0,
        filter: {},
        listFilter: {},
        populate: [],
        sort: '',
        total: 0,
        tarefaId: 0,
        processoId: 0,
        nupFormatado: ''
    },
    loaded: false,
    saving: false,
    loading: false,
    error: null
};

export const minutasReducer = (
    state = minutasInitialState,
    action: MinutasActions.MinutasActionsAll
): MinutasState => {
    switch (action.type) {

        case MinutasActions.GET_DOCUMENTOS_BLOCO: {
            let lixeira = false;
            if (action.payload && action.payload['context'] && action.payload['context']['mostrarApagadas']) {
                lixeira = true;
            }
            const total = state.tarefas[action.payload.tarefaId]?.pagination?.total ?? 0;
            const tarefas = {
                ...state.tarefas,
                [action.payload.tarefaId]: {
                    ...state.tarefas[action.payload.tarefaId],
                    id: action.payload.tarefaId,
                    processoId: action.payload.processoId,
                    nupFormatado: action.payload.nupFormatado,
                    saving: false,
                    loading: true,
                    loaded: false,
                    pagination: {
                        limit: action.payload.limit,
                        offset: action.payload.offset,
                        filter: action.payload.filter,
                        listFilter: action.payload.listFilter,
                        populate: action.payload.populate,
                        context: action.payload.context,
                        sort: action.payload.sort,
                        tarefaId: action.payload.tarefaId,
                        processoId: action.payload.processoId,
                        nupFormatado: action.payload.nupFormatado,
                        total: total
                    }
                }
            };
            return {
                ...state,
                saving: false,
                loading: true,
                lixeira: lixeira,
                tarefas: tarefas
            };
        }

        case MinutasActions.GET_DOCUMENTOS_BLOCO_SUCCESS: {
            let documentosId = [];
            if (state.tarefas[action.payload.tarefaId].documentosId) {
                documentosId = state.tarefas[action.payload.tarefaId].documentosId;
            }
            const tarefas = {
                ...state.tarefas,
                [action.payload.tarefaId]: {
                    ...state.tarefas[action.payload.tarefaId],
                    loading: false,
                    documentosId: [...documentosId, ...action.payload.entitiesId],
                    pagination: {
                        ...state.tarefas[action.payload.tarefaId].pagination,
                        total: action.payload.total
                    },
                    loaded: action.payload.loaded
                }
            };
            return {
                ...state,
                loading: false,
                loaded: action.payload.loaded,
                documentos: [...state.documentos, ...action.payload.entitiesId],
                tarefas: tarefas
            };
        }

        case MinutasActions.GET_DOCUMENTOS_BLOCO_FAILED: {
            const tarefas = {
                ...state.tarefas,
                [action.payload.tarefaId]: {
                    ...state.tarefas[action.payload.tarefaId],
                    loading: false,
                    error: action.payload.error
                }
            };
            return {
                ...state,
                tarefas: tarefas,
                loading: false
            };
        }

        case MinutasActions.UNLOAD_DOCUMENTOS_TAREFA: {
            const tarefas = {
                ...state.tarefas,
                [action.payload]: {
                    ...agrupadorTarefaInitialState
                }
            };
            return {
                ...state,
                tarefas: tarefas
            };
        }

        case MinutasActions.COMPLETE_DOCUMENTO_BLOCO: {
            return {
                ...state,
                documentos: [...state.documentos, action.payload.id],
            };
        }

        case MinutasActions.DELETE_DOCUMENTO_BLOCO: {
            return {
                ...state,
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload.documentoId]
            };
        }

        case MinutasActions.UNLOAD_DOCUMENTOS_BLOCO: {
            return {
                ...minutasInitialState
            };
        }

        case MinutasActions.DELETE_DOCUMENTO_BLOCO_SUCCESS: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.documentoId),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload.documentoId),
                documentos: state.documentos.filter(id => id !== action.payload.documentoId)
            };
        }

        case MinutasActions.DELETE_DOCUMENTO_BLOCO_FAILED: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.id),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload.id)
            };
        }

        case MinutasActions.REMOVE_DOCUMENTO_ID_FROM_TAREFA: {
            let documentosId = [];
            if (state.tarefas[action.payload.tarefaId].documentosId) {
                documentosId = state.tarefas[action.payload.tarefaId].documentosId.filter(documentoId => documentoId !== action.payload.documentoId);
            }
            const tarefas = {
                ...state.tarefas,
                [action.payload.tarefaId]: {
                    ...state.tarefas[action.payload.tarefaId],
                    documentosId: documentosId,
                    pagination: {
                        ...state.tarefas[action.payload.tarefaId].pagination,
                        total: state.tarefas[action.payload.tarefaId].pagination.total - 1
                    }
                }
            };
            return {
                ...state,
                tarefas: tarefas
            };
        }

        case MinutasActions.ASSINA_DOCUMENTO_BLOCO: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, ...action.payload]
            };
        }

        case MinutasActions.ASSINA_DOCUMENTO_BLOCO_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case MinutasActions.ASSINA_DOCUMENTO_BLOCO_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case MinutasActions.REMOVE_ASSINATURA_DOCUMENTO: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: [...state.removendoAssinaturaDocumentoIds, action.payload]
            };
        }

        case MinutasActions.REMOVE_ASSINATURA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case MinutasActions.REMOVE_ASSINATURA_DOCUMENTO_FAILED: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case MinutasActions.ASSINA_DOCUMENTO_ELETRONICAMENTE: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload.documento.id]
            };
        }

        case MinutasActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case MinutasActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload.documentoId)
            };
        }

        case MinutasActions.CHANGE_SELECTED_DOCUMENTOS_BLOCO: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        case MinutasActions.CONVERTE_DOCUMENTO_ATIVIDADE: {
            return {
                ...state,
                convertendoDocumentoIds: [...state.convertendoDocumentoIds, action.payload],
            };
        }
        case MinutasActions.CONVERTE_DOCUMENTO_SUCESS: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }
        case MinutasActions.CONVERTE_DOCUMENTO_FAILED: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        case MinutasActions.CONVERTE_DOCUMENTO_ATIVIDADE_HTML: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: [...state.convertendoDocumentoHtmlIds, action.payload],
            };
        }
        case MinutasActions.CONVERTE_DOCUMENTO_HTML_SUCESS: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }
        case MinutasActions.CONVERTE_DOCUMENTO_HTML_FAILED: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }

        case MinutasActions.DOWNLOAD_DOCUMENTO_P7S: {
            return {
                ...state,
                downloadDocumentosP7SIds: [...state.downloadDocumentosP7SIds, action.payload],
            };
        }
        case MinutasActions.DOWNLOAD_DOCUMENTO_P7S_SUCCESS: {
            return {
                ...state,
                downloadDocumentosP7SIds: state.downloadDocumentosP7SIds.filter(id => id !== action.payload),
            };
        }
        case MinutasActions.DOWNLOAD_DOCUMENTO_P7S_FAILED: {
            return {
                ...state,
                downloadDocumentosP7SIds: state.downloadDocumentosP7SIds.filter(id => id !== action.payload),
            };
        }

        case MinutasActions.UNDELETE_DOCUMENTO: {
            return {
                ...state,
                undeletingDocumentoIds: [...state.undeletingDocumentoIds, action.payload.documento.id],
            };
        }

        case MinutasActions.UNDELETE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                undeletingDocumentoIds: state.undeletingDocumentoIds.filter(id => id !== action.payload.id),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload.id),
                documentos: state.documentos.filter(id => id !== action.payload.id)
            };
        }

        case MinutasActions.UNDELETE_DOCUMENTO_FAILED: {
            return {
                ...state,
                undeletingDocumentoIds: state.undeletingDocumentoIds.filter(id => id !== action.payload.id),
                documentos: state.documentos.filter(id => id !== action.payload.id)
            };
        }

        case MinutasActions.UPDATE_DOCUMENTO_BLOCO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload.documento.id]
            };
        }

        case MinutasActions.UPDATE_DOCUMENTO_BLOCO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentos: state.documentos.filter(id => id !== action.payload)
            };
        }

        case MinutasActions.UPDATE_DOCUMENTO_BLOCO_FAILED: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        default:
            return state;
    }
};
