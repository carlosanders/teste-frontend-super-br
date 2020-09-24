import * as TipoDocumentoListActions from '../actions';

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
    deletingIds: []
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

        case TipoDocumentoListActions.RELOAD_TIPO_DOCUMENTO: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case TipoDocumentoListActions.DELETE_TIPO_DOCUMENTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case TipoDocumentoListActions.DELETE_TIPO_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case TipoDocumentoListActions.DELETE_TIPO_DOCUMENTO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
