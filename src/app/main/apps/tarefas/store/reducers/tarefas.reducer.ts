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
    };
    loading: boolean;
    loaded: any;
    deletingTarefaIds: number[];
    togglingLidaTarefaIds: number[];
    currentTarefaId: number;
    deletedTarefaIds: number[];
    selectedTarefaIds: number[];
    maximizado: boolean;
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
    },
    loading: false,
    loaded: false,
    deletingTarefaIds: [],
    togglingLidaTarefaIds: [],
    deletedTarefaIds: [],
    selectedTarefaIds: [],
    currentTarefaId: null,
    maximizado: false
};

export function TarefasReducer(state = TarefasInitialState, action: TarefasActions.TarefasActionsAll): TarefasState {
    switch (action.type) {

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
                    total: state.pagination.total
                }
            };
        }

        case TarefasActions.GET_TAREFAS_SUCCESS: {

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

        case TarefasActions.GET_TAREFAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case TarefasActions.CHANGE_SELECTED_TAREFAS: {
            return {
                ...state,
                selectedTarefaIds: action.payload
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
                selectedTarefaIds: selectedTarefaIds
            };
        }

        case TarefasActions.DELETE_TAREFA: {
            return {
                ...state,
                deletingTarefaIds: [...state.deletingTarefaIds, action.payload]
            };
        }

        case TarefasActions.DELETE_TAREFA_SUCCESS: {
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
                deletingTarefaIds: state.deletingTarefaIds.filter(id => id !== action.payload),
                deletedTarefaIds: [...state.deletedTarefaIds, action.payload]
            };
        }

        case TarefasActions.DELETE_TAREFA_FAILED: {
            return {
                ...state,
                deletingTarefaIds: state.deletingTarefaIds.filter(id => id !== action.payload)
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

        default:
            return state;
    }
}
