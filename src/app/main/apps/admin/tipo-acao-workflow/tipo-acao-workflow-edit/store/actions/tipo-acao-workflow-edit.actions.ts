import {Action} from '@ngrx/store';

export const CREATE_TIPO_ACAO_WORKFLOW = '[ADMIN TIPO_ACAO_WORKFLOW EDIT] CREATE TIPO_ACAO_WORKFLOW';
export const CREATE_TIPO_ACAO_WORKFLOW_SUCCESS = '[ADMIN TIPO_ACAO_WORKFLOW EDIT] CREATE TIPO_ACAO_WORKFLOW SUCCESS';

export const SAVE_TIPO_ACAO_WORKFLOW = '[ADMIN TIPO_ACAO_WORKFLOW EDIT] SAVE TIPO_ACAO_WORKFLOW';
export const SAVE_TIPO_ACAO_WORKFLOW_SUCCESS = '[ADMIN TIPO_ACAO_WORKFLOW EDIT] SAVE TIPO_ACAO_WORKFLOW SUCCESS';
export const SAVE_TIPO_ACAO_WORKFLOW_FAILED = '[ADMIN TIPO_ACAO_WORKFLOW EDIT] SAVE TIPO_ACAO_WORKFLOW FAILED';

export const UPDATE_TIPO_ACAO_WORKFLOW = '[ADMIN TIPO_ACAO_WORKFLOW EDIT] UPDATE TIPO_ACAO_WORKFLOW';
export const UPDATE_TIPO_ACAO_WORKFLOW_SUCCESS = '[ADMIN TIPO_ACAO_WORKFLOW EDIT] UPDATE TIPO_ACAO_WORKFLOW SUCCESS';
export const UPDATE_TIPO_ACAO_WORKFLOW_FAILED = '[ADMIN TIPO_ACAO_WORKFLOW EDIT] UPDATE TIPO_ACAO_WORKFLOW FAILED';

export const GET_TIPO_ACAO_WORKFLOW = '[ADMIN TIPO_ACAO_WORKFLOW EDIT] GET TIPO_ACAO_WORKFLOW';
export const GET_TIPO_ACAO_WORKFLOW_SUCCESS = '[ADMIN TIPO_ACAO_WORKFLOW EDIT] GET TIPO_ACAO_WORKFLOW SUCCESS';
export const GET_TIPO_ACAO_WORKFLOW_FAILED = '[ADMIN TIPO_ACAO_WORKFLOW EDIT] GET TIPO_ACAO_WORKFLOW FAILED';

export const SAVE_COLABORADOR = '[ADMIN TIPO_ACAO_WORKFLOW EDIT] SAVE COLABORADOR';
export const SAVE_COLABORADOR_SUCCESS = '[ADMIN TIPO_ACAO_WORKFLOW EDIT] SAVE COLABORADOR SUCCESS';
export const SAVE_COLABORADOR_FAILED = '[ADMIN TIPO_ACAO_WORKFLOW EDIT] SAVE COLABORADOR FAILED';

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
 * Save TipoAcaoWorkflow
 */
export class SaveTipoAcaoWorkflow implements Action {
    readonly type = SAVE_TIPO_ACAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Update TipoAcaoWorkflow
 */
export class UpdateTipoAcaoWorkflow implements Action {
    readonly type = UPDATE_TIPO_ACAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

/**
 * Save TipoAcaoWorkflow Success
 */
export class SaveTipoAcaoWorkflowSuccess implements Action {
    readonly type = SAVE_TIPO_ACAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save TipoAcaoWorkflow Failed
 */
export class SaveTipoAcaoWorkflowFailed implements Action {
    readonly type = SAVE_TIPO_ACAO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update TipoAcaoWorkflow Success
 */
export class UpdateTipoAcaoWorkflowSuccess implements Action {
    readonly type = UPDATE_TIPO_ACAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update TipoAcaoWorkflow Failed
 */
export class UpdateTipoAcaoWorkflowFailed implements Action {
    readonly type = UPDATE_TIPO_ACAO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create TipoAcaoWorkflow
 */
export class CreateTipoAcaoWorkflow implements Action {
    readonly type = CREATE_TIPO_ACAO_WORKFLOW;

    constructor() {
    }
}

/**
 * Create TipoAcaoWorkflow Success
 */
export class CreateTipoAcaoWorkflowSuccess implements Action {
    readonly type = CREATE_TIPO_ACAO_WORKFLOW_SUCCESS;

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

export type TipoAcaoWorkflowEditActionsAll
    = CreateTipoAcaoWorkflow
    | CreateTipoAcaoWorkflowSuccess
    | GetTipoAcaoWorkflow
    | GetTipoAcaoWorkflowSuccess
    | GetTipoAcaoWorkflowFailed
    | SaveTipoAcaoWorkflow
    | SaveTipoAcaoWorkflowSuccess
    | SaveTipoAcaoWorkflowFailed
    | UpdateTipoAcaoWorkflow
    | UpdateTipoAcaoWorkflowSuccess
    | UpdateTipoAcaoWorkflowFailed
    | SaveColaborador
    | SaveColaboradorSuccess
    | SaveColaboradorFailed;
