import {Action} from '@ngrx/store';

export const SAVE_VINCULACAO_TRANSICAO_WORKFLOW = '[ADMINVINCULACAO TRANSICAO WORKFLOW EDIT] SAVEVINCULACAO TRANSICAO WORKFLOW';
export const SAVE_VINCULACAO_TRANSICAO_WORKFLOW_SUCCESS = '[ADMINVINCULACAO TRANSICAO WORKFLOW EDIT] SAVEVINCULACAO TRANSICAO WORKFLOW SUCCESS';
export const SAVE_VINCULACAO_TRANSICAO_WORKFLOW_FAILED = '[ADMINVINCULACAO TRANSICAO WORKFLOW EDIT] SAVEVINCULACAO TRANSICAO WORKFLOW FAILED';

/**
 * Save VinculacaoTransicaoWorkflow
 */
export class SaveVinculacaoTransicaoWorkflow implements Action {
    readonly type = SAVE_VINCULACAO_TRANSICAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Save VinculacaoTransicaoWorkflow Success
 */
export class SaveVinculacaoTransicaoWorkflowSuccess implements Action {
    readonly type = SAVE_VINCULACAO_TRANSICAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save VinculacaoTransicaoWorkflow Failed
 */
export class SaveVinculacaoTransicaoWorkflowFailed implements Action {
    readonly type = SAVE_VINCULACAO_TRANSICAO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

export type VinculacaoTransicaoWorkflowActionsAll
    = SaveVinculacaoTransicaoWorkflow
    | SaveVinculacaoTransicaoWorkflowSuccess
    | SaveVinculacaoTransicaoWorkflowFailed;
