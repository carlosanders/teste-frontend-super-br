import * as EtiquetaListActions from '../actions';
import * as _ from 'lodash';

export interface EtiquetaListState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        sort: any;
        total: number;
        context: any;
    };
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
}

export const EtiquetaListInitialState: EtiquetaListState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
        context: {}
    },
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
};

export function EtiquetaListReducer(
    state = EtiquetaListInitialState,
    action: EtiquetaListActions.EtiquetaListActionsAll
): EtiquetaListState {
    switch (action.type) {

        case EtiquetaListActions.GET_ETIQUETAS: {
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
                    total: state.pagination.total,
                    context: action.payload.context
                }
            };
        }

        case EtiquetaListActions.GET_ETIQUETAS_SUCCESS: {

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

        case EtiquetaListActions.UNLOAD_ETIQUETAS: {
            return {
                ...EtiquetaListInitialState
            };
        }

        case EtiquetaListActions.RELOAD_ETIQUETAS: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case EtiquetaListActions.GET_ETIQUETAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case EtiquetaListActions.DELETE_ETIQUETA: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.etiquetaId]
            };
        }

        case EtiquetaListActions.DELETE_ETIQUETA_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case EtiquetaListActions.DELETE_ETIQUETA_FAILED: {
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
