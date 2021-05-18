import * as MunicipioListActions from '../actions';

export interface MunicipioListState {
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

export const MunicipioListInitialState: MunicipioListState = {
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

export function MunicipioListReducer(
    state = MunicipioListInitialState,
    action: MunicipioListActions.MunicipioListActionsAll
): MunicipioListState {
    switch (action.type) {

        case MunicipioListActions.GET_MUNICIPIO: {
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

        case MunicipioListActions.GET_MUNICIPIO_SUCCESS: {
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

        case MunicipioListActions.GET_MUNICIPIO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case MunicipioListActions.UNLOAD_MUNICIPIO: {
            return {
                ...MunicipioListInitialState
            };
        }


        case MunicipioListActions.RELOAD_MUNICIPIO: {
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
