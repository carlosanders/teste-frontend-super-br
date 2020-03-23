import {Action} from '@ngrx/store';

export const CREATE_LEMBRETE_BLOCO = '[LEMBRETE_BLOCO] CREATE LEMBRETE_BLOCO';
export const CREATE_LEMBRETE_BLOCO_SUCCESS = '[LEMBRETE_BLOCO] CREATE LEMBRETE_BLOCO SUCCESS';

export const SAVE_LEMBRETE_BLOCO = '[LEMBRETE_BLOCO] SAVE LEMBRETE_BLOCO';
export const SAVE_LEMBRETE_BLOCO_SUCCESS = '[LEMBRETE_BLOCO] SAVE LEMBRETE_BLOCO SUCCESS';
export const SAVE_LEMBRETE_BLOCO_FAILED = '[LEMBRETE_BLOCO] SAVE LEMBRETE_BLOCO FAILED';

export const GET_LEMBRETE_BLOCO = '[LEMBRETE_BLOCO] GET LEMBRETE_BLOCO';
export const GET_LEMBRETE_BLOCO_SUCCESS = '[LEMBRETE_BLOCO] GET LEMBRETE_BLOCO SUCCESS';
export const GET_LEMBRETE_BLOCO_FAILED = '[LEMBRETE_BLOCO] GET LEMBRETE_BLOCO FAILED';

/**
 * Get LembreteBloco
 */
export class GetLembreteBloco implements Action
{
    readonly type = GET_LEMBRETE_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get LembreteBloco Success
 */
export class GetLembreteBlocoSuccess implements Action
{
    readonly type = GET_LEMBRETE_BLOCO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get LembreteBloco Failed
 */
export class GetLembreteBlocoFailed implements Action
{
    readonly type = GET_LEMBRETE_BLOCO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save LembreteBloco
 */
export class SaveLembreteBloco implements Action
{
    readonly type = SAVE_LEMBRETE_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save LembreteBloco Success
 */
export class SaveLembreteBlocoSuccess implements Action
{
    readonly type = SAVE_LEMBRETE_BLOCO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save LembreteBloco Failed
 */
export class SaveLembreteBlocoFailed implements Action
{
    readonly type = SAVE_LEMBRETE_BLOCO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create LembreteBloco
 */
export class CreateLembreteBloco implements Action
{
    readonly type = CREATE_LEMBRETE_BLOCO;

    constructor()
    {
    }
}

/**
 * Create LembreteBloco Success
 */
export class CreateLembreteBlocoSuccess implements Action
{
    readonly type = CREATE_LEMBRETE_BLOCO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type LembreteBlocoActionsAll
    = CreateLembreteBloco
    | CreateLembreteBlocoSuccess
    | GetLembreteBloco
    | GetLembreteBlocoSuccess
    | GetLembreteBlocoFailed
    | SaveLembreteBloco
    | SaveLembreteBlocoSuccess
    | SaveLembreteBlocoFailed;
