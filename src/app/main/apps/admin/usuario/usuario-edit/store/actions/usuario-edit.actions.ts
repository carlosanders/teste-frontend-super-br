import { Action } from '@ngrx/store';

export const CREATE_USUARIO = '[ADMIN USUARIO EDIT] CREATE USUARIO';
export const CREATE_USUARIO_SUCCESS = '[ADMIN USUARIO EDIT] CREATE USUARIO SUCCESS';

export const SAVE_USUARIO = '[ADMIN USUARIO EDIT] SAVE USUARIO';
export const SAVE_USUARIO_SUCCESS = '[ADMIN USUARIO EDIT] SAVE USUARIO SUCCESS';
export const SAVE_USUARIO_FAILED = '[ADMIN USUARIO EDIT] SAVE USUARIO FAILED';

export const GET_USUARIO = '[ADMIN USUARIO EDIT] GET USUARIO';
export const GET_USUARIO_SUCCESS = '[ADMIN USUARIO EDIT] GET USUARIO SUCCESS';
export const GET_USUARIO_FAILED = '[ADMIN USUARIO EDIT] GET USUARIO FAILED';

export const CREATE_COLABORADOR = '[ADMIN USUARIO EDIT] CREATE COLABORADOR';
export const CREATE_COLABORADOR_SUCCESS = '[ADMIN USUARIO EDIT] CREATE COLABORADOR SUCCESS';

export const SAVE_COLABORADOR = '[ADMIN USUARIO EDIT] SAVE COLABORADOR';
export const SAVE_COLABORADOR_SUCCESS = '[ADMIN USUARIO EDIT] SAVE COLABORADOR SUCCESS';
export const SAVE_COLABORADOR_FAILED = '[ADMIN USUARIO EDIT] SAVE COLABORADOR FAILED';

export const GET_COLABORADOR = '[ADMIN USUARIO EDIT] GET COLABORADOR';
export const GET_COLABORADOR_SUCCESS = '[ADMIN USUARIO EDIT] GET COLABORADOR SUCCESS';
export const GET_COLABORADOR_FAILED = '[ADMIN USUARIO EDIT] GET COLABORADOR FAILED';

/**
 * Get Usuario
 */
export class GetUsuario implements Action
{
    readonly type = GET_USUARIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Usuario Success
 */
export class GetUsuarioSuccess implements Action
{
    readonly type = GET_USUARIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Usuario Failed
 */
export class GetUsuarioFailed implements Action
{
    readonly type = GET_USUARIO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Usuario
 */
export class SaveUsuario implements Action
{
    readonly type = SAVE_USUARIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Usuario Success
 */
export class SaveUsuarioSuccess implements Action
{
    readonly type = SAVE_USUARIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Usuario Failed
 */
export class SaveUsuarioFailed implements Action
{
    readonly type = SAVE_USUARIO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Usuario
 */
export class CreateUsuario implements Action
{
    readonly type = CREATE_USUARIO;

    constructor()
    {
    }
}

/**
 * Create Usuario Success
 */
export class CreateUsuarioSuccess implements Action
{
    readonly type = CREATE_USUARIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Colaborador
 */
export class SaveColaborador implements Action
{
    readonly type = SAVE_COLABORADOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Colaborador Success
 */
export class SaveColaboradorSuccess implements Action
{
    readonly type = SAVE_COLABORADOR_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Colaborador Failed
 */
export class SaveColaboradorFailed implements Action
{
    readonly type = SAVE_COLABORADOR_FAILED;

    constructor(public payload: any)
    {
    }
}

export type UsuarioEditActionsAll
    = CreateUsuario
    | CreateUsuarioSuccess
    | GetUsuario
    | GetUsuarioSuccess
    | GetUsuarioFailed
    | SaveUsuario
    | SaveUsuarioSuccess
    | SaveUsuarioFailed
    | SaveColaborador
    | SaveColaboradorSuccess
    | SaveColaboradorFailed;
