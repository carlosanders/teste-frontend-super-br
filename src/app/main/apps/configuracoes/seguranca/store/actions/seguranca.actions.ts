import {Action} from '@ngrx/store';

export const SAVE_SEGURANCA = '[SEGURANCA] SAVE SEGURANCA';
export const SAVE_SEGURANCA_SUCCESS = '[SEGURANCA] SAVE SEGURANCA SUCCESS';
export const SAVE_SEGURANCA_FAILED = '[SEGURANCA] SAVE SEGURANCA FAILED';

/**
 * Save Seguranca
 */
export class SaveSeguranca implements Action
{
    readonly type = SAVE_SEGURANCA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Seguranca Success
 */
export class SaveSegurancaSuccess implements Action
{
    readonly type = SAVE_SEGURANCA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Seguranca Failed
 */
export class SaveSegurancaFailed implements Action
{
    readonly type = SAVE_SEGURANCA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type SegurancaActionsAll
    = SaveSeguranca
    | SaveSegurancaSuccess
    | SaveSegurancaFailed;
