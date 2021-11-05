import * as TipoDocumentoListActions from '../actions';
import * as _ from 'lodash';

export interface TipoDocumentoListState {
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

export const TipoDocumentoListInitialState: TipoDocumentoListState = {
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

export function TipoDocumentoListReducer(
    state = TipoDocumentoListInitialState,
    action: TipoDocumentoListActions.TipoDocumentoListActionsAll
): TipoDocumentoListState {
    switch (action.type) {

        case TipoDocumentoListActions.GET_TIPO_DOCUMENTO: {
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

        case TipoDocumentoListActions.GET_TIPO_DOCUMENTO_SUCCESS: {
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

        case TipoDocumentoListActions.GET_TIPO_DOCUMENTO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case TipoDocumentoListActions.UNLOAD_TIPO_DOCUMENTO: {
            return {
                ...TipoDocumentoListInitialState
            };
        }

        case TipoDocumentoListActions.RELOAD_TIPO_DOCUMENTO: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case TipoDocumentoListActions.DELETE_TIPO_DOCUMENTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.tipoDocumentoId]
            };
        }

        case TipoDocumentoListActions.DELETE_TIPO_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case TipoDocumentoListActions.DELETE_TIPO_DOCUMENTO_FAILED: {
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
