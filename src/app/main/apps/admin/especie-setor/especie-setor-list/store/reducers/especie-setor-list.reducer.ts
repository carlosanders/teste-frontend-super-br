import * as EspecieSetorListActions from '../actions';
import * as _ from 'lodash';

export interface EspecieSetorListState {
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

export const EspecieSetorListInitialState: EspecieSetorListState = {
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

export function EspecieSetorListReducer(
    state = EspecieSetorListInitialState,
    action: EspecieSetorListActions.EspecieSetorListActionsAll
): EspecieSetorListState {
    switch (action.type) {

        case EspecieSetorListActions.GET_ESPECIE_SETOR: {
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

        case EspecieSetorListActions.GET_ESPECIE_SETOR_SUCCESS: {
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

        case EspecieSetorListActions.GET_ESPECIE_SETOR_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case EspecieSetorListActions.UNLOAD_ESPECIE_SETOR: {
            return {
                ...EspecieSetorListInitialState
            };
        }


        case EspecieSetorListActions.RELOAD_ESPECIE_SETOR: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case EspecieSetorListActions.DELETE_ESPECIE_SETOR: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.especieSetorId]
            };
        }

        case EspecieSetorListActions.DELETE_ESPECIE_SETOR_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])

            };
        }

        case EspecieSetorListActions.DELETE_ESPECIE_SETOR_FAILED: {
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
