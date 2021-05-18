import * as UnidadesOrgaoCentralListActions from '../actions';

export interface UnidadesOrgaoCentralListState {
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

export const UnidadesOrgaoCentralListInitialState: UnidadesOrgaoCentralListState = {
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

export function UnidadesOrgaoCentralListReducer(
    state = UnidadesOrgaoCentralListInitialState,
    action: UnidadesOrgaoCentralListActions.UnidadesOrgaoCentralListActionsAll
): UnidadesOrgaoCentralListState {
    switch (action.type) {

        case UnidadesOrgaoCentralListActions.GET_UNIDADES: {
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

        case UnidadesOrgaoCentralListActions.GET_UNIDADES_SUCCESS: {

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

        case UnidadesOrgaoCentralListActions.RELOAD_UNIDADES: {
            return {
                ...UnidadesOrgaoCentralListInitialState
            };
        }

        case UnidadesOrgaoCentralListActions.RELOAD_UNIDADES: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case UnidadesOrgaoCentralListActions.GET_UNIDADES_FAILED: {
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
