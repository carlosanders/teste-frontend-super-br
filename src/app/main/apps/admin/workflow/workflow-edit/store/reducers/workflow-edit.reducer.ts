import * as WorkflowEditActions from '../actions/workflow-edit.actions';

export interface WorkflowEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        context: any;
        sort: any;
        total: number;
    };
}

export const WorkflowEditInitialState: WorkflowEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false,
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        context: {},
        sort: {},
        total: 0,
    },
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

        case WorkflowEditActions.SAVE_WORKFLOW: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case WorkflowEditActions.SAVE_WORKFLOW_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'workflowHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case WorkflowEditActions.SAVE_WORKFLOW_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case WorkflowEditActions.RELOAD_WORKFLOW: {
            return {
                entityId: 0, errors: undefined, loaded: undefined, saving: false,
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    context: action.payload.context,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        default:
            return state;
    }
}
