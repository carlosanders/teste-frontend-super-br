import * as AtividadeCreateBlocoActions from '../actions/atividade-create-bloco.actions';

export interface AtividadeCreateBlocoState {
    savingTarefasId: number[];
    errors: any;
}

export const AtividadeCreateInitialState: AtividadeCreateBlocoState = {
    savingTarefasId: [],
    errors: false
};

export function AtividadeCreateBlocoReducer(
    state = AtividadeCreateInitialState, action: AtividadeCreateBlocoActions.AtividadeCreateBlocoActionsAll
): AtividadeCreateBlocoState {
    switch (action.type) {

        case AtividadeCreateBlocoActions.CREATE_ATIVIDADE: {
            return {
                savingTarefasId: [],
                errors: false
            };
        }

        case AtividadeCreateBlocoActions.SAVE_ATIVIDADE: {
            return {
                ...state,
                savingTarefasId: [...state.savingTarefasId, action.payload.tarefa.id]
            };
        }

        case AtividadeCreateBlocoActions.SAVE_ATIVIDADE_SUCCESS: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.tarefa.id)
            };
        }

        case AtividadeCreateBlocoActions.SAVE_ATIVIDADE_FAILED: {
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
