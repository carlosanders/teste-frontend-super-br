import * as CompetenciasListActions from '../actions';

export interface CompetenciasListState {
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

export const CompetenciasListInitialState: CompetenciasListState = {
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

export function CompetenciasListReducer(
    state = CompetenciasListInitialState,
    action: CompetenciasListActions.CompetenciasListActionsAll
): CompetenciasListState {
    switch (action.type) {

        case CompetenciasListActions.GET_COMPETENCIAS: {
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

        case CompetenciasListActions.GET_COMPETENCIAS_SUCCESS: {

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

        case CompetenciasListActions.RELOAD_COMPETENCIAS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case CompetenciasListActions.GET_COMPETENCIAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case CompetenciasListActions.DELETE_COMPETENCIA: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case CompetenciasListActions.DELETE_COMPETENCIA_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case CompetenciasListActions.DELETE_COMPETENCIA_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
