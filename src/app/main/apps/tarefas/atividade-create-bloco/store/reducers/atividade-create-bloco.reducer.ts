import * as AtividadeCreateBlocoActions from '../actions/atividade-create-bloco.actions';

export interface AtividadeCreateBlocoState {
    savingTarefasId: number[];
    errors: any;
}

export const atividadeCreateInitialState: AtividadeCreateBlocoState = {
    savingTarefasId: [],
    errors: false
};

export const atividadeCreateBlocoReducer = (
    state = atividadeCreateInitialState, action: AtividadeCreateBlocoActions.AtividadeCreateBlocoActionsAll
): AtividadeCreateBlocoState => {
    switch (action.type) {

        case AtividadeCreateBlocoActions.UNLOAD_ATIVIDADE: {
            return {
                savingTarefasId: [],
                errors: false
            };
        }

        case AtividadeCreateBlocoActions.SAVE_ATIVIDADE: {
            return {
                ...state,
                savingTarefasId: [...state.savingTarefasId, action.payload.atividade?.tarefa?.id]
            };
        }

        case AtividadeCreateBlocoActions.SAVE_ATIVIDADE_SUCCESS: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.atividade?.tarefa?.id)
            };
        }

        case AtividadeCreateBlocoActions.SAVE_ATIVIDADE_FAILED: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.tarefaId),
                errors: action.payload.errors
            };
        }

        case AtividadeCreateBlocoActions.SAVE_ATIVIDADE_LINEAR: {
            return {
                ...state,
                savingTarefasId: [...state.savingTarefasId, action.payload.atividade?.tarefa?.id]
            };
        }

        case AtividadeCreateBlocoActions.SAVE_ATIVIDADE_LINEAR_SUCCESS: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.atividade?.tarefa?.id)
            };
        }

        case AtividadeCreateBlocoActions.SAVE_ATIVIDADE_LINEAR_FAILED: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.tarefaId),
                errors: action.payload.errors
            };
        }

        default:
            return state;
    }
};
