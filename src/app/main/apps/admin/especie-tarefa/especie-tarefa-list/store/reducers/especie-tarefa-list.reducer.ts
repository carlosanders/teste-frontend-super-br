import * as EspecieTarefaListActions from '../actions';
import * as _ from 'lodash';

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
    deletingErrors: any;
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
    deletingIds: [],
    deletingErrors: {}
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
                deletingErrors: {},
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

        case EspecieTarefaListActions.UNLOAD_ESPECIE_TAREFA: {
            return {
                ...EspecieTarefaListInitialState
            };
        }


        case EspecieTarefaListActions.RELOAD_ESPECIE_TAREFA: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case EspecieTarefaListActions.DELETE_ESPECIE_TAREFA: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.especieTarefaId]
            };
        }

        case EspecieTarefaListActions.DELETE_ESPECIE_TAREFA_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload])
            };
        }

        case EspecieTarefaListActions.DELETE_ESPECIE_TAREFA_FAILED: {
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
