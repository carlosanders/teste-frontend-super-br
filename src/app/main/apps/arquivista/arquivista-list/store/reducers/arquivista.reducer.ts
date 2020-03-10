import * as ArquivistaActions from 'app/main/apps/arquivista/arquivista-list/store/actions/arquivista.actions';
import {Etiqueta} from '@cdk/models';


export interface ArquivistaState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        listFilter: any;
        etiquetaFilter: Etiqueta[];
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    deletingProcessoIds: number[];
    togglingLidaProcessoIds: number[];
    currentProcessoId: number;
    deletedProcessoIds: number[];
    selectedProcessoIds: number[];
    maximizado: boolean;
}

export const ArquivistaInitialState: ArquivistaState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        listFilter: {},
        etiquetaFilter: [],
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    deletingProcessoIds: [],
    togglingLidaProcessoIds: [],
    deletedProcessoIds: [],
    selectedProcessoIds: [],
    currentProcessoId: null,
    maximizado: false
};

export function ArquivistaReducer(state = ArquivistaInitialState, action: ArquivistaActions.ArquivistaActionsAll): ArquivistaState {
    switch (action.type) {

        case ArquivistaActions.UNLOAD_PROCESSOS: {
            if (action.payload.reset) {
                return {
                    ...ArquivistaInitialState
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

        case ArquivistaActions.GET_PROCESSOS: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    listFilter: action.payload.listFilter,
                    etiquetaFilter: action.payload.etiquetaFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case ArquivistaActions.GET_PROCESSOS_SUCCESS: {

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

        case ArquivistaActions.GET_PROCESSOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ArquivistaActions.CHANGE_SELECTED_PROCESSOS: {
            return {
                ...state,
                selectedProcessoIds: action.payload
            };
        }


        case ArquivistaActions.DELETE_PROCESSO: {
            return {
                ...state,
                deletingProcessoIds: [...state.deletingProcessoIds, action.payload]
            };
        }

        case ArquivistaActions.DELETE_PROCESSO_SUCCESS: {
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

        case ArquivistaActions.DELETE_PROCESSO_FAILED: {
            return {
                ...state,
                deletingProcessoIds: state.deletingProcessoIds.filter(id => id !== action.payload)
            };
        }


        case ArquivistaActions.SET_CURRENT_PROCESSO: {
            return {
                ...state,
                currentProcessoId: action.payload
            };
        }

        case ArquivistaActions.TOGGLE_MAXIMIZADO: {
            return {
                ...state,
                maximizado: !state.maximizado
            };
        }

        default:
            return state;
    }
}
