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
                savingTarefasId: [...state.savingTarefasId, action.payload.compartilhamento.tarefa.id]
            };
        }

        case CompartilhamentoCreateBlocoActions.SAVE_COMPARTILHAMENTO_SUCCESS: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.compartilhamento.tarefa.id)
            };
        }

        case CompartilhamentoCreateBlocoActions.SAVE_COMPARTILHAMENTO_FAILED: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.tarefaId),
                errors: action.payload.errors
            };
        }

        case CompartilhamentoCreateBlocoActions.SAVE_COMPARTILHAMENTO_SETOR_BLOCO: {
            return {
                ...state,
                savingTarefasId: [...state.savingTarefasId, action.payload.compartilhamento.tarefa.id]
            };
        }

        case CompartilhamentoCreateBlocoActions.SAVE_COMPARTILHAMENTO_SETOR_BLOCO_SUCCESS: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.compartilhamento.tarefa.id)
            };
        }

        case CompartilhamentoCreateBlocoActions.SAVE_COMPARTILHAMENTO_SETOR_BLOCO_FAILED: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.tarefaId),
                errors: action.payload.errors
            };
        }

        default:
            return state;
    }
}
