import * as RegraEtiquetaListActions from '../actions';
import * as _ from 'lodash';

export interface RegraEtiquetaListState {
    entitiesId: number[];
    etiquetaId: number;
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

export const RegraEtiquetaListInitialState: RegraEtiquetaListState = {
    entitiesId: [],
    etiquetaId: null,
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

export function RegraEtiquetaListReducer(
    state = RegraEtiquetaListInitialState,
    action: RegraEtiquetaListActions.RegraEtiquetaListActionsAll
): RegraEtiquetaListState {
    switch (action.type) {

        case RegraEtiquetaListActions.GET_REGRAS_ETIQUETA: {
            return {
                ...state,
                loading: true,
                etiquetaId: action.payload,
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

        case RegraEtiquetaListActions.GET_REGRAS_ETIQUETA_SUCCESS: {

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

        case RegraEtiquetaListActions.RELOAD_REGRAS_ETIQUETA: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case RegraEtiquetaListActions.UNLOAD_REGRAS_ETIQUETA: {
            return {
                ...RegraEtiquetaListInitialState
            };
        }
        case RegraEtiquetaListActions.GET_REGRAS_ETIQUETA_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RegraEtiquetaListActions.DELETE_REGRA_ETIQUETA: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.regraEtiquetaId]
            };
        }

        case RegraEtiquetaListActions.DELETE_REGRA_ETIQUETA_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload]),
                entitiesId: state.entitiesId.filter(id => id !== action.payload)
            };
        }

        case RegraEtiquetaListActions.DELETE_REGRA_ETIQUETA_FAILED: {
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
