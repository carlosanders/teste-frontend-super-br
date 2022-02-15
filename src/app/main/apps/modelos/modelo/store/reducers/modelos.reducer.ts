import * as ModelosActions from 'app/main/apps/modelos/modelo/store/actions/modelos.actions';

export interface ModelosState {
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

export const modelosInitialState: ModelosState = {
    entitiesId: [],
    pagination: {
        limit: 10,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false
};

export const modelosReducer = (state = modelosInitialState, action: ModelosActions.ModelosActionsAll): ModelosState => {
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
            return {...modelosInitialState};
        }

        default:
            return state;
    }
};
