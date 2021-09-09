import {Action} from '@ngrx/store';

export const GET_WORKFLOW_VIEW_TRANSICOES = '[WORKFLOW] VIEW TRANSICOES';
export const GET_WORKFLOW_VIEW_TRANSICOES_SUCCESS = '[WORKFLOW] VIEW TRANSICOES SUCCESS';
export const GET_WORKFLOW_VIEW_TRANSICOES_FAILED = '[WORKFLOW] VIEW TRANSICOES FAILED';

/**
 * Get WorkflowViewTransicoes
 */
export class GetWorkflowViewTransicoes implements Action {
    readonly type = GET_WORKFLOW_VIEW_TRANSICOES;

    constructor(public payload: any) {
    }
}

/**
 * Get WorkflowViewTransicoes Success
 */
export class GetWorkflowViewTransicoesSuccess implements Action {
    readonly type = GET_WORKFLOW_VIEW_TRANSICOES_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get WorkflowViewTransicoes Failed
 */
export class GetWorkflowViewTransicoesFailed implements Action {
    readonly type = GET_WORKFLOW_VIEW_TRANSICOES_FAILED;

    constructor(public payload: string) {
    }
}

export type WorkflowViewActionsAll
    = GetWorkflowViewTransicoes
    | GetWorkflowViewTransicoesSuccess
    | GetWorkflowViewTransicoesFailed;
