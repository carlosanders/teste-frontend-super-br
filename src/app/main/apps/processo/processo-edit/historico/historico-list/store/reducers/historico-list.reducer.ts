import * as HistoricoListActions from '../actions';

export interface HistoricoListState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
}

export const HistoricoListInitialState: HistoricoListState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
};

export function HistoricoListReducer(
    state = HistoricoListInitialState,
    action: HistoricoListActions.HistoricoListActionsAll
): HistoricoListState {
    switch (action.type) {

        case HistoricoListActions.GET_HISTORICOS: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case HistoricoListActions.GET_HISTORICOS_SUCCESS: {

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

        case HistoricoListActions.RELOAD_HISTORICOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case HistoricoListActions.UNLOAD_HISTORICOS: {
            return {
                ...HistoricoListInitialState
            };
        }

        case HistoricoListActions.GET_HISTORICOS_FAILED: {
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
