import {Action} from '@ngrx/store';

export const CREATE_WORKFLOW = '[ADMIN WORKFLOW EDIT] CREATE WORKFLOW';
export const CREATE_WORKFLOW_SUCCESS = '[ADMIN WORKFLOW EDIT] CREATE WORKFLOW SUCCESS';

export const GET_WORKFLOW = '[ADMIN WORKFLOW EDIT] GET WORKFLOW';
export const GET_WORKFLOW_SUCCESS = '[ADMIN WORKFLOW EDIT] GET WORKFLOW SUCCESS';
export const GET_WORKFLOW_FAILED = '[ADMIN WORKFLOW EDIT] GET WORKFLOW FAILED';

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
 * Create Workflow
 */
export class CreateWorkflow implements Action {
    readonly type = CREATE_WORKFLOW;

    constructor() {
    }
}

/**
 * Create Workflow Success
 */
export class CreateWorkflowSuccess implements Action {
    readonly type = CREATE_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

export type WorkflowEditActionsAll
    = CreateWorkflow
    | CreateWorkflowSuccess
    | GetWorkflow
    | GetWorkflowSuccess
    | GetWorkflowFailed;
