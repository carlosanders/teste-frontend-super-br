import {Action} from '@ngrx/store';

export const GET_TIPO_VALIDACAO_WORKFLOW = '[TIPO VALIDACAO WORKFLOW EDIT] GET TIPO VALIDACAO WORKFLOW';
export const GET_TIPO_VALIDACAO_WORKFLOW_SUCCESS = '[TIPO VALIDACAO WORKFLOW EDIT] GET TIPO VALIDACAO WORKFLOW SUCCESS';
export const GET_TIPO_VALIDACAO_WORKFLOW_FAILED = '[TIPO VALIDACAO WORKFLOW EDIT] GET TIPO VALIDACAO WORKFLOW FAILED';

export class GetTipoValidacaoWorkflow implements Action {
    readonly type = GET_TIPO_VALIDACAO_WORKFLOW;

    constructor(public payload: any) {
    }
}

export class GetTipoValidacaoWorkflowSuccess implements Action {
    readonly type = GET_TIPO_VALIDACAO_WORKFLOW_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetTipoValidacaoWorkflowFailed implements Action {
    readonly type = GET_TIPO_VALIDACAO_WORKFLOW_FAILED;

    constructor(public payload: any) {
    }
}

export type TipoValidacaoWorkflowActionsAll
    = GetTipoValidacaoWorkflow
    | GetTipoValidacaoWorkflowSuccess
    | GetTipoValidacaoWorkflowFailed;
