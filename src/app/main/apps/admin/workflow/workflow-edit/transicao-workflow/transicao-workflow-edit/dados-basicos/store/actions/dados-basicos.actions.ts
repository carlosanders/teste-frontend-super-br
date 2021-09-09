import {Action} from '@ngrx/store';

export const SAVE_TRANSICAO_WORKFLOW = '[ADMIN TRANSICAO_WORKFLOW EDIT] SAVE TRANSICAO_WORKFLOW';
export const SAVE_TRANSICAO_WORKFLOW_SUCCESS = '[ADMIN TRANSICAO_WORKFLOW EDIT] SAVE TRANSICAO_WORKFLOW SUCCESS';
export const SAVE_TRANSICAO_WORKFLOW_FAILED = '[ADMIN TRANSICAO_WORKFLOW EDIT] SAVE TRANSICAO_WORKFLOW FAILED';

/**
 * Save TransicaoWorkflow
 */
export class SaveTransicaoWorkflow implements Action {
    readonly type = SAVE_TRANSICAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Save TransicaoWorkflow Success
 */
export class SaveTransicaoWorkflowSuccess implements Action {
    readonly type = SAVE_TRANSICAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save TransicaoWorkflow Failed
 */
export class SaveTransicaoWorkflowFailed implements Action {
    readonly type = SAVE_TRANSICAO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

export type TransicaoWorkflowDadosBasicosActionsAll
    = SaveTransicaoWorkflow
    | SaveTransicaoWorkflowSuccess
    | SaveTransicaoWorkflowFailed;
