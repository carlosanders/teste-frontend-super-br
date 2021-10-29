import {Action} from '@ngrx/store';

export const GET_PROCESSO = '[ANEXAR COPIA] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[ANEXAR COPIA] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[ANEXAR COPIA] GET PROCESSO FAILED';

export const UNLOAD_COPIA = '[ANEXAR COPIA] UNLOAD COPIA';

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

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Copia
 */
export class UnloadCopia implements Action
{
    readonly type = UNLOAD_COPIA;

    constructor()
    {
    }
}

export type AnexarCopiaActionsAll
    = GetProcesso
    | GetProcessoSuccess
    | GetProcessoFailed
    | UnloadCopia;
