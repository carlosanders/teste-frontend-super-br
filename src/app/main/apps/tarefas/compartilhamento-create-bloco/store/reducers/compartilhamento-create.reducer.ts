import * as CompartilhamentoCreateActions from '../actions/compartilhamento-create.actions';

export interface CompartilhamentoCreateState {
    savingTarefasId: number[];
    errors: any;
}

export const CompartilhamentoCreateInitialState: CompartilhamentoCreateState = {
    savingTarefasId: [],
    errors: false
};

export function CompartilhamentoCreateReducer(
    state = CompartilhamentoCreateInitialState, action: CompartilhamentoCreateActions.CompartilhamentoCreateActionsAll
): CompartilhamentoCreateState {
    switch (action.type) {

        case CompartilhamentoCreateActions.CREATE_COMPARTILHAMENTO: {
            return {
                savingTarefasId: [],
                errors: false
            };
        }

        case CompartilhamentoCreateActions.SAVE_COMPARTILHAMENTO: {
            return {
                ...state,
                savingTarefasId: [...state.savingTarefasId, action.payload.tarefa.id]
            };
        }

        case CompartilhamentoCreateActions.SAVE_COMPARTILHAMENTO_SUCCESS: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.tarefa.id)
            };
        }

        case CompartilhamentoCreateActions.SAVE_COMPARTILHAMENTO_FAILED: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.tarefa.id),
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
