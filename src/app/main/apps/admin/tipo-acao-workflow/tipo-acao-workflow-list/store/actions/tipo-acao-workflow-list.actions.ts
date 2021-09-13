import {Action} from '@ngrx/store';

export const GET_TIPO_ACAO_WORKFLOW = '[SUPERADMIN ESPECIE PROCESSO LIST] GET TIPO_ACAO_WORKFLOW';
export const GET_TIPO_ACAO_WORKFLOW_SUCCESS = '[SUPERADMIN ESPECIE PROCESSO LIST] GET TIPO_ACAO_WORKFLOW SUCCESS';
export const GET_TIPO_ACAO_WORKFLOW_FAILED = '[SUPERADMIN ESPECIE PROCESSO LIST] GET TIPO_ACAO_WORKFLOW FAILED';

export const RELOAD_TIPO_ACAO_WORKFLOW = '[SUPERADMIN ESPECIE PROCESSO LIST] RELOAD TIPO_ACAO_WORKFLOW';

export const DELETE_TIPO_ACAO_WORKFLOW = '[SUPERADMIN ESPECIE PROCESSO LIST] DELETE TIPO_ACAO_WORKFLOW';
export const DELETE_TIPO_ACAO_WORKFLOW_SUCCESS = '[SUPERADMIN ESPECIE PROCESSO LIST] DELETE TIPO_ACAO_WORKFLOW SUCCESS';
export const DELETE_TIPO_ACAO_WORKFLOW_FAILED = '[SUPERADMIN ESPECIE PROCESSO LIST] DELETE TIPO_ACAO_WORKFLOW FAILED';

/**
 * Get TipoAcaoWorkflow
 */
export class GetTipoAcaoWorkflow implements Action {
    readonly type = GET_TIPO_ACAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Get TipoAcaoWorkflow Success
 */
export class GetTipoAcaoWorkflowSuccess implements Action {
    readonly type = GET_TIPO_ACAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get TipoAcaoWorkflow Failed
 */
export class GetTipoAcaoWorkflowFailed implements Action {
    readonly type = GET_TIPO_ACAO_WORKFLOW_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload TipoAcaoWorkflow
 */
export class ReloadTipoAcaoWorkflow implements Action {
    readonly type = RELOAD_TIPO_ACAO_WORKFLOW;

    constructor() {
    }
}

/**
 * Delete TipoAcaoWorkflow
 */
export class DeleteTipoAcaoWorkflow implements Action {
    readonly type = DELETE_TIPO_ACAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Delete TipoAcaoWorkflow Success
 */
export class DeleteTipoAcaoWorkflowSuccess implements Action {
    readonly type = DELETE_TIPO_ACAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete TipoAcaoWorkflow Failed
 */
export class DeleteTipoAcaoWorkflowFailed implements Action {
    readonly type = DELETE_TIPO_ACAO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

export type TipoAcaoWorkflowListActionsAll
    = GetTipoAcaoWorkflow
    | GetTipoAcaoWorkflowSuccess
    | GetTipoAcaoWorkflowFailed
    | ReloadTipoAcaoWorkflow
    | DeleteTipoAcaoWorkflow
    | DeleteTipoAcaoWorkflowSuccess
    | DeleteTipoAcaoWorkflowFailed;

