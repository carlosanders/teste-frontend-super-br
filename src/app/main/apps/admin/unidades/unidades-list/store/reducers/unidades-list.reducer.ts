import * as UnidadesListActions from '../actions';

export interface UnidadesListState {
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

export const UnidadesListInitialState: UnidadesListState = {
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

export function UnidadesListReducer(
    state = UnidadesListInitialState,
    action: UnidadesListActions.UnidadesListActionsAll
): UnidadesListState {
    switch (action.type) {

        case UnidadesListActions.GET_UNIDADES: {
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

        case UnidadesListActions.GET_UNIDADES_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                deletingErrors: {},
                loading: false,
                loaded
            };
        }

        case UnidadesListActions.UNLOAD_UNIDADES: {
            return {
                ...UnidadesListInitialState
            };
        }

        case UnidadesListActions.RELOAD_UNIDADES: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case UnidadesListActions.GET_UNIDADES_FAILED: {
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
