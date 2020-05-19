import * as RedistribuicaoEditBlocoActions from '../actions/redistribuicao-edit-bloco.actions';

export interface RedistribuicaoEditBlocoState {
    savingId: number[];
    errors: any;
}

export const RedistribuicaoEditInitialState: RedistribuicaoEditBlocoState = {
    savingId: [],
    errors: false
};

export function RedistribuicaoEditBlocoReducer(
    state = RedistribuicaoEditInitialState, action: RedistribuicaoEditBlocoActions.RedistribuicaoEditBlocoActionsAll
): RedistribuicaoEditBlocoState {
    switch (action.type) {

        case RedistribuicaoEditBlocoActions.EDIT_TAREFA: {
            return {
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
                savingId: state.savingId.filter(id => id !== action.payload.tarefa.id)
            };
        }

        case RedistribuicaoEditBlocoActions.SAVE_TAREFA_FAILED: {
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
