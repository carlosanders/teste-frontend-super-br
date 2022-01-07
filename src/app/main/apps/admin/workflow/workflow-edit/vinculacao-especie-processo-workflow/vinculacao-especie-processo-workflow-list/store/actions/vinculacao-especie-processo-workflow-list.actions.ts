import {Action} from '@ngrx/store';

export const GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW LIST] GET VINCULACAO_ESPECIE_PROCESSO_WORKFLOW';
export const GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_SUCCESS = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW LIST] GET VINCULACAO_ESPECIE_PROCESSO_WORKFLOW SUCCESS';
export const GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_FAILED = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW LIST] GET VINCULACAO_ESPECIE_PROCESSO_WORKFLOW FAILED';

export const UNLOAD_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW LIST] UNLOAD VINCULACAO_ESPECIE_PROCESSO_WORKFLOW';

export const DELETE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW LIST] DELETE VINCULACAO_ESPECIE_PROCESSO_WORKFLOW';
export const DELETE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_SUCCESS = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW LIST] DELETE VINCULACAO_ESPECIE_PROCESSO_WORKFLOW SUCCESS';
export const DELETE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_FAILED = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW LIST] DELETE VINCULACAO_ESPECIE_PROCESSO_WORKFLOW FAILED';

/**
 * Get VinculacaoEspecieProcessoWorkflow
 */
export class GetVinculacaoEspecieProcessoWorkflow implements Action {
    readonly type = GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Get VinculacaoEspecieProcessoWorkflow Success
 */
export class GetVinculacaoEspecieProcessoWorkflowSuccess implements Action {
    readonly type = GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get VinculacaoEspecieProcessoWorkflow Failed
 */
export class GetVinculacaoEspecieProcessoWorkflowFailed implements Action {
    readonly type = GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Unload VinculacaoEspecieProcessoWorkflow
 */
export class UnloadVinculacaoEspecieProcessoWorkflow implements Action {
    readonly type = UNLOAD_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW;

    constructor() {
    }
}

/**
 * Update VinculacaoEspecieProcessoWorkflow
 */
export class DeleteVinculacaoEspecieProcessoWorkflow implements Action {
    readonly type = DELETE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Update VinculacaoEspecieProcessoWorkflow Success
 */
export class DeleteVinculacaoEspecieProcessoWorkflowSuccess implements Action {
    readonly type = DELETE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update VinculacaoEspecieProcessoWorkflow Failed
 */
export class DeleteVinculacaoEspecieProcessoWorkflowFailed implements Action {
    readonly type = DELETE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

export type VinculacaoEspecieProcessoWorkflowListActionsAll
    = GetVinculacaoEspecieProcessoWorkflow
    | GetVinculacaoEspecieProcessoWorkflowSuccess
    | GetVinculacaoEspecieProcessoWorkflowFailed
    | UnloadVinculacaoEspecieProcessoWorkflow
    | DeleteVinculacaoEspecieProcessoWorkflow
    | DeleteVinculacaoEspecieProcessoWorkflowSuccess
    | DeleteVinculacaoEspecieProcessoWorkflowFailed;

