import * as TarefasActions from 'app/main/apps/tarefas/store/actions/tarefas.actions';
import {Etiqueta} from '@cdk/models';

export interface TarefasState {
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
        context: any;
    };
    loading: boolean;
    loaded: any;
    deletingTarefaIds: number[];
    bufferingDelete: number;
    changingFolderTarefaIds: number[];
    togglingLidaTarefaIds: number[];
    currentTarefaId: number;
    deletedTarefaIds: number[];
    selectedTarefaIds: number[];
    maximizado: boolean;
    loadingAssuntosProcessosId: number[];
    cienciaTarefaIds: number[];
    error: any;
    errorDelete: number[];
}

export const TarefasInitialState: TarefasState = {
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
        context: {}
    },
    loading: false,
    loaded: false,
    deletingTarefaIds: [],
    changingFolderTarefaIds: [],
    togglingLidaTarefaIds: [],
    bufferingDelete: 0,
    deletedTarefaIds: [],
    selectedTarefaIds: [],
    currentTarefaId: null,
    maximizado: false,
    loadingAssuntosProcessosId: [],
    cienciaTarefaIds: [],
    error: null,
    errorDelete: []
};

export function TarefasReducer(state = TarefasInitialState, action: TarefasActions.TarefasActionsAll): TarefasState {
    switch (action.type) {

        case TarefasActions.UNLOAD_TAREFAS: {
            if (action.payload.reset) {
                return {
                    ...TarefasInitialState
                };
            } else {
                return {
                    ...state,
                    entitiesId: [],
                    pagination: {
                        ...state.pagination,
                        limit: 10,
                        offset: 0,
                        total: 0
                    }
                };
            }
        }

        case TarefasActions.GET_TAREFAS: {
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
                    total: state.pagination.total,
                    context: action.payload.context
                },
                error: null
            };
        }

        case TarefasActions.GET_TAREFAS_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded,
                errorDelete: []
            };
        }

        case TarefasActions.GET_TAREFAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                errorDelete: []
            };
        }

        case TarefasActions.CHANGE_SELECTED_TAREFAS: {
            return {
                ...state,
                selectedTarefaIds: action.payload,

            };
        }

        case TarefasActions.SET_FOLDER_ON_SELECTED_TAREFAS: {
            return {
                ...state,
                changingFolderTarefaIds: [...state.changingFolderTarefaIds, action.payload.tarefa.id]
            };
        }

        case TarefasActions.SET_FOLDER_ON_SELECTED_TAREFAS_SUCCESS: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload.id);
            const selectedTarefaIds = state.selectedTarefaIds.filter(id => id !== action.payload.id);
            return {
                ...state,
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                selectedTarefaIds: selectedTarefaIds,
                changingFolderTarefaIds: state.changingFolderTarefaIds.filter(id => id !== action.payload.id),
            };
        }

        case TarefasActions.SET_FOLDER_ON_SELECTED_TAREFAS_FAILED: {
            return {
                ...state,
                changingFolderTarefaIds: state.changingFolderTarefaIds.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.DELETE_TAREFA: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload.tarefaId);
            const selectedTarefaIds = state.selectedTarefaIds.filter(id => id !== action.payload.tarefaId);
            return {
                ...state,
                entitiesId: entitiesId,
                selectedTarefaIds: selectedTarefaIds,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                deletingTarefaIds: [...state.deletingTarefaIds, action.payload.tarefaId],
                error: null
            };
        }

        case TarefasActions.DELETE_TAREFA_SUCCESS: {
            return {
                ...state,
                deletingTarefaIds: state.deletingTarefaIds.filter(id => id !== action.payload),
                errorDelete: [],
                error: null
            };
        }

        case TarefasActions.DELETE_TAREFA_FAILED: {
            return {
                ...state,
                errorDelete: [...state.errorDelete, action.payload.id],
                deletingTarefaIds: state.deletingTarefaIds.filter(id => id !== action.payload.id),
                entitiesId: [...state.entitiesId, action.payload.id],
                error: action.payload.error
            };
        }

        case TarefasActions.DELETE_TAREFA_CANCEL: {
            return {
                ...state,
                deletingTarefaIds: [],
                bufferingDelete: state.bufferingDelete + 1,
                errorDelete: [],
                error: null
            };
        }

        case TarefasActions.DELETE_TAREFA_FLUSH: {
            return {
                ...state,
                bufferingDelete: state.bufferingDelete + 1
            };
        }

        case TarefasActions.DELETE_TAREFA_CANCEL_SUCCESS: {
            return {
                ...state,
                entitiesId: [...state.entitiesId, action.payload],
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total + 1
                },
            };
        }

        case TarefasActions.REMOVE_TAREFA: {
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
        }

        case TarefasActions.GET_ASSUNTOS_PROCESSO_TAREFA: {

            return {
                ...state,
                // tslint:disable-next-line:max-line-length
                loadingAssuntosProcessosId: (state.loadingAssuntosProcessosId.indexOf(action.payload.processoId) === -1 ? [...state.loadingAssuntosProcessosId, action.payload.processoId] : [...state.loadingAssuntosProcessosId])
            };
        }

        case TarefasActions.GET_ASSUNTOS_PROCESSO_TAREFA_SUCCESS: {
            return {
                ...state,
                loadingAssuntosProcessosId: state.loadingAssuntosProcessosId.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.GET_ASSUNTOS_PROCESSO_TAREFA_FAILED: {
            return {
                ...state,
                loadingAssuntosProcessosId: state.loadingAssuntosProcessosId.filter(id => id !== action.payload)
            };

        }

        case TarefasActions.DAR_CIENCIA_TAREFA: {
            return {
                ...state,
                cienciaTarefaIds: [...state.cienciaTarefaIds, action.payload.id]
            };
        }

        case TarefasActions.DAR_CIENCIA_TAREFA_SUCCESS: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload);
            const selectedTarefaIds = state.selectedTarefaIds.filter(id => id !== action.payload);
            return {
                ...state,
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                selectedTarefaIds: selectedTarefaIds,
                cienciaTarefaIds: [...state.cienciaTarefaIds, action.payload]
            };
        }

        case TarefasActions.DAR_CIENCIA_TAREFA_FAILED: {
            return {
                ...state,
                cienciaTarefaIds: state.cienciaTarefaIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}

