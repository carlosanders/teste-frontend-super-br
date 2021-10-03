import * as ContaEmailListActions from '../actions';

export interface ContaEmailListState {
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

export const ContaEmailListInitialState: ContaEmailListState = {
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

export function ContaEmailListReducer(
    state = ContaEmailListInitialState,
    action: ContaEmailListActions.ContaEmailListActionsAll
): ContaEmailListState {
    switch (action.type) {

        case ContaEmailListActions.GET_CONTA_EMAIL: {
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

        case ContaEmailListActions.GET_CONTA_EMAIL_SUCCESS: {
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

        case ContaEmailListActions.GET_CONTA_EMAIL_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ContaEmailListActions.UNLOAD_CONTA_EMAIL: {
            return {
                ...ContaEmailListInitialState
            };
        }

        case ContaEmailListActions.RELOAD_CONTA_EMAIL: {
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
