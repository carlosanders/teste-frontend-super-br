import * as fromStore from '../index';

export interface VinculacaoTransicaoWorkflowState {
    saving: boolean;
    errors: any;
}

export const VinculacaoTransicaoWorkflowInitialState: VinculacaoTransicaoWorkflowState = {
    saving: false,
    errors: false,
};

export function VinculacaoTransicaoWorkflowReducer(
    state = VinculacaoTransicaoWorkflowInitialState,
    action: fromStore.VinculacaoTransicaoWorkflowActionsAll
): VinculacaoTransicaoWorkflowState {
    switch (action.type) {

        case fromStore.SAVE_VINCULACAO_TRANSICAO_WORKFLOW: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case fromStore.SAVE_VINCULACAO_TRANSICAO_WORKFLOW_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case fromStore.SAVE_VINCULACAO_TRANSICAO_WORKFLOW_FAILED: {
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
