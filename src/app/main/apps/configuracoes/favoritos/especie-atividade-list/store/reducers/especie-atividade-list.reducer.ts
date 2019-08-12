import * as EspecieAtividadeListActions from '../actions';

export interface EspecieAtividadeListState {
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
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    saving: boolean;
    errors: any;
}

export const EspecieAtividadeListInitialState: EspecieAtividadeListState = {
    saving: false,
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    errors: false,
};

export function EspecieAtividadeListReducer(
    state = EspecieAtividadeListInitialState,
    action: EspecieAtividadeListActions.EspecieAtividadeListActionsAll
): EspecieAtividadeListState {
    switch (action.type) {

        case EspecieAtividadeListActions.GET_ESPECIES_ATIVIDADES: {
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
                    total: state.pagination.total
                }
            };
        }

        case EspecieAtividadeListActions.GET_ESPECIES_ATIVIDADES_SUCCESS: {

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

        case EspecieAtividadeListActions.RELOAD_ESPECIES_ATIVIDADES: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case EspecieAtividadeListActions.GET_ESPECIES_ATIVIDADES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case EspecieAtividadeListActions.DELETE_ESPECIE_ATIVIDADE: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case EspecieAtividadeListActions.DELETE_ESPECIE_ATIVIDADE_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case EspecieAtividadeListActions.DELETE_ESPECIE_ATIVIDADE_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        case EspecieAtividadeListActions.SET_ESPECIE_ATIVIDADE: {
            return {
                ...state,
                loaded: action.payload
            };
        }

        case EspecieAtividadeListActions.SAVE_ESPECIE_ATIVIDADE: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case EspecieAtividadeListActions.SAVE_ESPECIE_ATIVIDADE_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case EspecieAtividadeListActions.SAVE_ESPECIE_ATIVIDADE_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
