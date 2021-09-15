import {Action} from '@ngrx/store';

export const SAVE_WORKFLOW = '[ADMIN WORKFLOW DADOS BASICOS] SAVE WORKFLOW';
export const SAVE_WORKFLOW_SUCCESS = '[ADMIN WORKFLOW DADOS BASICOS] SAVE WORKFLOW SUCCESS';
export const SAVE_WORKFLOW_FAILED = '[ADMIN WORKFLOW DADOS BASICOS] SAVE WORKFLOW FAILED';

/**
 * Save Workflow
 */
export class SaveWorkflow implements Action {
    readonly type = SAVE_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Save Workflow Success
 */
export class SaveWorkflowSuccess implements Action {
    readonly type = SAVE_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Workflow Failed
 */
export class SaveWorkflowFailed implements Action {
    readonly type = SAVE_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

export type WorkflowDadosBasicosActionsAll
    = SaveWorkflow
    | SaveWorkflowSuccess
    | SaveWorkflowFailed;
