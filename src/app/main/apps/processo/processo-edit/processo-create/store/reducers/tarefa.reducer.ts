import * as TarefaActions from '../actions/tarefa.actions';

export interface TarefaState {
    tarefaId: number;
    saving: boolean;
    errors: any;
}

export const TarefaInitialState: TarefaState = {
    tarefaId: null,
    saving: false,
    errors: false
};

export function TarefaReducer(
    state = TarefaInitialState,
    action: TarefaActions.TarefaActionsAll
): TarefaState {
    switch (action.type) {
        case TarefaActions.SAVE_TAREFA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TarefaActions.SAVE_TAREFA_SUCCESS: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TarefaActions.SAVE_TAREFA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case TarefaActions.UNLOAD_TAREFA: {
            return {
                ...TarefaInitialState
            };
        }

        default:
            return state;
    }
}
