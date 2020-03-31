import * as TarefaCreateActions from 'app/main/apps/tarefas/tarefa-create/store/actions/tarefa-create.actions';

export interface TarefaCreateState {
    saving: boolean;
    errors: any;
}

export const TarefaCreateInitialState: TarefaCreateState = {
    saving: false,
    errors: false
};

export function TarefaCreateReducer(state = TarefaCreateInitialState, action: TarefaCreateActions.TarefaCreateActionsAll): TarefaCreateState {
    switch (action.type) {

        case TarefaCreateActions.CREATE_TAREFA: {
            return {
                saving: false,
                errors: false
            };
        }

        case TarefaCreateActions.SAVE_TAREFA: {
            return {
                ...state,
                saving: true
            };
        }

        case TarefaCreateActions.SAVE_TAREFA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case TarefaCreateActions.SAVE_TAREFA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
