import {Action} from '@ngrx/store';

export const GET_TIPO_ACAO_WORKFLOW = '[TIPO ACAO WORKFLOW EDIT] GET TIPO ACAO WORKFLOW';
export const GET_TIPO_ACAO_WORKFLOW_SUCCESS = '[TIPO ACAO WORKFLOW EDIT] GET TIPO ACAO WORKFLOW SUCCESS';
export const GET_TIPO_ACAO_WORKFLOW_FAILED = '[TIPO ACAO WORKFLOW EDIT] GET TIPO ACAO WORKFLOW FAILED';

export class GetTipoAcaoWorkflow implements Action {
    readonly type = GET_TIPO_ACAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

export class GetTipoAcaoWorkflowSuccess implements Action {
    readonly type = GET_TIPO_ACAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetTipoAcaoWorkflowFailed implements Action {
    readonly type = GET_TIPO_ACAO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

export type TipoAcaoWorkflowActionsAll
    = GetTipoAcaoWorkflow
    | GetTipoAcaoWorkflowSuccess
    | GetTipoAcaoWorkflowFailed;
