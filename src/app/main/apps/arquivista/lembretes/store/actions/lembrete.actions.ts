import {Action} from '@ngrx/store';

export const CREATE_LEMBRETE = '[LEMBRETE] CREATE LEMBRETE';
export const CREATE_LEMBRETE_SUCCESS = '[LEMBRETE] CREATE LEMBRETE SUCCESS';

export const SAVE_LEMBRETE = '[LEMBRETE] SAVE LEMBRETE';
export const SAVE_LEMBRETE_SUCCESS = '[LEMBRETE] SAVE LEMBRETE SUCCESS';
export const SAVE_LEMBRETE_FAILED = '[LEMBRETE] SAVE LEMBRETE FAILED';

export const GET_LEMBRETE = '[LEMBRETE] GET LEMBRETE';
export const GET_LEMBRETE_SUCCESS = '[LEMBRETE] GET LEMBRETE SUCCESS';
export const GET_LEMBRETE_FAILED = '[LEMBRETE] GET LEMBRETE FAILED';

/**
 * Get Lembrete
 */
export class GetLembrete implements Action
{
    readonly type = GET_LEMBRETE;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Lembrete Success
 */
export class GetLembreteSuccess implements Action
{
    readonly type = GET_LEMBRETE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Lembrete Failed
 */
export class GetLembreteFailed implements Action
{
    readonly type = GET_LEMBRETE_FAILED;

    constructor(public payload: string)
    {
    }
}

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

/**
 * Create Lembrete
 */
export class CreateLembrete implements Action
{
    readonly type = CREATE_LEMBRETE;

    constructor()
    {
    }
}

/**
 * Create Lembrete Success
 */
export class CreateLembreteSuccess implements Action
{
    readonly type = CREATE_LEMBRETE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type LembreteActionsAll
    = CreateLembrete
    | CreateLembreteSuccess
    | GetLembrete
    | GetLembreteSuccess
    | GetLembreteFailed
    | SaveLembrete
    | SaveLembreteSuccess
    | SaveLembreteFailed;
