import { Action } from '@ngrx/store';

export const GET_PROCESSO = '[TAREFA CREATE] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[TAREFA CREATE] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[TAREFA CREATE] GET PROCESSO FAILED';

/**
 * Get Processo
 */
export class GetProcesso implements Action
{
    readonly type = GET_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Success
 */
export class GetProcessoSuccess implements Action
{
    readonly type = GET_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Failed
 */
export class GetProcessoFailed implements Action
{
    readonly type = GET_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }
}

export type ProcessoActionsAll
    = GetProcesso
    | GetProcessoSuccess
    | GetProcessoFailed;
