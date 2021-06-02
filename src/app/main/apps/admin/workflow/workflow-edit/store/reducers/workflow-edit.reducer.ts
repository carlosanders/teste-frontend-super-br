import * as WorkflowEditActions from '../actions/workflow-edit.actions';

export interface WorkflowEditState {
    entityId: number;
    loading: boolean;
    loaded: any;
}

export const WorkflowEditInitialState: WorkflowEditState = {
    entityId: null,
    loading: false,
    loaded: false,
};

export function WorkflowEditReducer(
    state = WorkflowEditInitialState,
    action: WorkflowEditActions.WorkflowEditActionsAll
): WorkflowEditState {
    switch (action.type) {

        case WorkflowEditActions.GET_WORKFLOW: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case WorkflowEditActions.GET_WORKFLOW_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case WorkflowEditActions.CREATE_WORKFLOW: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'workflowHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case WorkflowEditActions.GET_WORKFLOW_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
