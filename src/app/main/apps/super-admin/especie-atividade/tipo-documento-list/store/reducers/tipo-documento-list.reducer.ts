import * as TipoDocumentoListActions from '../actions/tipo-documento-list.actions';
import * as EspecieAtividadeListActions from '../../../especie-atividade-list/store/actions';

export interface TipoDocumentoListState {
    entityId: number;
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
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
}

export const TipoDocumentoListInitialState: TipoDocumentoListState = {
    entityId: null,
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
    saving: false,
    errors: false,
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

        case TipoDocumentoListActions.GET_TIPO_DOCUMENTO_LIST: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case TipoDocumentoListActions.GET_TIPO_DOCUMENTO_LIST_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TipoDocumentoListActions.GET_TIPO_DOCUMENTO_LIST_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case TipoDocumentoListActions.DELETE_TIPO_DOCUMENTO_LIST: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case TipoDocumentoListActions.DELETE_TIPO_DOCUMENTO_LIST_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case TipoDocumentoListActions.DELETE_TIPO_DOCUMENTO_LIST_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        case TipoDocumentoListActions.RELOAD_TIPO_DOCUMENTO_LIST: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }
}
