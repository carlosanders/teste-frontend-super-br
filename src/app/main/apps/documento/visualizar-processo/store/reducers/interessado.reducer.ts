import * as InteressadoActions from '../actions/interessado.actions';

export interface InteressadoState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        listFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
}

export const interessadoInitialState: InteressadoState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        listFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false
};

export const interessadoReducer = (state = interessadoInitialState, action: InteressadoActions.InteressadoActionsAll): InteressadoState => {
    switch (action.type) {

        case InteressadoActions.GET_INTERESSADOS: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    listFilter: action.payload.listFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case InteressadoActions.GET_INTERESSADOS_SUCCESS: {

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

        case InteressadoActions.GET_INTERESSADOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case InteressadoActions.UNLOAD_INTERESSADOS: {

            if (action.payload.reset) {
                return {
                    ...interessadoInitialState
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

        default:
            return state;
    }
};
