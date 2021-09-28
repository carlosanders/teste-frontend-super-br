import * as ServidorEmailListActions from '../actions';

export interface ServidorEmailListState {
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

export const ServidorEmailListInitialState: ServidorEmailListState = {
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

export function ServidorEmailListReducer(
    state = ServidorEmailListInitialState,
    action: ServidorEmailListActions.ServidorEmailListActionsAll
): ServidorEmailListState {
    switch (action.type) {

        case ServidorEmailListActions.GET_SERVIDOR_EMAIL: {
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

        case ServidorEmailListActions.GET_SERVIDOR_EMAIL_SUCCESS: {
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

        case ServidorEmailListActions.GET_SERVIDOR_EMAIL_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ServidorEmailListActions.UNLOAD_SERVIDOR_EMAIL: {
            return {
                ...ServidorEmailListInitialState
            };
        }

        case ServidorEmailListActions.RELOAD_SERVIDOR_EMAIL: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }
}
