import {Action} from '@ngrx/store';

export const GET_TRANSICAO_WORKFLOW = '[ADMIN TRANSICAO_WORKFLOW LIST] GET TRANSICAO_WORKFLOW';
export const GET_TRANSICAO_WORKFLOW_SUCCESS = '[ADMIN TRANSICAO_WORKFLOW LIST] GET TRANSICAO_WORKFLOW SUCCESS';
export const GET_TRANSICAO_WORKFLOW_FAILED = '[ADMIN TRANSICAO_WORKFLOW LIST] GET TRANSICAO_WORKFLOW FAILED';

export const UNLOAD_TRANSICAO_WORKFLOW = '[ADMIN TRANSICAO_WORKFLOW LIST] UNLOAD TRANSICAO_WORKFLOW';

export const DELETE_TRANSICAO_WORKFLOW = '[ADMIN TRANSICAO_WORKFLOW LIST] DELETE TRANSICAO_WORKFLOW';
export const DELETE_TRANSICAO_WORKFLOW_SUCCESS = '[ADMIN TRANSICAO_WORKFLOW LIST] DELETE TRANSICAO_WORKFLOW SUCCESS';
export const DELETE_TRANSICAO_WORKFLOW_FAILED = '[ADMIN TRANSICAO_WORKFLOW LIST] DELETE TRANSICAO_WORKFLOW FAILED';

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
 * Unload TransicaoWorkflow
 */
export class UnloadTransicaoWorkflow implements Action {
    readonly type = UNLOAD_TRANSICAO_WORKFLOW;

    constructor() {
    }
}

/**
 * Delete TransicaoWorkflow
 */
export class DeleteTransicaoWorkflow implements Action {
    readonly type = DELETE_TRANSICAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Delete TransicaoWorkflow Success
 */
export class DeleteTransicaoWorkflowSuccess implements Action {
    readonly type = DELETE_TRANSICAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete TransicaoWorkflow Failed
 */
export class DeleteTransicaoWorkflowFailed implements Action {
    readonly type = DELETE_TRANSICAO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

export type TransicaoWorkflowListActionsAll
    = GetTransicaoWorkflow
    | GetTransicaoWorkflowSuccess
    | GetTransicaoWorkflowFailed
    | UnloadTransicaoWorkflow
    | DeleteTransicaoWorkflow
    | DeleteTransicaoWorkflowSuccess
    | DeleteTransicaoWorkflowFailed;

