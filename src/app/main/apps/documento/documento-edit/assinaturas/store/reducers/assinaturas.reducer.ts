import * as AssinaturasActions from '../actions';

export interface AssinaturasState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    documentoId: number;
    assinaturaId: number;
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    assinaturasId: number;
    saving: boolean;
    errors: any;
}

export const AssinaturasInitialState: AssinaturasState = {
    entitiesId: [],
    pagination: {
        limit: 5,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    assinaturasId: null,
    documentoId: null,
    assinaturaId: null,
    loading: false,
    loaded: false,
    saving: false,
    errors: false,
    deletedIds: [],
    deletingIds: []
};

export function AssinaturasReducer(
    state = AssinaturasInitialState,
    action: AssinaturasActions.AssinaturaActionsAll
): AssinaturasState {
    switch (action.type) {

        case AssinaturasActions.GET_ASSINATURA_DOCUMENTO: {
            return {
                ...state,
                loading: true,
                assinaturaId: action.payload.assinaturaId
            };
        }

        case AssinaturasActions.GET_ASSINATURA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                assinaturaId: action.payload.assinaturaId,
                loading: false,
                loaded: action.payload.loaded
            };
        }

        case AssinaturasActions.RELOAD_ASSINATURAS_DOCUMENTO: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AssinaturasActions.GET_ASSINATURA_DOCUMENTO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AssinaturasActions.DELETE_ASSINATURA_DOCUMENTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.assinaturaId]
            };
        }

        case AssinaturasActions.DELETE_ASSINATURA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case AssinaturasActions.DELETE_ASSINATURA_DOCUMENTO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        case AssinaturasActions.GET_ASSINATURAS_DOCUMENTO: {
            return {
                ...state,
                entitiesId: null,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case AssinaturasActions.GET_ASSINATURAS_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case AssinaturasActions.SAVE_ASSINATURA_DOCUMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AssinaturasActions.SAVE_ASSINATURA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case AssinaturasActions.SAVE_ASSINATURA_DOCUMENTO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case AssinaturasActions.UNLOAD_ASSINATURAS: {
            return {
                ...AssinaturasInitialState
            };
        }

        default:
            return state;
    }
}
