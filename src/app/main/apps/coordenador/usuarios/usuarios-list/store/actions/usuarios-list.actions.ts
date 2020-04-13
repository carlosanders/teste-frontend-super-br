import { Action } from '@ngrx/store';

export const GET_USUARIOS = '[COORDENADOR USUARIO LIST] GET USUARIOS';
export const GET_USUARIOS_SUCCESS = '[COORDENADOR USUARIO LIST] GET USUARIOS SUCCESS';
export const GET_USUARIOS_FAILED = '[COORDENADOR USUARIO LIST] GET USUARIOS FAILED';

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

export type UsuariosListActionsAll
    = GetUsuarios
    | GetUsuariosSuccess
    | GetUsuariosFailed;
