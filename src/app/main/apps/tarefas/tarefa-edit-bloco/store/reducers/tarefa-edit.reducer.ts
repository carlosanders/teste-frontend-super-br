import * as TarefaEditActions from '../actions/tarefa-edit.actions';

export interface TarefaEditState {
    savingId: number[];
    errors: any;
}

export const TarefaEditInitialState: TarefaEditState = {
    savingId: [],
    errors: false
};

export function TarefaEditReducer(
    state = TarefaEditInitialState, action: TarefaEditActions.TarefaEditActionsAll
): TarefaEditState {
    switch (action.type) {

        case TarefaEditActions.EDIT_TAREFA: {
            return {
                savingId: [],
                errors: false
            };
        }

        case TarefaEditActions.SAVE_TAREFA: {
            return {
                ...state,
                savingId: [...state.savingId, action.payload.tarefa.id]
            };
        }

        case TarefaEditActions.SAVE_TAREFA_SUCCESS: {
            return {
                ...state,
                savingId: state.savingId.filter(id => id !== action.payload.tarefa.id)
            };
        }

        case TarefaEditActions.SAVE_TAREFA_FAILED: {
            return {
                ...state,
                savingId: state.savingId.filter(id => id !== action.payload.tarefa.id),
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
