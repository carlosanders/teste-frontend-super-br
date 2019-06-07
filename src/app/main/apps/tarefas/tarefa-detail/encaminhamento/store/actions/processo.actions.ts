import { Action } from '@ngrx/store';

export const SAVE_PROCESSO = '[DADOS BASICOS] SAVE PROCESSO';
export const SAVE_PROCESSO_SUCCESS = '[DADOS BASICOS] SAVE PROCESSO SUCCESS';
export const SAVE_PROCESSO_FAILED = '[DADOS BASICOS] SAVE PROCESSO FAILED';

/**
 * Save Processo
 */
export class SaveProcesso implements Action
{
    readonly type = SAVE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Processo Success
 */
export class SaveProcessoSuccess implements Action
{
    readonly type = SAVE_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Processo Failed
 */
export class SaveProcessoFailed implements Action
{
    readonly type = SAVE_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ProcessoActionsAll
    = SaveProcesso
    | SaveProcessoSuccess
    | SaveProcessoFailed;
