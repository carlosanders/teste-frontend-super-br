import * as ModeloListActions from '../actions';
import * as _ from 'lodash';

export interface ModeloListState {
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

export const ModeloListInitialState: ModeloListState = {
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

export function ModeloListReducer(
    state = ModeloListInitialState,
    action: ModeloListActions.ModeloListActionsAll
): ModeloListState {
    switch (action.type) {

        case ModeloListActions.GET_MODELOS: {
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

        case ModeloListActions.GET_MODELOS_SUCCESS: {

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

        case ModeloListActions.UNLOAD_MODELOS: {
            return {
                ...ModeloListInitialState
            };
        }

        case ModeloListActions.RELOAD_MODELOS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case ModeloListActions.GET_MODELOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ModeloListActions.DELETE_MODELO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case ModeloListActions.DELETE_MODELO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case ModeloListActions.DELETE_MODELO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== parseInt(Object.keys(action.payload)[0])),
                deletingErrors: {
                    ...state.deletingErrors,
                    ...action.payload
                }
            };
        }

        default:
            return state;
    }
}
