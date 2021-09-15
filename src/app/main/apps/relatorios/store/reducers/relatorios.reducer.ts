import * as RelatoriosActions from 'app/main/apps/relatorios/store/actions/relatorios.actions';
import {Etiqueta} from '@cdk/models';

export interface RelatoriosState {
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
    deletingRelatorioIds: number[];
    togglingLidaRelatorioIds: number[];
    currentRelatorioId: number;
    deletedRelatorioIds: number[];
    selectedRelatorioIds: number[];
    loadedRelatorioIds: number;
    maximizado: boolean;
}

export const RelatoriosInitialState: RelatoriosState = {
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
    deletingRelatorioIds: [],
    togglingLidaRelatorioIds: [],
    deletedRelatorioIds: [],
    selectedRelatorioIds: [],
    currentRelatorioId: null,
    loadedRelatorioIds: null,
    maximizado: false
};

export function RelatoriosReducer(state = RelatoriosInitialState, action: RelatoriosActions.RelatoriosActionsAll): RelatoriosState {
    switch (action.type) {

        case RelatoriosActions.UNLOAD_RELATORIOS: {
            if (action.payload.reset) {
                return {
                    ...RelatoriosInitialState
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

        case RelatoriosActions.GET_RELATORIOS: {
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

        case RelatoriosActions.GET_RELATORIOS_SUCCESS: {

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

        case RelatoriosActions.GET_RELATORIOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RelatoriosActions.CHANGE_SELECTED_RELATORIOS: {
            return {
                ...state,
                selectedRelatorioIds: action.payload
            };
        }

        case RelatoriosActions.SET_FOLDER_ON_SELECTED_RELATORIOS_SUCCESS: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload.id);
            const selectedRelatorioIds = state.selectedRelatorioIds.filter(id => id !== action.payload.id);
            return {
                ...state,
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                selectedRelatorioIds: selectedRelatorioIds
            };
        }

        case RelatoriosActions.DELETE_RELATORIO: {
            return {
                ...state,
                deletingRelatorioIds: [...state.deletingRelatorioIds, action.payload.relatorioId]
            };
        }

        case RelatoriosActions.DELETE_RELATORIO_SUCCESS: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload);
            const selectedRelatorioIds = state.selectedRelatorioIds.filter(id => id !== action.payload);
            return {
                ...state,
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                selectedRelatorioIds: selectedRelatorioIds,
                deletingRelatorioIds: state.deletingRelatorioIds.filter(id => id !== action.payload),
                deletedRelatorioIds: [...state.deletedRelatorioIds, action.payload]
            };
        }

        case RelatoriosActions.DELETE_RELATORIO_FAILED: {
            return {
                ...state,
                deletingRelatorioIds: state.deletingRelatorioIds.filter(id => id !== action.payload.id)
            };
        }

        case RelatoriosActions.SET_CURRENT_RELATORIO: {
            return {
                ...state,
                currentRelatorioId: action.payload
            };
        }

        case RelatoriosActions.TOGGLE_MAXIMIZADO: {
            return {
                ...state,
                maximizado: action.payload
            };
        }

        case RelatoriosActions.LOADED_RELATORIO_SUCESS: {
            return {
                ...state,
                loadedRelatorioIds: action.payload
            };
        }

        default:
            return state;
    }
}

