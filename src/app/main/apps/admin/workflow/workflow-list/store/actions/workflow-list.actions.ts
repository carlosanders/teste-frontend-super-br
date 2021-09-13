import {Action} from '@ngrx/store';

export const GET_WORKFLOW = '[ADMIN WORKFLOW LIST] GET WORKFLOW';
export const GET_WORKFLOW_SUCCESS = '[ADMIN WORKFLOW LIST] GET WORKFLOW SUCCESS';
export const GET_WORKFLOW_FAILED = '[ADMIN WORKFLOW LIST] GET WORKFLOW FAILED';

export const RELOAD_WORKFLOW = '[ADMIN WORKFLOW LIST] RELOAD WORKFLOW';
export const UNLOAD_WORKFLOW = '[ADMIN WORKFLOW LIST] UNLOAD WORKFLOW';

export const DELETE_WORKFLOW = '[ADMIN WORKFLOW LIST] DELETE WORKFLOW';
export const DELETE_WORKFLOW_SUCCESS = '[ADMIN WORKFLOW LIST] DELETE WORKFLOW SUCCESS';
export const DELETE_WORKFLOW_FAILED = '[ADMIN WORKFLOW LIST] DELETE WORKFLOW FAILED';

/**
 * Get Workflow
 */
export class GetWorkflow implements Action {
    readonly type = GET_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Get Workflow Success
 */
export class GetWorkflowSuccess implements Action {
    readonly type = GET_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Workflow Failed
 */
export class GetWorkflowFailed implements Action {
    readonly type = GET_WORKFLOW_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Unload Workflow
 */
export class UnloadWorkflow implements Action {
    readonly type = UNLOAD_WORKFLOW;

    constructor() {
    }
}


/**
 * Reload Workflow
 */
export class ReloadWorkflow implements Action {
    readonly type = RELOAD_WORKFLOW;

    constructor() {
    }
}

/**
 * Delete Workflow
 */
export class DeleteWorkflow implements Action {
    readonly type = DELETE_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Delete Workflow Success
 */
export class DeleteWorkflowSuccess implements Action {
    readonly type = DELETE_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Workflow Failed
 */
export class DeleteWorkflowFailed implements Action {
    readonly type = DELETE_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}


export type WorkflowListActionsAll
    = GetWorkflow
    | GetWorkflowSuccess
    | GetWorkflowFailed
    | UnloadWorkflow
    | ReloadWorkflow
    | DeleteWorkflow
    | DeleteWorkflowSuccess
    | DeleteWorkflowFailed;

