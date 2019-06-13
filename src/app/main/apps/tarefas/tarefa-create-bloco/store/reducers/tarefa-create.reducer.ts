import * as TarefaCreateActions from '../actions/tarefa-create.actions';

export interface TarefaCreateState {
    savingProcessosId: number[];
    errors: any;
}

export const TarefaCreateInitialState: TarefaCreateState = {
    savingProcessosId: [],
    errors: false
};

export function TarefaCreateReducer(
    state = TarefaCreateInitialState, action: TarefaCreateActions.TarefaCreateActionsAll
): TarefaCreateState {
    switch (action.type) {

        case TarefaCreateActions.CREATE_TAREFA: {
            return {
                savingProcessosId: [],
                errors: false
            };
        }

        case TarefaCreateActions.SAVE_TAREFA: {
            return {
                ...state,
                savingProcessosId: [...state.savingProcessosId, action.payload.processo.id]
            };
        }

        case TarefaCreateActions.SAVE_TAREFA_SUCCESS: {
            return {
                ...state,
                savingProcessosId: state.savingProcessosId.filter(id => id !== action.payload.processo.id)
            };
        }

        case TarefaCreateActions.SAVE_TAREFA_FAILED: {
            return {
                ...state,
                savingProcessosId: state.savingProcessosId.filter(id => id !== action.payload.processo.id),
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
