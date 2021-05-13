import * as AssuntoListActions from '../actions';

export interface AssuntoListState {
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

export const AssuntoListInitialState: AssuntoListState = {
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

export function AssuntoListReducer(
    state = AssuntoListInitialState,
    action: AssuntoListActions.AssuntoListActionsAll
): AssuntoListState {
    switch (action.type) {

        case AssuntoListActions.GET_ASSUNTOS: {
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

        case AssuntoListActions.GET_ASSUNTOS_SUCCESS: {

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

        case AssuntoListActions.RELOAD_ASSUNTOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AssuntoListActions.GET_ASSUNTOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AssuntoListActions.DELETE_ASSUNTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case AssuntoListActions.DELETE_ASSUNTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case AssuntoListActions.DELETE_ASSUNTO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
