import * as AtividadeCreateActions from '../actions/atividade-create.actions';

export interface AtividadeCreateState {
    savingTarefasId: number[];
    errors: any;
}

export const AtividadeCreateInitialState: AtividadeCreateState = {
    savingTarefasId: [],
    errors: false
};

export function AtividadeCreateReducer(
    state = AtividadeCreateInitialState, action: AtividadeCreateActions.AtividadeCreateActionsAll
): AtividadeCreateState {
    switch (action.type) {

        case AtividadeCreateActions.CREATE_ATIVIDADE: {
            return {
                savingTarefasId: [],
                errors: false
            };
        }

        case AtividadeCreateActions.SAVE_ATIVIDADE: {
            return {
                ...state,
                savingTarefasId: [...state.savingTarefasId, action.payload.tarefa.id]
            };
        }

        case AtividadeCreateActions.SAVE_ATIVIDADE_SUCCESS: {
            return {
                ...state,
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload.tarefa.id)
            };
        }

        case AtividadeCreateActions.SAVE_ATIVIDADE_FAILED: {
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
