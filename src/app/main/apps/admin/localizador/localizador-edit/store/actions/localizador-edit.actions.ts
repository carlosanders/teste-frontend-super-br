import { Action } from '@ngrx/store';

export const CREATE_LOCALIZADOR = '[LOCALIZADOR] CREATE LOCALIZADOR';
export const CREATE_LOCALIZADOR_SUCCESS = '[LOCALIZADOR] CREATE LOCALIZADOR SUCCESS';

export const SAVE_LOCALIZADOR = '[LOCALIZADOR] SAVE LOCALIZADOR';
export const SAVE_LOCALIZADOR_SUCCESS = '[LOCALIZADOR] SAVE LOCALIZADOR SUCCESS';
export const SAVE_LOCALIZADOR_FAILED = '[LOCALIZADOR] SAVE LOCALIZADOR FAILED';

export const GET_LOCALIZADOR = '[LOCALIZADOR] GET LOCALIZADOR';
export const GET_LOCALIZADOR_SUCCESS = '[LOCALIZADOR] GET LOCALIZADOR SUCCESS';
export const GET_LOCALIZADOR_FAILED = '[LOCALIZADOR] GET LOCALIZADOR FAILED';

/**
 * Get Localizador
 */
export class GetLocalizador implements Action
{
    readonly type = GET_LOCALIZADOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Localizador Success
 */
export class GetLocalizadorSuccess implements Action
{
    readonly type = GET_LOCALIZADOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Localizador Failed
 */
export class GetLocalizadorFailed implements Action
{
    readonly type = GET_LOCALIZADOR_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Localizador
 */
export class SaveLocalizador implements Action
{
    readonly type = SAVE_LOCALIZADOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Localizador Success
 */
export class SaveLocalizadorSuccess implements Action
{
    readonly type = SAVE_LOCALIZADOR_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Localizador Failed
 */
export class SaveLocalizadorFailed implements Action
{
    readonly type = SAVE_LOCALIZADOR_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Localizador
 */
export class CreateLocalizador implements Action
{
    readonly type = CREATE_LOCALIZADOR;

    constructor()
    {
    }
}

/**
 * Create Localizador Success
 */
export class CreateLocalizadorSuccess implements Action
{
    readonly type = CREATE_LOCALIZADOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type LocalizadorEditActionsAll
    = CreateLocalizador
    | CreateLocalizadorSuccess
    | GetLocalizador
    | GetLocalizadorSuccess
    | GetLocalizadorFailed
    | SaveLocalizador
    | SaveLocalizadorSuccess
    | SaveLocalizadorFailed;
