import * as RepositoriosActions from '../actions/repositorios.actions';

export interface RepositoriosState {
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

export const RepositoriosInitialState: RepositoriosState = {
    entitiesId: [],
    pagination: {
        limit: 10,
        offset: 0,
        filter: {},
        gridFilter: {},
        ckeditorFilter: {},
        populate: ['populateAll', 'modalidadeRepositorio', 'documento', 'documento.componentesDigitais'],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false
};

export function RepositoriosReducer(state = RepositoriosInitialState, action: RepositoriosActions.RepositoriosActionsAll): RepositoriosState {
    switch (action.type) {

        case RepositoriosActions.GET_REPOSITORIOS: {
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

        case RepositoriosActions.GET_REPOSITORIOS_SUCCESS: {

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

        case RepositoriosActions.GET_REPOSITORIOS_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RepositoriosActions.SET_QUERY_REPOSITORIOS: {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    ckeditorFilter: action.payload
                }
            };
        }

        case RepositoriosActions.UNLOAD_REPOSITORIOS: {
            return {
                ...RepositoriosInitialState
            };
        }

        default:
            return state;
    }
}
