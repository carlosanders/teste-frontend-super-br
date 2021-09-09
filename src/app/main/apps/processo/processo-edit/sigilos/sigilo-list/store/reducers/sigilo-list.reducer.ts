import * as SigiloListActions from '../actions';

export interface SigiloListState {
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
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
}

export const SigiloListInitialState: SigiloListState = {
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
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
};

export function SigiloListReducer(
    state = SigiloListInitialState,
    action: SigiloListActions.SigiloListActionsAll
): SigiloListState {
    switch (action.type) {

        case SigiloListActions.GET_SIGILOS: {
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

        case SigiloListActions.GET_SIGILOS_SUCCESS: {

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

        case SigiloListActions.RELOAD_SIGILOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case SigiloListActions.GET_SIGILOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case SigiloListActions.DELETE_SIGILO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.sigiloId]
            };
        }

        case SigiloListActions.DELETE_SIGILO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case SigiloListActions.DELETE_SIGILO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
