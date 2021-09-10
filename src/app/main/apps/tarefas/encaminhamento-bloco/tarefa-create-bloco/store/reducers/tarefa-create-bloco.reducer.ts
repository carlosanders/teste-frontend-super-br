import * as TarefaCreateBlocoActions from '../actions/tarefa-create-bloco.actions';

export interface TarefaCreateBlocoState {
    savingProcessosId: number[];
    errors: any;
}

export const TarefaCreateInitialState: TarefaCreateBlocoState = {
    savingProcessosId: [],
    errors: false
};

export function TarefaCreateBlocoReducer(
    state = TarefaCreateInitialState, action: TarefaCreateBlocoActions.TarefaCreateBlocoActionsAll
): TarefaCreateBlocoState {
    switch (action.type) {

        case TarefaCreateBlocoActions.CREATE_TAREFA: {
            return {
                savingProcessosId: [],
                errors: false
            };
        }

        case TarefaCreateBlocoActions.SAVE_TAREFA: {
            return {
                ...state,
                savingProcessosId: [...state.savingProcessosId, action.payload.tarefa.processo.id]
            };
        }

        case TarefaCreateBlocoActions.SAVE_TAREFA_SUCCESS: {
            return {
                ...state,
                savingProcessosId: state.savingProcessosId.filter(id => id !== action.payload.tarefa.processo.id)
            };
        }

        case TarefaCreateBlocoActions.SAVE_TAREFA_FAILED: {
            return {
                ...state,
                savingProcessosId: state.savingProcessosId.filter(id => id !== action.payload.id),
                errors: action.payload.errors
            };
        }

        default:
            return state;
    }
}
