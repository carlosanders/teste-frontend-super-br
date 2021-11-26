import * as HistoricoConfigListActions from '../actions';

export interface HistoricoConfigListState {
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
}

export const HistoricoConfigListInitialState: HistoricoConfigListState = {
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
};

export function HistoricoConfigListReducer(
    state = HistoricoConfigListInitialState,
    action: HistoricoConfigListActions.HistoricoConfigListActionsAll
): HistoricoConfigListState {
    switch (action.type) {

        case HistoricoConfigListActions.GET_HISTORICO_CONFIG: {
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

        case HistoricoConfigListActions.GET_HISTORICO_CONFIG_SUCCESS: {

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

        case HistoricoConfigListActions.UNLOAD_HISTORICO_CONFIG: {
            return {
                ...HistoricoConfigListInitialState
            };
        }

        case HistoricoConfigListActions.RELOAD_HISTORICO_CONFIG: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case HistoricoConfigListActions.GET_HISTORICO_CONFIG_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
        default:
            return state;
    }
}
