import { Action } from '@ngrx/store';

export const GET_USUARIOS = '[ADMIN USUARIO LIST] GET USUARIOS';
export const GET_USUARIOS_SUCCESS = '[ADMIN USUARIO LIST] GET USUARIOS SUCCESS';
export const GET_USUARIOS_FAILED = '[ADMIN USUARIO LIST] GET USUARIOS FAILED';

export const RELOAD_USUARIOS = '[ADMIN USUARIO LIST] RELOAD USUARIOS';

export const DELETE_USUARIO = '[ADMIN USUARIO LIST] DELETE USUARIO';
export const DELETE_USUARIO_SUCCESS = '[ADMIN USUARIO LIST] DELETE USUARIO SUCCESS';
export const DELETE_USUARIO_FAILED = '[ADMIN USUARIO LIST] DELETE USUARIO FAILED';

/**
 * Get Usuarios
 */
export class GetUsuarios implements Action
{
    readonly type = GET_USUARIOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Usuarios Success
 */
export class GetUsuariosSuccess implements Action
{
    readonly type = GET_USUARIOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Usuarios Failed
 */
export class GetUsuariosFailed implements Action
{
    readonly type = GET_USUARIOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Usuarios
 */
export class ReloadUsuarios implements Action
{
    readonly type = RELOAD_USUARIOS;

    constructor()
    {
    }
}

/**
 * Delete Usuario
 */
export class DeleteUsuario implements Action
{
    readonly type = DELETE_USUARIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Usuario Success
 */
export class DeleteUsuarioSuccess implements Action
{
    readonly type = DELETE_USUARIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Usuario Failed
 */
export class DeleteUsuarioFailed implements Action
{
    readonly type = DELETE_USUARIO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type UsuarioListActionsAll
    = GetUsuarios
    | GetUsuariosSuccess
    | GetUsuariosFailed
    | ReloadUsuarios
    | DeleteUsuario
    | DeleteUsuarioSuccess
    | DeleteUsuarioFailed;

