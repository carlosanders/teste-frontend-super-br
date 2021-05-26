import * as EspecieAtividadeListActions from '../actions';

export interface EspecieAtividadeListState {
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

export const EspecieAtividadeListInitialState: EspecieAtividadeListState = {
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

export function EspecieAtividadeListReducer(
    state = EspecieAtividadeListInitialState,
    action: EspecieAtividadeListActions.EspecieAtividadeListActionsAll
): EspecieAtividadeListState {
    switch (action.type) {

        case EspecieAtividadeListActions.GET_ESPECIE_ATIVIDADE: {
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

        case EspecieAtividadeListActions.GET_ESPECIE_ATIVIDADE_SUCCESS: {
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

        case EspecieAtividadeListActions.GET_ESPECIE_ATIVIDADE_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case EspecieAtividadeListActions.UNLOAD_ESPECIE_ATIVIDADE: {
            return {
                ...EspecieAtividadeListInitialState
            };
        }


        case EspecieAtividadeListActions.RELOAD_ESPECIE_ATIVIDADE: {
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
