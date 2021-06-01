import * as DadosBasicosActions from '../actions/dados-basicos.actions';

export interface TransicaoWorkflowDadosBasicosState {
    saving: boolean;
    errors: any;
}

export const TransicaoWorkflowDadosBasicosInitialState: TransicaoWorkflowDadosBasicosState = {
    saving: false,
    errors: false,
};

export function TransicaoWorkflowDadosBasicosReducer(
    state = TransicaoWorkflowDadosBasicosInitialState,
    action: DadosBasicosActions.TransicaoWorkflowDadosBasicosActionsAll
): TransicaoWorkflowDadosBasicosState {
    switch (action.type) {

        case DadosBasicosActions.SAVE_TRANSICAO_WORKFLOW: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case DadosBasicosActions.SAVE_TRANSICAO_WORKFLOW_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DadosBasicosActions.SAVE_TRANSICAO_WORKFLOW_FAILED: {
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
