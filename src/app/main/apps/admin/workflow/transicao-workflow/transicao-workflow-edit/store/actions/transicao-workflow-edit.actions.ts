import { Action } from '@ngrx/store';

export const CREATE_TRANSICAO_WORKFLOW = '[ADMIN TRANSICAO_WORKFLOW EDIT] CREATE TRANSICAO_WORKFLOW';
export const CREATE_TRANSICAO_WORKFLOW_SUCCESS = '[ADMIN TRANSICAO_WORKFLOW EDIT] CREATE TRANSICAO_WORKFLOW SUCCESS';

export const SAVE_TRANSICAO_WORKFLOW = '[ADMIN TRANSICAO_WORKFLOW EDIT] SAVE TRANSICAO_WORKFLOW';
export const SAVE_TRANSICAO_WORKFLOW_SUCCESS = '[ADMIN TRANSICAO_WORKFLOW EDIT] SAVE TRANSICAO_WORKFLOW SUCCESS';
export const SAVE_TRANSICAO_WORKFLOW_FAILED = '[ADMIN TRANSICAO_WORKFLOW EDIT] SAVE TRANSICAO_WORKFLOW FAILED';

export const UPDATE_TRANSICAO_WORKFLOW = '[ADMIN TRANSICAO_WORKFLOW EDIT] UPDATE TRANSICAO_WORKFLOW';
export const UPDATE_TRANSICAO_WORKFLOW_SUCCESS = '[ADMIN TRANSICAO_WORKFLOW EDIT] UPDATE TRANSICAO_WORKFLOW SUCCESS';
export const UPDATE_TRANSICAO_WORKFLOW_FAILED = '[ADMIN TRANSICAO_WORKFLOW EDIT] UPDATE TRANSICAO_WORKFLOW FAILED';

export const GET_TRANSICAO_WORKFLOW = '[ADMIN TRANSICAO_WORKFLOW EDIT] GET TRANSICAO_WORKFLOW';
export const GET_TRANSICAO_WORKFLOW_SUCCESS = '[ADMIN TRANSICAO_WORKFLOW EDIT] GET TRANSICAO_WORKFLOW SUCCESS';
export const GET_TRANSICAO_WORKFLOW_FAILED = '[ADMIN TRANSICAO_WORKFLOW EDIT] GET TRANSICAO_WORKFLOW FAILED';

export const RELOAD_TRANSICAO_WORKFLOW = '[ADMIN TRANSICAO_WORKFLOW LIST] RELOAD TRANSICAO_WORKFLOW';

/**
 * Get TransicaoWorkflow
 */
export class GetTransicaoWorkflow implements Action
{
    readonly type = GET_TRANSICAO_WORKFLOW;

    constructor(public payload: any)
    {
    }
}

/**
 * Get TransicaoWorkflow Success
 */
export class GetTransicaoWorkflowSuccess implements Action
{
    readonly type = GET_TRANSICAO_WORKFLOW_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get TransicaoWorkflow Failed
 */
export class GetTransicaoWorkflowFailed implements Action
{
    readonly type = GET_TRANSICAO_WORKFLOW_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save TransicaoWorkflow
 */
export class SaveTransicaoWorkflow implements Action
{
    readonly type = SAVE_TRANSICAO_WORKFLOW;

    constructor(public payload: any)
    {
    }
}

/**
 * Update TransicaoWorkflow
 */
export class UpdateTransicaoWorkflow implements Action
{
    readonly type = UPDATE_TRANSICAO_WORKFLOW;

    constructor(public payload: any)
    {
    }
}

/**
 * Save TransicaoWorkflow Success
 */
export class SaveTransicaoWorkflowSuccess implements Action
{
    readonly type = SAVE_TRANSICAO_WORKFLOW_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save TransicaoWorkflow Failed
 */
export class SaveTransicaoWorkflowFailed implements Action
{
    readonly type = SAVE_TRANSICAO_WORKFLOW_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Update TransicaoWorkflow Success
 */
export class UpdateTransicaoWorkflowSuccess implements Action
{
    readonly type = UPDATE_TRANSICAO_WORKFLOW_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Update TransicaoWorkflow Failed
 */
export class UpdateTransicaoWorkflowFailed implements Action
{
    readonly type = UPDATE_TRANSICAO_WORKFLOW_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create TransicaoWorkflow
 */
export class CreateTransicaoWorkflow implements Action
{
    readonly type = CREATE_TRANSICAO_WORKFLOW;

    constructor()
    {
    }
}

/**
 * Create TransicaoWorkflow Success
 */
export class CreateTransicaoWorkflowSuccess implements Action
{
    readonly type = CREATE_TRANSICAO_WORKFLOW_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ReloadTransicaoWorkflow
 */
export class ReloadTransicaoWorkflow implements Action
{
    readonly type = RELOAD_TRANSICAO_WORKFLOW;

    constructor(public payload: any)
    {
    }
}



export type TransicaoWorkflowEditActionsAll
    = CreateTransicaoWorkflow
    | CreateTransicaoWorkflowSuccess
    | GetTransicaoWorkflow
    | GetTransicaoWorkflowSuccess
    | GetTransicaoWorkflowFailed
    | SaveTransicaoWorkflow
    | SaveTransicaoWorkflowSuccess
    | SaveTransicaoWorkflowFailed
    | UpdateTransicaoWorkflow
    | UpdateTransicaoWorkflowSuccess
    | UpdateTransicaoWorkflowFailed
    | ReloadTransicaoWorkflow;
