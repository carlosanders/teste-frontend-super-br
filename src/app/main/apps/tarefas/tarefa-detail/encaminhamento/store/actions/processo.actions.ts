import {Action} from '@ngrx/store';

export const SAVE_PROCESSO = '[ENCAMINHAMENTO TAREFA] SAVE PROCESSO';
export const SAVE_PROCESSO_SUCCESS = '[ENCAMINHAMENTO TAREFA] SAVE PROCESSO SUCCESS';
export const SAVE_PROCESSO_FAILED = '[ENCAMINHAMENTO TAREFA] SAVE PROCESSO FAILED';

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
