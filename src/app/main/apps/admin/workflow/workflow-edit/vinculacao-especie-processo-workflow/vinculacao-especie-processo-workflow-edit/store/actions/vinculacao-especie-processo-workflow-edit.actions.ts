import {Action} from '@ngrx/store';

export const GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW EDIT] GET ESPECIE PROCESSO';
export const GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_SUCCESS = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW EDIT] GET ESPECIE PROCESSO SUCCESS';
export const GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_FAILED = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW EDIT] GET ESPECIE PROCESSO FAILED';
export const SAVE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW EDIT] SAVE ESPECIE PROCESSO';
export const SAVE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_SUCCESS = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW EDIT] SAVE ESPECIE PROCESSO SUCCESS';
export const SAVE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_FAILED = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW EDIT] SAVE ESPECIE PROCESSO FAILED';
export const RELOAD_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW EDIT] RELOAD ESPECIE PROCESSO';
export const RELOAD_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_SUCCESS = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW EDIT] RELOAD ESPECIE PROCESSO SUCCESS';
export const RELOAD_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_FAILED = '[ADMIN VINCULACAO ESPECIE PROCESSO WORKFLOW EDIT] RELOAD ESPECIE PROCESSO FAILED';

export class GetVinculacaoEspecieProcessoWorkflow implements Action {
    readonly type = GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW;

    constructor(public payload: any) {
    }
}

export class GetVinculacaoEspecieProcessoWorkflowSuccess implements Action {
    readonly type = GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetVinculacaoEspecieProcessoWorkflowFailed implements Action {
    readonly type = GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

export class SaveVinculacaoEspecieProcessoWorkflow implements Action {
    readonly type = SAVE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW;

    constructor(public payload: any) {
    }
}

export class SaveVinculacaoEspecieProcessoWorkflowSuccess implements Action {
    readonly type = SAVE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

export class SaveVinculacaoEspecieProcessoWorkflowFailed implements Action {
    readonly type = SAVE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

export class ReloadVinculacaoEspecieProcessoWorkflow implements Action {
    readonly type = RELOAD_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW;

    constructor(public payload: any) {
    }
}

export class ReloadVinculacaoEspecieProcessoWorkflowSuccess implements Action {
    readonly type = RELOAD_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

export class ReloadVinculacaoEspecieProcessoWorkflowFailed implements Action {
    readonly type = RELOAD_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

export type VinculacaoEspecieProcessoWorkflowEditActionsAll
    = GetVinculacaoEspecieProcessoWorkflow
    | GetVinculacaoEspecieProcessoWorkflowSuccess
    | GetVinculacaoEspecieProcessoWorkflowFailed
    | SaveVinculacaoEspecieProcessoWorkflow
    | SaveVinculacaoEspecieProcessoWorkflowSuccess
    | SaveVinculacaoEspecieProcessoWorkflowFailed
    | ReloadVinculacaoEspecieProcessoWorkflow
    | ReloadVinculacaoEspecieProcessoWorkflowSuccess
    | ReloadVinculacaoEspecieProcessoWorkflowFailed;
