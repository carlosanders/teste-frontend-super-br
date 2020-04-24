import * as EspecieTarefaListActions from '../actions';

export interface EspecieTarefaListState {
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

export const EspecieTarefaListInitialState: EspecieTarefaListState = {
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

export function EspecieTarefaListReducer(
    state = EspecieTarefaListInitialState,
    action: EspecieTarefaListActions.EspecieTarefaListActionsAll
): EspecieTarefaListState {
    switch (action.type) {

        case EspecieTarefaListActions.GET_ESPECIE_TAREFA: {
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

        case EspecieTarefaListActions.GET_ESPECIE_TAREFA_SUCCESS: {
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

        case EspecieTarefaListActions.GET_ESPECIE_TAREFA_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case EspecieTarefaListActions.RELOAD_ESPECIE_TAREFA: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case EspecieTarefaListActions.DELETE_ESPECIE_TAREFA: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case EspecieTarefaListActions.DELETE_ESPECIE_TAREFA_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case EspecieTarefaListActions.DELETE_ESPECIE_TAREFA_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}