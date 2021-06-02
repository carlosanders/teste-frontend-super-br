import * as WorkflowDadosBasicosActions from '../actions/workflow-dados-basicos.actions';

export interface WorkflowDadosBasicosState {
    saving: boolean;
    errors: any;
}

export const WorkflowDadosBasicosInitialState: WorkflowDadosBasicosState = {
    saving: false,
    errors: false,
};

export function WorkflowDadosBasicosReducer(
    state = WorkflowDadosBasicosInitialState,
    action: WorkflowDadosBasicosActions.WorkflowDadosBasicosActionsAll
): WorkflowDadosBasicosState {
    switch (action.type) {

        case WorkflowDadosBasicosActions.SAVE_WORKFLOW: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case WorkflowDadosBasicosActions.SAVE_WORKFLOW_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case WorkflowDadosBasicosActions.SAVE_WORKFLOW_FAILED: {
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
