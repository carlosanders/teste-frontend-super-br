import {Action} from '@ngrx/store';

export const GET_ASSUNTOS = '[DADOS BASICOS STEPS] GET ASSUNTOS';
export const GET_ASSUNTOS_SUCCESS = '[DADOS BASICOS STEPS] GET ASSUNTOS SUCCESS';
export const GET_ASSUNTOS_FAILED = '[DADOS BASICOS STEPS] GET ASSUNTOS FAILED';

export const RELOAD_ASSUNTOS = '[DADOS BASICOS STEPS] RELOAD ASSUNTOS';
export const DELETE_ASSUNTO = '[DADOS BASICOS STEPS] DELETE ASSUNTO';
export const DELETE_ASSUNTO_SUCCESS = '[DADOS BASICOS STEPS] DELETE ASSUNTO SUCCESS';
export const DELETE_ASSUNTO_FAILED = '[DADOS BASICOS STEPS] DELETE ASSUNTO FAILED';

export const SAVE_ASSUNTO = '[DADOS BASICOS STEPS] SAVE ASSUNTO';
export const SAVE_ASSUNTO_SUCCESS = '[DADOS BASICOS STEPS] SAVE ASSUNTO SUCCESS';
export const SAVE_ASSUNTO_FAILED = '[DADOS BASICOS STEPS] SAVE ASSUNTO FAILED';

export const UNLOAD_ASSUNTOS = '[DADOS BASICOS STEPS] UNLOAD ASSUNTOS';

/**
 * Get Assuntos
 */
export class GetAssuntos implements Action
{
    readonly type = GET_ASSUNTOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Assuntos Success
 */
export class GetAssuntosSuccess implements Action
{
    readonly type = GET_ASSUNTOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Assuntos Failed
 */
export class GetAssuntosFailed implements Action
{
    readonly type = GET_ASSUNTOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Assuntos
 */
export class ReloadAssuntos implements Action
{
    readonly type = RELOAD_ASSUNTOS;

    constructor()
    {
    }
}

/**
 * Delete Assunto
 */
export class DeleteAssunto implements Action
{
    readonly type = DELETE_ASSUNTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Assunto Success
 */
export class DeleteAssuntoSuccess implements Action
{
    readonly type = DELETE_ASSUNTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Assunto Failed
 */
export class DeleteAssuntoFailed implements Action
{
    readonly type = DELETE_ASSUNTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Reload Assuntos
 */
export class UnloadAssuntos implements Action
{
    readonly type = UNLOAD_ASSUNTOS;

    constructor(public payload: any)
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

export type AssuntoActionsAll
    = GetAssuntos
    | GetAssuntosSuccess
    | GetAssuntosFailed
    | UnloadAssuntos
    | ReloadAssuntos
    | DeleteAssunto
    | DeleteAssuntoSuccess
    | DeleteAssuntoFailed
    | SaveAssunto
    | SaveAssuntoSuccess
    | SaveAssuntoFailed;


