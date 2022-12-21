import * as DocumentosActions from '../actions/documentos.actions';
import * as ComponenteDigitalActions from "../../../../../tarefas/store/actions/componentes-digitais.actions";
import {SAVE_COMPONENTE_DIGITAL_MINUTA} from "../actions/documentos.actions";

export interface DocumentosState {
    documentosId: number[];
    selectedDocumentosId: number[];
    alterandoDocumentoIds: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        listFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    saving: boolean;
    errors: any;
    loaded: any;
}

export const documentosInitialState: DocumentosState = {
    documentosId: [],
    selectedDocumentosId: [],
    alterandoDocumentoIds: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        listFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    saving: false,
    errors: false,
    loaded: false
};

export const documentosReducer = (
    state = documentosInitialState,
    action: DocumentosActions.DocumentosActionsAll
): DocumentosState => {
    switch (action.type) {

        case DocumentosActions.GET_DOCUMENTOS: {
            return {
                ...state,
                loading: true,
                saving: false,
                pagination: {
                    ...state.pagination,
                    ...action.payload
                },
            };
        }

        case DocumentosActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: [...state.documentosId, ...action.payload.entitiesId],
                loaded: action.payload.loaded,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                saving: false
            };
        }

        case DocumentosActions.GET_DOCUMENTOS_FAILED: {
            return {
                ...state,
                loading: false,
                saving: false
            };
        }

        case DocumentosActions.CHANGE_SELECTED_DOCUMENTOS: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        case DocumentosActions.UPDATE_DOCUMENTO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload.documento.id],
                loaded: false,
            };
        }

        case DocumentosActions.UPDATE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                loaded: true,
            };
        }

        case DocumentosActions.UPDATE_DOCUMENTO_FAILED: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                loaded: false,
            };
        }

        case DocumentosActions.UNLOAD_DOCUMENTOS: {
            return {
                ...documentosInitialState
            };
        }

        case DocumentosActions.CONVERTE_MINUTA_EM_ANEXO: {
            return {
                ...state,
                documentosId: state.documentosId.filter((id) => id !== action.payload.documentoOrigem.id),
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total-1
                },
                loading: true
            };
        }

        case DocumentosActions.CONVERTE_MINUTA_EM_ANEXO_SUCCESS: {
            return {
                ...state,
                loading: false
            };
        }

        case DocumentosActions.CONVERTE_MINUTA_EM_ANEXO_FAILED: {
            return {
                ...state,
                documentosId: [
                    ...state.documentosId.filter((id) => id !== action.payload.documentoOrigem.id),
                    action.payload.documentoOrigem.id
                ].sort(),
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total+1
                },
                loading: false
            };
        }

        case DocumentosActions.ADD_DOCUMENTO_ID: {
            return {
                ...state,
                documentosId: [
                    ...state.documentosId.filter((id) => id !== action.payload),
                    action.payload
                ].sort(),
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total+1
                }
            };
        }

        case DocumentosActions.CREATE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                errors: false,
                loading: true,
                loaded: false
            };
        }

        case DocumentosActions.SAVE_COMPONENTE_DIGITAL_MINUTA: {
            return {
                ...state,
                saving: true,
                loading: true,
                loaded: false
            };
        }

        case DocumentosActions.SAVE_COMPONENTE_DIGITAL_MINUTA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case DocumentosActions.SAVE_COMPONENTE_DIGITAL_MINUTA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload.error,
                loading: false
            };
        }

        case DocumentosActions.SET_SAVING_MINUTAS: {
            return {
                ...state,
                saving: !state.loading
            }
        }

        default:
            return state;

    }
};
