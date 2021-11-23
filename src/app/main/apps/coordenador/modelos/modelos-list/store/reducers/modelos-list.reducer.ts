import * as ModelosListActions from '../actions';
import * as _ from 'lodash';

export interface ModelosListState {
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

export const ModelosListInitialState: ModelosListState = {
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

export function ModelosListReducer(
    state = ModelosListInitialState,
    action: ModelosListActions.ModelosListActionsAll
): ModelosListState {
    switch (action.type) {

        case ModelosListActions.GET_MODELOS: {
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

        case ModelosListActions.GET_MODELOS_SUCCESS: {

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

        case ModelosListActions.UNLOAD_MODELOS: {
            return {
                ...ModelosListInitialState
            };
        }

        case ModelosListActions.RELOAD_MODELOS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case ModelosListActions.GET_MODELOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ModelosListActions.DELETE_MODELO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.modeloId]
            };
        }

        case ModelosListActions.DELETE_MODELO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case ModelosListActions.DELETE_MODELO_FAILED: {
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
