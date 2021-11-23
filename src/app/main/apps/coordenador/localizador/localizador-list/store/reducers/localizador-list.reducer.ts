import * as LocalizadorListActions from '../actions';
import * as _ from 'lodash';

export interface LocalizadorListState {
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

export const LocalizadorListInitialState: LocalizadorListState = {
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

export function LocalizadorListReducer(
    state = LocalizadorListInitialState,
    action: LocalizadorListActions.LocalizadorListActionsAll
): LocalizadorListState {
    switch (action.type) {

        case LocalizadorListActions.GET_LOCALIZADORES: {
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

        case LocalizadorListActions.GET_LOCALIZADORES_SUCCESS: {

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

        case LocalizadorListActions.RELOAD_LOCALIZADORES: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case LocalizadorListActions.GET_LOCALIZADORES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case LocalizadorListActions.DELETE_LOCALIZADOR: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.localizadorId]
            };
        }

        case LocalizadorListActions.DELETE_LOCALIZADOR_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case LocalizadorListActions.DELETE_LOCALIZADOR_FAILED: {
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
