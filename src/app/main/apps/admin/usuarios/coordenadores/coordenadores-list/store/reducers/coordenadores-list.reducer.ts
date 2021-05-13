import * as CoordenadoresListActions from '../actions';

export interface CoordenadoresListState {
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

export const CoordenadoresListInitialState: CoordenadoresListState = {
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

export function CoordenadoresListReducer(
    state = CoordenadoresListInitialState,
    action: CoordenadoresListActions.CoordenadoresListActionsAll
): CoordenadoresListState {
    switch (action.type) {

        case CoordenadoresListActions.GET_COORDENADORES: {
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

        case CoordenadoresListActions.GET_COORDENADORES_SUCCESS: {

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

        case CoordenadoresListActions.RELOAD_COORDENADORES: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case CoordenadoresListActions.GET_COORDENADORES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case CoordenadoresListActions.DELETE_COORDENADOR: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case CoordenadoresListActions.DELETE_COORDENADOR_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case CoordenadoresListActions.DELETE_COORDENADOR_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
