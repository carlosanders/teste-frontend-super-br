import {Action} from '@ngrx/store';

export const GET_VINCULACAO_TRANSICAO_WORKFLOW = '[ADMIN VINCULACAO TRANSICAO WORKFLOW LIST] GET VINCULACAO TRANSICAO WORKFLOW';
export const GET_VINCULACAO_TRANSICAO_WORKFLOW_SUCCESS = '[ADMIN VINCULACAO TRANSICAO WORKFLOW LIST] GET VINCULACAO TRANSICAO WORKFLOW SUCCESS';
export const GET_VINCULACAO_TRANSICAO_WORKFLOW_FAILED = '[ADMIN VINCULACAO TRANSICAO WORKFLOW LIST] GET VINCULACAO TRANSICAO WORKFLOW FAILED';

export const DELETE_VINCULACAO_TRANSICAO_WORKFLOW = '[ADMIN VINCULACAO TRANSICAO_WORKFLOW LIST] DELETE VINCULACAO TRANSICAO WORKFLOW';
export const DELETE_VINCULACAO_TRANSICAO_WORKFLOW_SUCCESS = '[ADMIN VINCULACAO TRANSICAO_WORKFLOW LIST] DELETE VINCULACAO TRANSICAO WORKFLOW SUCCESS';
export const DELETE_VINCULACAO_TRANSICAO_WORKFLOW_FAILED = '[ADMIN VINCULACAO TRANSICAO_WORKFLOW LIST] DELETE VINCULACAO TRANSICAO WORKFLOW FAILED';

export const UNLOAD_VINCULACAO_TRANSICAO_WORKFLOW = '[ADMIN VINCULACAO TRANSICAO_WORKFLOW LIST] UNLOAD VINCULACAO TRANSICAO WORKFLOW FAILED';

export class GetVinculacaoTransicaoWorkflow implements Action {
    readonly type = GET_VINCULACAO_TRANSICAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

export class GetVinculacaoTransicaoWorkflowSuccess implements Action {
    readonly type = GET_VINCULACAO_TRANSICAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetVinculacaoTransicaoWorkflowFailed implements Action {
    readonly type = GET_VINCULACAO_TRANSICAO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

export class DeleteVinculacaoTransicaoWorkflow implements Action {
    readonly type = DELETE_VINCULACAO_TRANSICAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

export class DeleteVinculacaoTransicaoWorkflowSuccess implements Action {
    readonly type = DELETE_VINCULACAO_TRANSICAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DeleteVinculacaoTransicaoWorkflowFailed implements Action {
    readonly type = DELETE_VINCULACAO_TRANSICAO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

export class UnloadVinculacaoTransicaoWorkflowFailed implements Action {
    readonly type = UNLOAD_VINCULACAO_TRANSICAO_WORKFLOW;
}

export type VinculacaoTransicaoWorkflowListActionsAll
    = GetVinculacaoTransicaoWorkflow
    | GetVinculacaoTransicaoWorkflowSuccess
    | GetVinculacaoTransicaoWorkflowFailed
    | DeleteVinculacaoTransicaoWorkflow
    | DeleteVinculacaoTransicaoWorkflowSuccess
    | DeleteVinculacaoTransicaoWorkflowFailed
    | UnloadVinculacaoTransicaoWorkflowFailed
    ;
