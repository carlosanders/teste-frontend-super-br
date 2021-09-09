import * as EspecieProcessoListActions from '../actions';

export interface EspecieProcessoListState {
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

export const EspecieProcessoListInitialState: EspecieProcessoListState = {
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

export function EspecieProcessoListReducer(
    state = EspecieProcessoListInitialState,
    action: EspecieProcessoListActions.EspecieProcessoListActionsAll
): EspecieProcessoListState {
    switch (action.type) {

        case EspecieProcessoListActions.GET_ESPECIE_PROCESSO: {
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

        case EspecieProcessoListActions.GET_ESPECIE_PROCESSO_SUCCESS: {
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

        case EspecieProcessoListActions.GET_ESPECIE_PROCESSO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case EspecieProcessoListActions.UNLOAD_ESPECIE_PROCESSO: {
            return {
                ...EspecieProcessoListInitialState
            };
        }


        case EspecieProcessoListActions.RELOAD_ESPECIE_PROCESSO: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case EspecieProcessoListActions.DELETE_ESPECIE_PROCESSO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.especieProcessoId]
            };
        }

        case EspecieProcessoListActions.DELETE_ESPECIE_PROCESSO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case EspecieProcessoListActions.DELETE_ESPECIE_PROCESSO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
