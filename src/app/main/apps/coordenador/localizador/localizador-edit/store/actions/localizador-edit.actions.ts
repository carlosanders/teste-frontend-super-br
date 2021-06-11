import {Action} from '@ngrx/store';

export const CREATE_LOCALIZADOR = '[COORDENADOR LOCALIZADOR EDIT] CREATE LOCALIZADOR';
export const CREATE_LOCALIZADOR_SUCCESS = '[COORDENADOR LOCALIZADOR EDIT] CREATE LOCALIZADOR SUCCESS';

export const SAVE_LOCALIZADOR = '[COORDENADOR LOCALIZADOR EDIT] SAVE LOCALIZADOR';
export const SAVE_LOCALIZADOR_SUCCESS = '[COORDENADOR LOCALIZADOR EDIT] SAVE LOCALIZADOR SUCCESS';
export const SAVE_LOCALIZADOR_FAILED = '[COORDENADOR LOCALIZADOR EDIT] SAVE LOCALIZADOR FAILED';

export const GET_LOCALIZADOR = '[COORDENADOR LOCALIZADOR EDIT] GET LOCALIZADOR';
export const GET_LOCALIZADOR_SUCCESS = '[COORDENADOR LOCALIZADOR EDIT] GET LOCALIZADOR SUCCESS';
export const GET_LOCALIZADOR_FAILED = '[COORDENADOR LOCALIZADOR EDIT] GET LOCALIZADOR FAILED';

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
