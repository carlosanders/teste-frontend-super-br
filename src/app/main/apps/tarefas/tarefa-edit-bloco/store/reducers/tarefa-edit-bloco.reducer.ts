import * as TarefaEditBlocoActions from '../actions/tarefa-edit-bloco.actions';

export interface TarefaEditBlocoState {
    savingId: number[];
    errors: any;
}

export const TarefaEditInitialState: TarefaEditBlocoState = {
    savingId: [],
    errors: false
};

export function TarefaEditBlocoReducer(
    state = TarefaEditInitialState, action: TarefaEditBlocoActions.TarefaEditBlocoActionsAll
): TarefaEditBlocoState {
    switch (action.type) {

        case TarefaEditBlocoActions.EDIT_TAREFA: {
            return {
                savingId: [],
                errors: false
            };
        }

        case TarefaEditBlocoActions.SAVE_TAREFA: {
            return {
                ...state,
                savingId: [...state.savingId, action.payload.tarefa.id]
            };
        }

        case TarefaEditBlocoActions.SAVE_TAREFA_SUCCESS: {
            return {
                ...state,
                savingId: state.savingId.filter(id => id !== action.payload.tarefa.id)
            };
        }

        case TarefaEditBlocoActions.SAVE_TAREFA_FAILED: {
            return {
                ...state,
                savingId: state.savingId.filter(id => id !== action.payload.id),
                errors: action.payload.errors
            };
        }

        default:
            return state;
    }
}
