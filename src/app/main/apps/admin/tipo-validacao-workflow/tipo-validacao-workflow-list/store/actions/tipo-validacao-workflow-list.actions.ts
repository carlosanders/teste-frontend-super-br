import {Action} from '@ngrx/store';

export const GET_TIPO_VALIDACAO_WORKFLOW = '[SUPERADMIN ESPECIE PROCESSO LIST] GET TIPO_VALIDACAO_WORKFLOW';
export const GET_TIPO_VALIDACAO_WORKFLOW_SUCCESS = '[SUPERADMIN ESPECIE PROCESSO LIST] GET TIPO_VALIDACAO_WORKFLOW SUCCESS';
export const GET_TIPO_VALIDACAO_WORKFLOW_FAILED = '[SUPERADMIN ESPECIE PROCESSO LIST] GET TIPO_VALIDACAO_WORKFLOW FAILED';

export const RELOAD_TIPO_VALIDACAO_WORKFLOW = '[SUPERADMIN ESPECIE PROCESSO LIST] RELOAD TIPO_VALIDACAO_WORKFLOW';

export const DELETE_TIPO_VALIDACAO_WORKFLOW = '[SUPERADMIN ESPECIE PROCESSO LIST] DELETE TIPO_VALIDACAO_WORKFLOW';
export const DELETE_TIPO_VALIDACAO_WORKFLOW_SUCCESS = '[SUPERADMIN ESPECIE PROCESSO LIST] DELETE TIPO_VALIDACAO_WORKFLOW SUCCESS';
export const DELETE_TIPO_VALIDACAO_WORKFLOW_FAILED = '[SUPERADMIN ESPECIE PROCESSO LIST] DELETE TIPO_VALIDACAO_WORKFLOW FAILED';

/**
 * Get TipoValidacaoWorkflow
 */
export class GetTipoValidacaoWorkflow implements Action {
    readonly type = GET_TIPO_VALIDACAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Get TipoValidacaoWorkflow Success
 */
export class GetTipoValidacaoWorkflowSuccess implements Action {
    readonly type = GET_TIPO_VALIDACAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get TipoValidacaoWorkflow Failed
 */
export class GetTipoValidacaoWorkflowFailed implements Action {
    readonly type = GET_TIPO_VALIDACAO_WORKFLOW_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload TipoValidacaoWorkflow
 */
export class ReloadTipoValidacaoWorkflow implements Action {
    readonly type = RELOAD_TIPO_VALIDACAO_WORKFLOW;

    constructor() {
    }
}

/**
 * Delete TipoValidacaoWorkflow
 */
export class DeleteTipoValidacaoWorkflow implements Action {
    readonly type = DELETE_TIPO_VALIDACAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Delete TipoValidacaoWorkflow Success
 */
export class DeleteTipoValidacaoWorkflowSuccess implements Action {
    readonly type = DELETE_TIPO_VALIDACAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete TipoValidacaoWorkflow Failed
 */
export class DeleteTipoValidacaoWorkflowFailed implements Action {
    readonly type = DELETE_TIPO_VALIDACAO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

export type TipoValidacaoWorkflowListActionsAll
    = GetTipoValidacaoWorkflow
    | GetTipoValidacaoWorkflowSuccess
    | GetTipoValidacaoWorkflowFailed
    | ReloadTipoValidacaoWorkflow
    | DeleteTipoValidacaoWorkflow
    | DeleteTipoValidacaoWorkflowSuccess
    | DeleteTipoValidacaoWorkflowFailed;

