import * as TarefasActions from 'app/main/apps/calendario/store/actions/tarefas.actions';

export interface CalendarioState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    deletingTarefaIds: number[];
}

export const CalendarioInitialState: CalendarioState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    deletingTarefaIds: []
};

export function CalendarioReducer(state = CalendarioInitialState, action: TarefasActions.TarefasActionsAll): CalendarioState {
    switch (action.type) {

        case TarefasActions.UNLOAD_TAREFAS: {
            if (action.payload.reset) {
                return {
                    ...CalendarioInitialState
                };
            } else {
                return {
                    ...state,
                    entitiesId: [],
                    pagination: {
                        ...state.pagination,
                        limit: 10,
                        offset: 0,
                        total: 0
                    }
                };
            }
        }

        case TarefasActions.GET_TAREFAS: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case TarefasActions.GET_TAREFAS_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded
            };
        }

        case TarefasActions.GET_TAREFAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case TarefasActions.DELETE_TAREFA: {
            return {
                ...state,
                deletingTarefaIds: [...state.deletingTarefaIds, action.payload.tarefaId]
            };
        }

        case TarefasActions.DELETE_TAREFA_SUCCESS: {
            const entitiesId = state.entitiesId.filter(id => id !== action.payload);
            return {
                ...state,
                entitiesId: entitiesId,
                pagination: {
                    ...state.pagination,
                    total: state.pagination.total > 0 ? state.pagination.total - 1 : 0
                },
                deletingTarefaIds: state.deletingTarefaIds.filter(id => id !== action.payload)
            };
        }

        case TarefasActions.DELETE_TAREFA_FAILED: {
            return {
                ...state,
                deletingTarefaIds: state.deletingTarefaIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}

