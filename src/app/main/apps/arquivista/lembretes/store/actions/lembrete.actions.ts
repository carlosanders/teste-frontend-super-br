import {Action} from '@ngrx/store';

export const CREATE_LEMBRETE = '[LEMBRETE] CREATE LEMBRETE';
export const CREATE_LEMBRETE_SUCCESS = '[LEMBRETE] CREATE LEMBRETE SUCCESS';

export const SAVE_LEMBRETE = '[LEMBRETE] SAVE LEMBRETE';
export const SAVE_LEMBRETE_SUCCESS = '[LEMBRETE] SAVE LEMBRETE SUCCESS';
export const SAVE_LEMBRETE_FAILED = '[LEMBRETE] SAVE LEMBRETE FAILED';

export const GET_LEMBRETE = '[LEMBRETE] GET LEMBRETE';
export const GET_LEMBRETE_SUCCESS = '[LEMBRETE] GET LEMBRETE SUCCESS';
export const GET_LEMBRETE_FAILED = '[LEMBRETE] GET LEMBRETE FAILED';


export const GET_PROCESSOS = '[LEMBRETE] GET PROCESSOS';
export const GET_PROCESSOS_SUCCESS = '[LEMBRETE] GET PROCESSOS SUCCESS';
export const GET_PROCESSOS_FAILED = '[LEMBRETE] GET PROCESSOS FAILED';

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


/**
 * Get Processos
 */
export class GetProcessos implements Action {
    readonly type = GET_PROCESSOS;

    constructor(public payload: any) {
    }
}


/**
 * Get Processos Success
 */
export class GetProcessosSuccess implements Action {
    readonly type = GET_PROCESSOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Processos Failed
 */
export class GetProcessosFailed implements Action {
    readonly type = GET_PROCESSOS_FAILED;

    constructor(public payload: string) {
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
    | SaveLembreteFailed
    | GetProcessos
    | GetProcessosFailed
    | GetProcessosSuccess;
