import * as TarefaEditActions from '../actions/tarefa-edit.actions';

export interface TarefaEditState {
    tarefaId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const TarefaEditInitialState: TarefaEditState = {
    tarefaId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function TarefaEditReducer(
    state = TarefaEditInitialState,
    action: TarefaEditActions.TarefaEditActionsAll
): TarefaEditState {
    switch (action.type) {

        case TarefaEditActions.GET_TAREFA: {
            return {
                ...state,
                tarefaId: null,
                loading: true
            };
        }

        case TarefaEditActions.GET_TAREFA_SUCCESS: {

            return {
                ...state,
                tarefaId: action.payload.tarefaId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TarefaEditActions.CREATE_TAREFA: {
            return {
                ...state,
                tarefaId: null,
                loaded: {
                    id: 'tarefaHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case TarefaEditActions.GET_TAREFA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case TarefaEditActions.SAVE_TAREFA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TarefaEditActions.SAVE_TAREFA_SUCCESS: {
            return {
                ...state,
                errors: false
            };
        }

        case TarefaEditActions.SAVE_TAREFA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case TarefaEditActions.UNLOAD_STORE: {
            return {
                ...TarefaEditInitialState
            };
        }

        default:
            return state;
    }
}
