import * as CompetenciasListActions from '../actions';
import * as _ from 'lodash';

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
                deletingErrors: {},
                loading: false,
                loaded
            };
        }

        case CompetenciasListActions.RELOAD_COMPETENCIAS: {
            return {
                ...state,
                deletingErrors: {},
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
                deletingIds: [...state.deletingIds, action.payload.competenciaId]
            };
        }

        case CompetenciasListActions.DELETE_COMPETENCIA_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case CompetenciasListActions.DELETE_COMPETENCIA_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                }
            };
        }

        default:
            return state;
    }
}
