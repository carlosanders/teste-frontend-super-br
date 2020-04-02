import { Action } from '@ngrx/store';

export const CREATE_ASSUNTO = '[ASSUNTO] CREATE ASSUNTO';
export const CREATE_ASSUNTO_SUCCESS = '[ASSUNTO] CREATE ASSUNTO SUCCESS';

export const SAVE_ASSUNTO = '[ASSUNTO] SAVE ASSUNTO';
export const SAVE_ASSUNTO_SUCCESS = '[ASSUNTO] SAVE ASSUNTO SUCCESS';
export const SAVE_ASSUNTO_FAILED = '[ASSUNTO] SAVE ASSUNTO FAILED';

export const GET_ASSUNTO = '[ASSUNTO] GET ASSUNTO';
export const GET_ASSUNTO_SUCCESS = '[ASSUNTO] GET ASSUNTO SUCCESS';
export const GET_ASSUNTO_FAILED = '[ASSUNTO] GET ASSUNTO FAILED';

/**
 * Get Assunto
 */
export class GetAssunto implements Action
{
    readonly type = GET_ASSUNTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Assunto Success
 */
export class GetAssuntoSuccess implements Action
{
    readonly type = GET_ASSUNTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Assunto Failed
 */
export class GetAssuntoFailed implements Action
{
    readonly type = GET_ASSUNTO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Assunto
 */
export class SaveAssunto implements Action
{
    readonly type = SAVE_ASSUNTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Assunto Success
 */
export class SaveAssuntoSuccess implements Action
{
    readonly type = SAVE_ASSUNTO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Assunto Failed
 */
export class SaveAssuntoFailed implements Action
{
    readonly type = SAVE_ASSUNTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Assunto
 */
export class CreateAssunto implements Action
{
    readonly type = CREATE_ASSUNTO;

    constructor()
    {
    }
}

/**
 * Create Assunto Success
 */
export class CreateAssuntoSuccess implements Action
{
    readonly type = CREATE_ASSUNTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type AssuntoEditActionsAll
    = CreateAssunto
    | CreateAssuntoSuccess
    | GetAssunto
    | GetAssuntoSuccess
    | GetAssuntoFailed
    | SaveAssunto
    | SaveAssuntoSuccess
    | SaveAssuntoFailed;
