import * as ModelosEspecieSetorListActions from '../actions';
import * as _ from 'lodash';

export interface ModelosEspecieSetorListState {
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

export const ModelosEspecieSetorListInitialState: ModelosEspecieSetorListState = {
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

export function ModelosEspecieSetorListReducer(
    state = ModelosEspecieSetorListInitialState,
    action: ModelosEspecieSetorListActions.ModelosEspecieSetorActionsAll
): ModelosEspecieSetorListState {
    switch (action.type) {

        case ModelosEspecieSetorListActions.GET_MODELOS_ESPECIE_SETOR: {
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

        case ModelosEspecieSetorListActions.GET_MODELOS_ESPECIE_SETOR_SUCCESS: {

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

        case ModelosEspecieSetorListActions.UNLOAD_MODELOS_ESPECIE_SETOR: {
            return {
                ...ModelosEspecieSetorListInitialState
            };
        }

        case ModelosEspecieSetorListActions.RELOAD_MODELOS_ESPECIE_SETOR: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case ModelosEspecieSetorListActions.GET_MODELOS_ESPECIE_SETOR_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ModelosEspecieSetorListActions.DELETE_MODELO_ESPECIE_SETOR: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.vinculacaoModeloId]
            };
        }

        case ModelosEspecieSetorListActions.DELETE_MODELO_ESPECIE_SETOR_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case ModelosEspecieSetorListActions.DELETE_MODELO_ESPECIE_SETOR_FAILED: {
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
