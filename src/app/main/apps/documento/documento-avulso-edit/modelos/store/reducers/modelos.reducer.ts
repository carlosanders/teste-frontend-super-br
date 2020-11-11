import * as ModelosActions from '../actions/modelos.actions';

export interface ModelosState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        ckeditorFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
}

export const ModelosInitialState: ModelosState = {
    entitiesId: [],
    pagination: {
        limit: 10,
        offset: 0,
        filter: {},
        gridFilter: {},
        ckeditorFilter: {},
        populate: ['populateAll'],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false
};

export function ModelosReducer(state = ModelosInitialState, action: ModelosActions.ModelosActionsAll): ModelosState {
    switch (action.type) {

        case ModelosActions.GET_MODELOS: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    ckeditorFilter: action.payload.ckeditorFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case ModelosActions.GET_MODELOS_SUCCESS: {

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

        case ModelosActions.GET_MODELOS_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ModelosActions.UNLOAD_MODELOS: {
            return {
                ...ModelosInitialState
            };
        }

        default:
            return state;
    }
}
