import * as AvisoListActions from '../actions';

export interface AvisoListState {
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
}

export const AvisoListInitialState: AvisoListState = {
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
    deletingIds: []
};

export function AvisoListReducer(
    state = AvisoListInitialState,
    action: AvisoListActions.AvisoListActionsAll
): AvisoListState {
    switch (action.type) {

        case AvisoListActions.GET_AVISO: {
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

        case AvisoListActions.GET_AVISO_SUCCESS: {
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

        case AvisoListActions.GET_AVISO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AvisoListActions.UNLOAD_AVISO: {
            return {
                ...AvisoListInitialState
            };
        }

        case AvisoListActions.RELOAD_AVISO: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AvisoListActions.DELETE_AVISO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.avisoId]
            };
        }

        case AvisoListActions.DELETE_AVISO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case AvisoListActions.DELETE_AVISO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
