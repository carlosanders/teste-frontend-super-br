import {Action} from '@ngrx/store';

export const CREATE_TIPO_VALIDACAO_WORKFLOW = '[ADMIN TIPO_VALIDACAO_WORKFLOW EDIT] CREATE TIPO_VALIDACAO_WORKFLOW';
export const CREATE_TIPO_VALIDACAO_WORKFLOW_SUCCESS = '[ADMIN TIPO_VALIDACAO_WORKFLOW EDIT] CREATE TIPO_VALIDACAO_WORKFLOW SUCCESS';

export const SAVE_TIPO_VALIDACAO_WORKFLOW = '[ADMIN TIPO_VALIDACAO_WORKFLOW EDIT] SAVE TIPO_VALIDACAO_WORKFLOW';
export const SAVE_TIPO_VALIDACAO_WORKFLOW_SUCCESS = '[ADMIN TIPO_VALIDACAO_WORKFLOW EDIT] SAVE TIPO_VALIDACAO_WORKFLOW SUCCESS';
export const SAVE_TIPO_VALIDACAO_WORKFLOW_FAILED = '[ADMIN TIPO_VALIDACAO_WORKFLOW EDIT] SAVE TIPO_VALIDACAO_WORKFLOW FAILED';

export const UPDATE_TIPO_VALIDACAO_WORKFLOW = '[ADMIN TIPO_VALIDACAO_WORKFLOW EDIT] UPDATE TIPO_VALIDACAO_WORKFLOW';
export const UPDATE_TIPO_VALIDACAO_WORKFLOW_SUCCESS = '[ADMIN TIPO_VALIDACAO_WORKFLOW EDIT] UPDATE TIPO_VALIDACAO_WORKFLOW SUCCESS';
export const UPDATE_TIPO_VALIDACAO_WORKFLOW_FAILED = '[ADMIN TIPO_VALIDACAO_WORKFLOW EDIT] UPDATE TIPO_VALIDACAO_WORKFLOW FAILED';

export const GET_TIPO_VALIDACAO_WORKFLOW = '[ADMIN TIPO_VALIDACAO_WORKFLOW EDIT] GET TIPO_VALIDACAO_WORKFLOW';
export const GET_TIPO_VALIDACAO_WORKFLOW_SUCCESS = '[ADMIN TIPO_VALIDACAO_WORKFLOW EDIT] GET TIPO_VALIDACAO_WORKFLOW SUCCESS';
export const GET_TIPO_VALIDACAO_WORKFLOW_FAILED = '[ADMIN TIPO_VALIDACAO_WORKFLOW EDIT] GET TIPO_VALIDACAO_WORKFLOW FAILED';

export const SAVE_COLABORADOR = '[ADMIN TIPO_VALIDACAO_WORKFLOW EDIT] SAVE COLABORADOR';
export const SAVE_COLABORADOR_SUCCESS = '[ADMIN TIPO_VALIDACAO_WORKFLOW EDIT] SAVE COLABORADOR SUCCESS';
export const SAVE_COLABORADOR_FAILED = '[ADMIN TIPO_VALIDACAO_WORKFLOW EDIT] SAVE COLABORADOR FAILED';

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
 * Save TipoValidacaoWorkflow
 */
export class SaveTipoValidacaoWorkflow implements Action {
    readonly type = SAVE_TIPO_VALIDACAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Update TipoValidacaoWorkflow
 */
export class UpdateTipoValidacaoWorkflow implements Action {
    readonly type = UPDATE_TIPO_VALIDACAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Save TipoValidacaoWorkflow Success
 */
export class SaveTipoValidacaoWorkflowSuccess implements Action {
    readonly type = SAVE_TIPO_VALIDACAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save TipoValidacaoWorkflow Failed
 */
export class SaveTipoValidacaoWorkflowFailed implements Action {
    readonly type = SAVE_TIPO_VALIDACAO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update TipoValidacaoWorkflow Success
 */
export class UpdateTipoValidacaoWorkflowSuccess implements Action {
    readonly type = UPDATE_TIPO_VALIDACAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update TipoValidacaoWorkflow Failed
 */
export class UpdateTipoValidacaoWorkflowFailed implements Action {
    readonly type = UPDATE_TIPO_VALIDACAO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create TipoValidacaoWorkflow
 */
export class CreateTipoValidacaoWorkflow implements Action {
    readonly type = CREATE_TIPO_VALIDACAO_WORKFLOW;

    constructor() {
    }
}

/**
 * Create TipoValidacaoWorkflow Success
 */
export class CreateTipoValidacaoWorkflowSuccess implements Action {
    readonly type = CREATE_TIPO_VALIDACAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Colaborador
 */
export class SaveColaborador implements Action {
    readonly type = SAVE_COLABORADOR;

    constructor(public payload: any) {
    }
}

/**
 * Save Colaborador Success
 */
export class SaveColaboradorSuccess implements Action {
    readonly type = SAVE_COLABORADOR_SUCCESS;

    constructor() {
    }
}

/**
 * Save Colaborador Failed
 */
export class SaveColaboradorFailed implements Action {
    readonly type = SAVE_COLABORADOR_FAILED;

    constructor(public payload: any) {
    }
}

export type TipoValidacaoWorkflowEditActionsAll
    = CreateTipoValidacaoWorkflow
    | CreateTipoValidacaoWorkflowSuccess
    | GetTipoValidacaoWorkflow
    | GetTipoValidacaoWorkflowSuccess
    | GetTipoValidacaoWorkflowFailed
    | SaveTipoValidacaoWorkflow
    | SaveTipoValidacaoWorkflowSuccess
    | SaveTipoValidacaoWorkflowFailed
    | UpdateTipoValidacaoWorkflow
    | UpdateTipoValidacaoWorkflowSuccess
    | UpdateTipoValidacaoWorkflowFailed
    | SaveColaborador
    | SaveColaboradorSuccess
    | SaveColaboradorFailed;
