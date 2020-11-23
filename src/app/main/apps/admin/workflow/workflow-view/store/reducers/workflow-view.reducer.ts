import * as WorkflowViewActions from '../actions/workflow-view.actions';

export interface WorkflowViewState {
    loading: boolean;
    loaded: any;
    binary: {
        src: any;
        loading: boolean;
    };
}

export const WorkflowViewInitialState: WorkflowViewState = {
    loading: false,
    loaded: false,
    binary: {
        src: null,
        loading: false
    }
};

export function WorkflowViewReducer(
    state = WorkflowViewInitialState,
    action: WorkflowViewActions.WorkflowViewActionsAll
): WorkflowViewState {
    switch (action.type) {

        case WorkflowViewActions.GET_WORKFLOW_VIEW_TRANSICOES : {
            return {
                ...state,
                loading: true,
                binary: {
                    src: null,
                    loading: true
                },
                loaded: false
            };
        }

        case WorkflowViewActions.GET_WORKFLOW_VIEW_TRANSICOES_SUCCESS: {

            return {
                ...state,
                loaded: action.payload.loaded,
                binary: {
                    src: action.payload.loaded.componenteDigital,
                    loading: false
                },
                loading: false
            };
        }

        default:
            return state;
    }
}
