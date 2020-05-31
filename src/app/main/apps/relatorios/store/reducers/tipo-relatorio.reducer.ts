import * as TipoRelatoriosActions from 'app/main/apps/relatorios/store/actions/tipo-relatorio.actions';
import {Etiqueta} from '@cdk/models';

export interface TipoRelatoriosState {
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
    deletingTipoRelatorioIds: number[];
    deletedTipoRelatorioIds: number[];
    selectedTipoRelatorioIds: number[];
}

export const TipoRelatoriosInitialState: TipoRelatoriosState = {
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
    deletingTipoRelatorioIds: [],
    deletedTipoRelatorioIds: [],
    selectedTipoRelatorioIds: []
};

export function TipoRelatoriosReducer(state = TipoRelatoriosInitialState, action: TipoRelatoriosActions.TipoRelatoriosActionsAll): TipoRelatoriosState {
    switch (action.type) {

        case TipoRelatoriosActions.UNLOAD_TIPO_RELATORIO: {
            if (action.payload.reset) {
                return {
                    ...TipoRelatoriosInitialState
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

        case TipoRelatoriosActions.GET_TIPO_RELATORIO: {
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

        case TipoRelatoriosActions.GET_TIPO_RELATORIO_SUCCESS: {

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

        case TipoRelatoriosActions.GET_TIPO_RELATORIO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case TipoRelatoriosActions.CHANGE_SELECTED_TIPO_RELATORIO: {
            return {
                ...state,
                selectedTipoRelatorioIds: action.payload
            };
        }

        case TipoRelatoriosActions.DELETE_TIPO_RELATORIO: {
            return {
                ...state,
                deletingTipoRelatorioIds: [...state.deletingTipoRelatorioIds, action.payload]
            };
        }

        case TipoRelatoriosActions.DELETE_TIPO_RELATORIO_SUCCESS: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload);
            const selectedTipoRelatorioIds = state.selectedTipoRelatorioIds.filter(id => id !== action.payload);
            return {
                ...state,
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                selectedTipoRelatorioIds: selectedTipoRelatorioIds,
                deletingTipoRelatorioIds: state.deletingTipoRelatorioIds.filter(id => id !== action.payload),
                deletedTipoRelatorioIds: [...state.deletedTipoRelatorioIds, action.payload]
            };
        }

        case TipoRelatoriosActions.DELETE_TIPO_RELATORIO_FAILED: {
            return {
                ...state,
                deletingTipoRelatorioIds: state.deletingTipoRelatorioIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}

