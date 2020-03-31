import * as ProcessosActions from '../actions';
import {Etiqueta} from '@cdk/models';

export interface ProcessosState {
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
    /*
    * ISSUE-107
    */
   assuntoLoading: boolean;
   assuntoPanelOpen: boolean;
   assuntosId: number[];
   idTarefaToLoadAssuntos: number;
}

export const ProcessosInitialState: ProcessosState = {
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
    maximizado: false,
    /*
    * ISSUE-107
    */
   assuntoLoading: true,
   assuntoPanelOpen: false,
   assuntosId: [],
   idTarefaToLoadAssuntos: 0
};

export function ProtocolosExternosReducer(state = ProcessosInitialState, action: ProcessosActions.TarefasActionsAll): ProcessosState {
    switch (action.type) {

        case ProcessosActions.UNLOAD_PROCESSOS: {
            if (action.payload.reset) {
                return {
                    ...ProcessosInitialState
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

        case ProcessosActions.GET_PROCESSOS: {
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

        case ProcessosActions.GET_PROCESSOS_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded
            };
        }

        case ProcessosActions.GET_PROCESSOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        // case ProcessosActions.CHANGE_SELECTED_TAREFAS: {
        //     return {
        //         ...state,
        //         selectedTarefaIds: action.payload
        //     };
        // }
        //
        // case ProcessosActions.SET_FOLDER_ON_SELECTED_TAREFAS_SUCCESS: {
        //     const entitiesId = state.entitiesId.filter(id => id !== action.payload.id);
        //     const selectedTarefaIds = state.selectedTarefaIds.filter(id => id !== action.payload.id);
        //     return {
        //         ...state,
        //         entitiesId: entitiesId,
        //         pagination: {
        //             ...state.pagination,
        //             total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
        //         },
        //         selectedTarefaIds: selectedTarefaIds
        //     };
        // }
        //
        // case ProcessosActions.DELETE_TAREFA: {
        //     return {
        //         ...state,
        //         deletingTarefaIds: [...state.deletingTarefaIds, action.payload]
        //     };
        // }
        //
        // case ProcessosActions.DELETE_TAREFA_SUCCESS: {
        //     const entitiesId = state.entitiesId.filter(id => id !== action.payload);
        //     const selectedTarefaIds = state.selectedTarefaIds.filter(id => id !== action.payload);
        //     return {
        //         ...state,
        //         entitiesId: entitiesId,
        //         pagination: {
        //             ...state.pagination,
        //             total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
        //         },
        //         selectedTarefaIds: selectedTarefaIds,
        //         deletingTarefaIds: state.deletingTarefaIds.filter(id => id !== action.payload),
        //         deletedTarefaIds: [...state.deletedTarefaIds, action.payload]
        //     };
        // }
        //
        // case ProcessosActions.DELETE_TAREFA_FAILED: {
        //     return {
        //         ...state,
        //         deletingTarefaIds: state.deletingTarefaIds.filter(id => id !== action.payload)
        //     };
        // }
        //
        // case ProcessosActions.TOGGLE_LIDA_TAREFA: {
        //     return {
        //         ...state,
        //         togglingLidaTarefaIds: [...state.togglingLidaTarefaIds, action.payload]
        //     };
        // }
        //
        // case ProcessosActions.TOGGLE_LIDA_TAREFA_SUCCESS: {
        //     return {
        //         ...state,
        //         togglingLidaTarefaIds: state.togglingLidaTarefaIds.filter(id => id !== action.payload)
        //     };
        // }
        //
        // case ProcessosActions.TOGGLE_LIDA_TAREFA_FAILED: {
        //     return {
        //         ...state,
        //         togglingLidaTarefaIds: state.togglingLidaTarefaIds.filter(id => id !== action.payload)
        //     };
        // }
        //
        // case ProcessosActions.SET_CURRENT_TAREFA: {
        //     return {
        //         ...state,
        //         currentTarefaId: action.payload
        //     };
        // }
        //
        // case ProcessosActions.TOGGLE_MAXIMIZADO: {
        //     return {
        //         ...state,
        //         maximizado: !state.maximizado
        //     };
        // }
        //
        // /*
        // * ISSUE-107
        // */
        // case ProcessosActions.GET_ASSUNTOS_PROCESSO_TAREFA: {
        //     return {
        //         ...state,
        //         assuntosId: [],
        //         assuntoLoading: true,
        //         //assuntoPanelOpen: false
        //         assuntoPanelOpen: action.payload.tarefa === state.idTarefaToLoadAssuntos
        //     }
        //
        //
        // }
        //
        // case ProcessosActions.GET_ASSUNTOS_PROCESSO_TAREFA_SUCCESS: {
        //     return {
        //         ...state,
        //         assuntoLoading: false,
        //         assuntoPanelOpen: true,
        //         assuntosId: [...action.payload.assuntosId],
        //         idTarefaToLoadAssuntos: action.payload.idTarefaToLoadAssuntos
        //     }
        //
        // }
        //
        // case ProcessosActions.GET_ASSUNTOS_PROCESSO_TAREFA_FAILED: {
        //     return {
        //         ...state,
        //
        //         assuntoLoading: false,
        //         assuntoPanelOpen: false
        //     }
        //
        // }
        //
        // case ProcessosActions.SET_ASSUNTOS_LOADED: {
        //     return {
        //         ...state,
        //         assuntoLoading: false
        //     }
        //
        // }

        default:
            return state;
    }
}

