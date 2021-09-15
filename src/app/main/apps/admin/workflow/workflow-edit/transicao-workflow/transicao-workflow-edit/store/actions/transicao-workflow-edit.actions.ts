import {Action} from '@ngrx/store';

export const CREATE_TRANSICAO_WORKFLOW = '[ADMIN TRANSICAO_WORKFLOW EDIT] CREATE TRANSICAO_WORKFLOW';
export const CREATE_TRANSICAO_WORKFLOW_SUCCESS = '[ADMIN TRANSICAO_WORKFLOW EDIT] CREATE TRANSICAO_WORKFLOW SUCCESS';

export const GET_TRANSICAO_WORKFLOW = '[ADMIN TRANSICAO_WORKFLOW EDIT] GET TRANSICAO_WORKFLOW';
export const GET_TRANSICAO_WORKFLOW_SUCCESS = '[ADMIN TRANSICAO_WORKFLOW EDIT] GET TRANSICAO_WORKFLOW SUCCESS';
export const GET_TRANSICAO_WORKFLOW_FAILED = '[ADMIN TRANSICAO_WORKFLOW EDIT] GET TRANSICAO_WORKFLOW FAILED';

/**
 * Get TransicaoWorkflow
 */
export class GetTransicaoWorkflow implements Action {
    readonly type = GET_TRANSICAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Get TransicaoWorkflow Success
 */
export class GetTransicaoWorkflowSuccess implements Action {
    readonly type = GET_TRANSICAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get TransicaoWorkflow Failed
 */
export class GetTransicaoWorkflowFailed implements Action {
    readonly type = GET_TRANSICAO_WORKFLOW_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Create TransicaoWorkflow
 */
export class CreateTransicaoWorkflow implements Action {
    readonly type = CREATE_TRANSICAO_WORKFLOW;

    constructor() {
    }
}

/**
 * Create TransicaoWorkflow Success
 */
export class CreateTransicaoWorkflowSuccess implements Action {
    readonly type = CREATE_TRANSICAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

export type TransicaoWorkflowEditActionsAll
    = CreateTransicaoWorkflow
    | CreateTransicaoWorkflowSuccess
    | GetTransicaoWorkflow
    | GetTransicaoWorkflowSuccess
    | GetTransicaoWorkflowFailed;
