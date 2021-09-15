import * as EspecieRelevanciaListActions from '../actions';

export interface EspecieRelevanciaListState {
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

export const EspecieRelevanciaListInitialState: EspecieRelevanciaListState = {
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

export function EspecieRelevanciaListReducer(
    state = EspecieRelevanciaListInitialState,
    action: EspecieRelevanciaListActions.EspecieRelevanciaListActionsAll
): EspecieRelevanciaListState {
    switch (action.type) {

        case EspecieRelevanciaListActions.GET_ESPECIE_RELEVANCIA: {
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

        case EspecieRelevanciaListActions.GET_ESPECIE_RELEVANCIA_SUCCESS: {
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

        case EspecieRelevanciaListActions.GET_ESPECIE_RELEVANCIA_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case EspecieRelevanciaListActions.UNLOAD_ESPECIE_RELEVANCIA: {
            return {
                ...EspecieRelevanciaListInitialState
            };
        }


        case EspecieRelevanciaListActions.RELOAD_ESPECIE_RELEVANCIA: {
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
