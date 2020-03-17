import {Action} from '@ngrx/store';

export const SAVE_LEMBRETE = '[ARQUIVISTA-LIST] SAVE LEMBRETE';
export const SAVE_LEMBRETE_SUCCESS = '[ARQUIVISTA-LIST] SAVE LEMBRETE SUCCESS';
export const SAVE_LEMBRETE_FAILED = '[ARQUIVISTA-LIST] SAVE LEMBRETE FAILED';


/**
 * Save Lembrete
 */
export class SaveLembrete implements Action
{
    readonly type = SAVE_LEMBRETE;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Lembrete Success
 */
export class SaveLembreteSuccess implements Action
{
    readonly type = SAVE_LEMBRETE_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Lembrete Failed
 */
export class SaveLembreteFailed implements Action
{
    readonly type = SAVE_LEMBRETE_FAILED;

    constructor(public payload: any)
    {
    }
}

export type LembreteActionsAll
    = SaveLembrete
    | SaveLembreteSuccess
    | SaveLembreteFailed;
