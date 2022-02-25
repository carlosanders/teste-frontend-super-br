import * as EspecieDocumentoAvulsoListActions from '../actions';

export interface EspecieDocumentoAvulsoListState {
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

export const EspecieDocumentoAvulsoListInitialState: EspecieDocumentoAvulsoListState = {
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

export function EspecieDocumentoAvulsoListReducer(
    state = EspecieDocumentoAvulsoListInitialState,
    action: EspecieDocumentoAvulsoListActions.EspecieDocumentoAvulsoListActionsAll
): EspecieDocumentoAvulsoListState {
    switch (action.type) {

        case EspecieDocumentoAvulsoListActions.GET_ESPECIE_DOCUMENTO_AVULSO: {
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

        case EspecieDocumentoAvulsoListActions.GET_ESPECIE_DOCUMENTO_AVULSO_SUCCESS: {
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

        case EspecieDocumentoAvulsoListActions.GET_ESPECIE_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case EspecieDocumentoAvulsoListActions.UNLOAD_ESPECIE_DOCUMENTO_AVULSO: {
            return {
                ...EspecieDocumentoAvulsoListInitialState
            };
        }


        case EspecieDocumentoAvulsoListActions.RELOAD_ESPECIE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }
}
