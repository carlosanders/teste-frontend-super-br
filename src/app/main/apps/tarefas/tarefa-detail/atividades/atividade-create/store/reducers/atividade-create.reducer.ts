import * as AtividadeCreateActions
    from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store/actions/atividade-create.actions';

export interface AtividadeCreateState {
    saving: boolean;
    errors: any;
}

export const AtividadeCreateInitialState: AtividadeCreateState = {
    saving: false,
    errors: false
};

export function AtividadeCreateReducer(state = AtividadeCreateInitialState, action: AtividadeCreateActions.AtividadeCreateActionsAll): AtividadeCreateState {
    switch (action.type) {

        case AtividadeCreateActions.CREATE_ATIVIDADE: {
            return {
                saving: false,
                errors: false
            };
        }

        case AtividadeCreateActions.SAVE_ATIVIDADE: {
            return {
                ...state,
                saving: true
            };
        }

        case AtividadeCreateActions.SAVE_ATIVIDADE_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case AtividadeCreateActions.SAVE_ATIVIDADE_FAILED: {
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
