import {Action} from '@ngrx/store';

export const SAVE_PROCESSO = '[ENCAMINHAMENTO TAREFA] SAVE PROCESSO';
export const SAVE_PROCESSO_SUCCESS = '[ENCAMINHAMENTO TAREFA] SAVE PROCESSO SUCCESS';
export const SAVE_PROCESSO_FAILED = '[ENCAMINHAMENTO TAREFA] SAVE PROCESSO FAILED';

export const UNLOAD = '[ENCAMINHAMENTO TAREFA] UNLOAD';

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

/**
 * Unload
 */
export class Unload implements Action
{
    readonly type = UNLOAD;
}

export type ProcessoActionsAll
    = SaveProcesso
    | SaveProcessoSuccess
    | SaveProcessoFailed
    | Unload;
