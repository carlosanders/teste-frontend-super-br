import { Action } from '@ngrx/store';

export const CREATE_WORKFLOW = '[ADMIN WORKFLOW EDIT] CREATE WORKFLOW';
export const CREATE_WORKFLOW_SUCCESS = '[ADMIN WORKFLOW EDIT] CREATE WORKFLOW SUCCESS';

export const SAVE_WORKFLOW = '[ADMIN WORKFLOW EDIT] SAVE WORKFLOW';
export const SAVE_WORKFLOW_SUCCESS = '[ADMIN WORKFLOW EDIT] SAVE WORKFLOW SUCCESS';
export const SAVE_WORKFLOW_FAILED = '[ADMIN WORKFLOW EDIT] SAVE WORKFLOW FAILED';

export const UPDATE_WORKFLOW = '[ADMIN WORKFLOW EDIT] UPDATE WORKFLOW';
export const UPDATE_WORKFLOW_SUCCESS = '[ADMIN WORKFLOW EDIT] UPDATE WORKFLOW SUCCESS';
export const UPDATE_WORKFLOW_FAILED = '[ADMIN WORKFLOW EDIT] UPDATE WORKFLOW FAILED';

export const GET_WORKFLOW = '[ADMIN WORKFLOW EDIT] GET WORKFLOW';
export const GET_WORKFLOW_SUCCESS = '[ADMIN WORKFLOW EDIT] GET WORKFLOW SUCCESS';
export const GET_WORKFLOW_FAILED = '[ADMIN WORKFLOW EDIT] GET WORKFLOW FAILED';

export const RELOAD_WORKFLOW = '[ADMIN WORKFLOW LIST] RELOAD WORKFLOW';

/**
 * Get Workflow
 */
export class GetWorkflow implements Action
{
    readonly type = GET_WORKFLOW;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Workflow Success
 */
export class GetWorkflowSuccess implements Action
{
    readonly type = GET_WORKFLOW_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Workflow Failed
 */
export class GetWorkflowFailed implements Action
{
    readonly type = GET_WORKFLOW_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Workflow
 */
export class SaveWorkflow implements Action
{
    readonly type = SAVE_WORKFLOW;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Workflow
 */
export class UpdateWorkflow implements Action
{
    readonly type = UPDATE_WORKFLOW;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Workflow Success
 */
export class SaveWorkflowSuccess implements Action
{
    readonly type = SAVE_WORKFLOW_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Workflow Failed
 */
export class SaveWorkflowFailed implements Action
{
    readonly type = SAVE_WORKFLOW_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Workflow Success
 */
export class UpdateWorkflowSuccess implements Action
{
    readonly type = UPDATE_WORKFLOW_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Workflow Failed
 */
export class UpdateWorkflowFailed implements Action
{
    readonly type = UPDATE_WORKFLOW_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Workflow
 */
export class CreateWorkflow implements Action
{
    readonly type = CREATE_WORKFLOW;

    constructor()
    {
    }
}

/**
 * Create Workflow Success
 */
export class CreateWorkflowSuccess implements Action
{
    readonly type = CREATE_WORKFLOW_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ReloadWorkflow
 */
export class ReloadWorkflow implements Action
{
    readonly type = RELOAD_WORKFLOW;

    constructor(public payload: any)
    {
    }
}



export type WorkflowEditActionsAll
    = CreateWorkflow
    | CreateWorkflowSuccess
    | GetWorkflow
    | GetWorkflowSuccess
    | GetWorkflowFailed
    | SaveWorkflow
    | SaveWorkflowSuccess
    | SaveWorkflowFailed
    | UpdateWorkflow
    | UpdateWorkflowSuccess
    | UpdateWorkflowFailed
    | ReloadWorkflow;
