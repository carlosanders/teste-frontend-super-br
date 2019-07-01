import * as CompartilhamentoCreateBlocoActions from '../actions/compartilhamento-create-bloco.actions';

export interface CompartilhamentoCreateBlocoState {
    savingTarefasId: number[];
    errors: any;
}

export const CompartilhamentoCreateInitialState: CompartilhamentoCreateBlocoState = {
    savingTarefasId: [],
    errors: false
};

export function CompartilhamentoCreateBlocoReducer(
    state = CompartilhamentoCreateInitialState, action: CompartilhamentoCreateBlocoActions.CompartilhamentoCreateBlocoActionsAll
): CompartilhamentoCreateBlocoState {
    switch (action.type) {

        case CompartilhamentoCreateBlocoActions.CREATE_COMPARTILHAMENTO: {
            return {
                savingTarefasId: [],
                errors: false
            };
        }

        case CompartilhamentoCreateBlocoActions.SAVE_COMPARTILHAMENTO: {
            return {
                ...state,
                savingTarefasId: [...state.savingTarefasId, action.payload.tarefa.id]
            };
        }

        case CompartilhamentoCreateBlocoActions.SAVE_COMPARTILHAMENTO_SUCCESS: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.tarefa.id)
            };
        }

        case CompartilhamentoCreateBlocoActions.SAVE_COMPARTILHAMENTO_FAILED: {
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
