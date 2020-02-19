import * as DocumentosAvulsoActions from 'app/main/apps/oficios/store/actions/documento-avulso.actions';
import { Etiqueta } from '@cdk/models/etiqueta.model';

export interface DocumentosAvulsoState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        folderFilter: any;
        listFilter: any;
        etiquetaFilter: Etiqueta[];
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    deletingDocumentoAvulsoIds: number[];
    togglingLidaProcessoIds: number[];
    currentDocumentoAvulsoId: number;
    deletedDocumentoAvulsoIds: number[];
    selectedDocumentoAvulsoIds: number[];
    maximizado: boolean;
}

export const DocumentosAvulsoInitialState: DocumentosAvulsoState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        folderFilter: {},
        listFilter: {},
        etiquetaFilter: [],
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    deletingDocumentoAvulsoIds: [],
    togglingLidaProcessoIds: [],
    deletedDocumentoAvulsoIds: [],
    selectedDocumentoAvulsoIds: [],
    currentDocumentoAvulsoId: null,
    maximizado: false
};

export function DocumentosAvulsoReducer(state = DocumentosAvulsoInitialState, action: DocumentosAvulsoActions.DocumentosAvulsoActionsAll): DocumentosAvulsoState {
    switch (action.type) {

        case DocumentosAvulsoActions.GET_DOCUMENTOS_AVULSO: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    folderFilter: action.payload.folderFilter,
                    listFilter: action.payload.listFilter,
                    etiquetaFilter: action.payload.etiquetaFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case DocumentosAvulsoActions.GET_DOCUMENTOS_AVULSO_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded
            };
        }

        case DocumentosAvulsoActions.GET_DOCUMENTOS_AVULSO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }


        /*case DocumentosAvulsoActions.DELETE_DOCUMENTOS_AVULSO: {
            return {
                ...state,
                deletingDocumentoAvulsoIds: [...state.deletingDocumentoAvulsoIds, action.payload]
            };
        }

        case DocumentosAvulsoActions.DELETE_DOCUMENTOS_AVULSO_SUCCESS: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload);
            const selectedTarefaIds = state.selectedDocumentoAvulsoIds.filter(id => id !== action.payload);
            return {
                ...state,
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                selectedDocumentoAvulsoIds: selectedDocumentoAvulsoIds,
                deletingDocumentoAvulsoIds: state.deletingDocumentoAvulsoIds.filter(id => id !== action.payload),
                deletedDocumentoAvulsoIds: [...state.deletedDocumentoAvulsoIds, action.payload]
            };
        }

        case DocumentosAvulsoActions.DELETE_DOCUMENTOS_AVULSO_FAILED: {
            return {
                ...state,
                deletingDocumentoAvulsoIds: state.deletingDocumentoAvulsoIds.filter(id => id !== action.payload)
            };
        }*/


        /*case ProcessosActions.CHANGE_SELECTED_TAREFAS: {
            return {
                ...state,
                selectedTarefaIds: action.payload
            };
        }

        case ProcessosActions.SET_FOLDER_ON_SELECTED_TAREFAS_SUCCESS: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload.id);
            const selectedTarefaIds = state.selectedTarefaIds.filter(id => id !== action.payload.id);
            return {
                ...state,
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                selectedTarefaIds: selectedTarefaIds
            };
        }



        case TarefasActions.TOGGLE_LIDA_TAREFA: {
            return {
                ...state,
                togglingLidaTarefaIds: [...state.togglingLidaTarefaIds, action.payload]
            };
        }

        case TarefasActions.TOGGLE_LIDA_TAREFA_SUCCESS: {
            return {
                ...state,
                togglingLidaTarefaIds: state.togglingLidaTarefaIds.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.TOGGLE_LIDA_TAREFA_FAILED: {
            return {
                ...state,
                togglingLidaTarefaIds: state.togglingLidaTarefaIds.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.SET_CURRENT_TAREFA: {
            return {
                ...state,
                currentTarefaId: action.payload
            };
        }

        case TarefasActions.TOGGLE_MAXIMIZADO: {
            return {
                ...state,
                maximizado: !state.maximizado
            };
        }*/

        default:
            return state;
    }
}
