import {Action} from '@ngrx/store';

export const GET_LOCALIZADORES = '[COORDENADOR LOCALIZADOR LIST] GET LOCALIZADORES';
export const GET_LOCALIZADORES_SUCCESS = '[COORDENADOR LOCALIZADOR LIST] GET LOCALIZADORES SUCCESS';
export const GET_LOCALIZADORES_FAILED = '[COORDENADOR LOCALIZADOR LIST] GET LOCALIZADORES FAILED';

export const RELOAD_LOCALIZADORES = '[COORDENADOR LOCALIZADOR LIST] RELOAD LOCALIZADORES';

export const DELETE_LOCALIZADOR = '[COORDENADOR LOCALIZADOR LIST] DELETE LOCALIZADOR';
export const DELETE_LOCALIZADOR_SUCCESS = '[COORDENADOR LOCALIZADOR LIST] DELETE LOCALIZADOR SUCCESS';
export const DELETE_LOCALIZADOR_FAILED = '[COORDENADOR LOCALIZADOR LIST] DELETE LOCALIZADOR FAILED';

export const SAVE_LOCALIZADOR = '[COORDENADOR LOCALIZADOR] SAVE LOCALIZADOR';
export const SAVE_LOCALIZADOR_SUCCESS = '[COORDENADOR LOCALIZADOR] SAVE LOCALIZADOR SUCCESS';
export const SAVE_LOCALIZADOR_FAILED = '[COORDENADOR LOCALIZADOR] SAVE LOCALIZADOR FAILED';

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
 * Get Localizadores
 */
export class GetLocalizadores implements Action
{
    readonly type = GET_LOCALIZADORES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Localizadores Success
 */
export class GetLocalizadoresSuccess implements Action
{
    readonly type = GET_LOCALIZADORES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Localizadores Failed
 */
export class GetLocalizadoresFailed implements Action
{
    readonly type = GET_LOCALIZADORES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Localizadores
 */
export class ReloadLocalizadores implements Action
{
    readonly type = RELOAD_LOCALIZADORES;

    constructor()
    {
    }
}

/**
 * Delete Localizador
 */
export class DeleteLocalizador implements Action
{
    readonly type = DELETE_LOCALIZADOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Localizador Success
 */
export class DeleteLocalizadorSuccess implements Action
{
    readonly type = DELETE_LOCALIZADOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Localizador Failed
 */
export class DeleteLocalizadorFailed implements Action
{
    readonly type = DELETE_LOCALIZADOR_FAILED;

    constructor(public payload: any)
    {
    }
}

export type LocalizadorListActionsAll
    = GetLocalizadores
    | GetLocalizadoresSuccess
    | GetLocalizadoresFailed
    | SaveLocalizador
    | SaveLocalizadorSuccess
    | SaveLocalizadorFailed
    | ReloadLocalizadores
    | DeleteLocalizador
    | DeleteLocalizadorSuccess
    | DeleteLocalizadorFailed;

