import * as TransicaoWorkflowEditActions from '../actions/transicao-workflow-edit.actions';

export interface TransicaoWorkflowEditState {
    entityId: number;
    loading: boolean;
    loaded: any;
}

export const TransicaoWorkflowEditInitialState: TransicaoWorkflowEditState = {
    entityId: null,
    loading: false,
    loaded: false,
};

export function TransicaoWorkflowEditReducer(
    state = TransicaoWorkflowEditInitialState,
    action: TransicaoWorkflowEditActions.TransicaoWorkflowEditActionsAll
): TransicaoWorkflowEditState {
    switch (action.type) {


        case TransicaoWorkflowEditActions.GET_TRANSICAO_WORKFLOW: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case TransicaoWorkflowEditActions.GET_TRANSICAO_WORKFLOW_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TransicaoWorkflowEditActions.CREATE_TRANSICAO_WORKFLOW: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'transicaoWorkflowHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case TransicaoWorkflowEditActions.GET_TRANSICAO_WORKFLOW_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
