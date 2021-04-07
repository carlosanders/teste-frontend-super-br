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
    loadedPessoa: any;
    deletingProcessoIds: number[];
    togglingLidaProcessoIds: number[];
    currentProcessoId: number;
    deletedProcessoIds: number[];
    selectedProcessoIds: number[];
    maximizado: boolean;
    loadingAssuntosProcessosId: number[];
    loadingInteressadosProcessosId: number[];
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
    loadedPessoa: false,
    deletingProcessoIds: [],
    togglingLidaProcessoIds: [],
    deletedProcessoIds: [],
    selectedProcessoIds: [],
    currentProcessoId: null,
    maximizado: false,
    loadingAssuntosProcessosId: [],
    loadingInteressadosProcessosId: []
};

export function ProtocolosExternosReducer(state = ProcessosInitialState, action: ProcessosActions.ProcessosActionsAll): ProcessosState {
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

        case ProcessosActions.CHANGE_SELECTED_PROCESSOS: {
            return {
                ...state,
                selectedProcessoIds: action.payload
            };
        }

        case ProcessosActions.DELETE_PROCESSO: {
            return {
                ...state,
                deletingProcessoIds: [...state.deletingProcessoIds, action.payload]
            };
        }

        case ProcessosActions.DELETE_PROCESSO_SUCCESS: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload);
            const selectedProcessoIds = state.selectedProcessoIds.filter(id => id !== action.payload);
            return {
                ...state,
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                selectedProcessoIds: selectedProcessoIds,
                deletingProcessoIds: state.deletingProcessoIds.filter(id => id !== action.payload),
                deletedProcessoIds: [...state.deletedProcessoIds, action.payload]
            };
        }

        case ProcessosActions.DELETE_PROCESSO_FAILED: {
            return {
                ...state,
                deletingProcessoIds: state.deletingProcessoIds.filter(id => id !== action.payload)
            };
        }

        case ProcessosActions.TOGGLE_LIDA_PROCESSO: {
            return {
                ...state,
                togglingLidaProcessoIds: [...state.togglingLidaProcessoIds, action.payload]
            };
        }

        case ProcessosActions.TOGGLE_LIDA_PROCESSO_SUCCESS: {
            return {
                ...state,
                togglingLidaProcessoIds: state.togglingLidaProcessoIds.filter(id => id !== action.payload)
            };
        }

        case ProcessosActions.TOGGLE_LIDA_PROCESSO_FAILED: {
            return {
                ...state,
                togglingLidaProcessoIds: state.togglingLidaProcessoIds.filter(id => id !== action.payload)
            };
        }

        case ProcessosActions.SET_CURRENT_PROCESSO: {
            return {
                ...state,
                currentProcessoId: action.payload
            };
        }

        case ProcessosActions.TOGGLE_MAXIMIZADO: {
            return {
                ...state,
                maximizado: action.payload
            };
        }

        case ProcessosActions.GET_ASSUNTOS_PROCESSO: {
            return {
                ...state,
                loadingAssuntosProcessosId: (state.loadingAssuntosProcessosId.indexOf(action.payload.processoId) === -1
                    ? [...state.loadingAssuntosProcessosId, action.payload.processoId] : [...state.loadingAssuntosProcessosId])
            };
        }

        case ProcessosActions.GET_ASSUNTOS_PROCESSO_SUCCESS: {
            return {
                ...state,
                loadingAssuntosProcessosId: state.loadingAssuntosProcessosId.filter(id => id !== action.payload)
            };
        }

        case ProcessosActions.GET_ASSUNTOS_PROCESSO_FAILED: {
            return {
                ...state,
                loadingAssuntosProcessosId: state.loadingAssuntosProcessosId.filter(id => id !== action.payload)
            };
        }

        case ProcessosActions.GET_INTERESSADOS_PROCESSO: {
            return {
                ...state,
                loadingInteressadosProcessosId: (state.loadingInteressadosProcessosId.indexOf(action.payload.processoId) === -1
                    ? [...state.loadingInteressadosProcessosId, action.payload.processoId] : [...state.loadingInteressadosProcessosId])
            };
        }

        case ProcessosActions.GET_INTERESSADOS_PROCESSO_SUCCESS: {
            return {
                ...state,
                loadingInteressadosProcessosId: state.loadingInteressadosProcessosId.filter(id => id !== action.payload)
            };
        }

        case ProcessosActions.GET_INTERESSADOS_PROCESSO_FAILED: {
            return {
                ...state,
                loadingInteressadosProcessosId: state.loadingInteressadosProcessosId.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}

