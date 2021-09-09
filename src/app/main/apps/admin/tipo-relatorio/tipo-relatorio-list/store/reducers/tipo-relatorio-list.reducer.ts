import * as TipoRelatorioListActions from '../actions';

export interface TipoRelatorioListState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        context: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
}

export const TipoRelatorioListInitialState: TipoRelatorioListState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        context: {},
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
};

export function TipoRelatorioListReducer(
    state = TipoRelatorioListInitialState,
    action: TipoRelatorioListActions.TipoRelatorioListActionsAll
): TipoRelatorioListState {
    switch (action.type) {

        case TipoRelatorioListActions.GET_TIPO_RELATORIO: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    context: action.payload.context,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case TipoRelatorioListActions.GET_TIPO_RELATORIO_SUCCESS: {
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

        case TipoRelatorioListActions.GET_TIPO_RELATORIO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case TipoRelatorioListActions.UNLOAD_TIPO_RELATORIO: {
            return {
                ...TipoRelatorioListInitialState
            };
        }

        case TipoRelatorioListActions.RELOAD_TIPO_RELATORIO: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case TipoRelatorioListActions.DELETE_TIPO_RELATORIO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.tipoRelatorioId]
            };
        }

        case TipoRelatorioListActions.DELETE_TIPO_RELATORIO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case TipoRelatorioListActions.DELETE_TIPO_RELATORIO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
