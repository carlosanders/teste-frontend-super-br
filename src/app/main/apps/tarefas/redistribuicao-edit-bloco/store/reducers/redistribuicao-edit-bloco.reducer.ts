import * as RedistribuicaoEditBlocoActions from '../actions/redistribuicao-edit-bloco.actions';

export interface RedistribuicaoEditBlocoState {
    savingId: number[];
    tarefasProcessoRestritosValidadas: number[];
    errors: any;
}

export const RedistribuicaoEditInitialState: RedistribuicaoEditBlocoState = {
    savingId: [],
    tarefasProcessoRestritosValidadas: [],
    errors: false
};

export function RedistribuicaoEditBlocoReducer(
    state = RedistribuicaoEditInitialState, action: RedistribuicaoEditBlocoActions.RedistribuicaoEditBlocoActionsAll
): RedistribuicaoEditBlocoState {
    switch (action.type) {

        case RedistribuicaoEditBlocoActions.EDIT_TAREFA: {
            return {
                ...state,
                savingId: [],
                errors: false
            };
        }

        case RedistribuicaoEditBlocoActions.SAVE_TAREFA: {
            return {
                ...state,
                savingId: [...state.savingId, action.payload.tarefa.id]
            };
        }

        case RedistribuicaoEditBlocoActions.SAVE_TAREFA_SUCCESS: {
            return {
                ...state,
                savingId: state.savingId.filter(id => id !== action.payload.id)
            };
        }

        case RedistribuicaoEditBlocoActions.SAVE_TAREFA_FAILED: {
            return {
                ...state,
                savingId: state.savingId.filter(id => id !== action.payload.id),
                errors: action.payload.errors
            };
        }

        case RedistribuicaoEditBlocoActions.TAREFAS_PROCESOS_RESTRITO_VALIDADAS_SUCCESS: {
            return {
                ...state,
                tarefasProcessoRestritosValidadas: action.payload
            };
        }

        default:
            return state;
    }
}
