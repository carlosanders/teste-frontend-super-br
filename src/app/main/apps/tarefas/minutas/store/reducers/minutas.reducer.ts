import * as MinutasActions from '../actions/minutas.actions';
import {Documento} from '@cdk/models';

export interface AgrupadorProcesso {
    id: number;
    nupFormatado?: string;
    documentosId: number[];
    documentos?: Documento[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        listFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loaded: any;
    saving: boolean;
    loading: boolean;
    error?: any;
}

export interface MinutasState {
    processos: { [id: number]: AgrupadorProcesso };
    documentos: number[];
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    assinandoDocumentoIds: number[];
    removendoAssinaturaDocumentoIds: number[];
    convertendoDocumentoIds: number[];
    convertendoDocumentoHtmlIds: number[];
    downloadDocumentosP7SIds: number[];
    alterandoDocumentoIds: number[];
    saving: boolean;
    loading: boolean;
    loaded: boolean;
}

export const minutasInitialState: MinutasState = {
    processos: {},
    documentos: [],
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    assinandoDocumentoIds: [],
    removendoAssinaturaDocumentoIds: [],
    convertendoDocumentoIds: [],
    convertendoDocumentoHtmlIds: [],
    downloadDocumentosP7SIds: [],
    alterandoDocumentoIds: [],
    saving: false,
    loading: false,
    loaded: false
};

export const minutasReducer = (
    state = minutasInitialState,
    action: MinutasActions.MinutasActionsAll
): MinutasState => {
    switch (action.type) {

        case MinutasActions.GET_DOCUMENTOS_BLOCO: {
            const total = state.processos[action.payload.processoId]?.pagination?.total ?? 0;
            const processos = {
                ...state.processos,
                [action.payload.processoId]: {
                    ...state.processos[action.payload.processoId],
                    id: action.payload.processoId,
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
                        sort: action.payload.sort,
                        total: total
                    }
                }
            };
            return {
                ...state,
                saving: false,
                loading: true,
                processos: processos
            };
        }

        case MinutasActions.GET_DOCUMENTOS_BLOCO_SUCCESS: {
            let documentosId = [];
            if (state.processos[action.payload.processoId].documentosId) {
                documentosId = state.processos[action.payload.processoId].documentosId;
            }
            const processos = {
                ...state.processos,
                [action.payload.processoId]: {
                    ...state.processos[action.payload.processoId],
                    loading: false,
                    documentosId: [...documentosId, ...action.payload.entitiesId],
                    pagination: {
                        ...state.processos[action.payload.processoId].pagination,
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
                processos: processos
            };
        }

        case MinutasActions.GET_DOCUMENTOS_BLOCO_FAILED: {
            const processos = {
                ...state.processos,
                [action.payload.processoId]: {
                    ...state.processos[action.payload.processoId],
                    loading: false,
                    error: action.payload.error
                }
            };
            return {
                ...state,
                processos: processos,
                loading: false
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
