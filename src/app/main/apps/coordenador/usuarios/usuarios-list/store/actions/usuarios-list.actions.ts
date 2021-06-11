import {Action} from '@ngrx/store';

export const GET_USUARIOS = '[COORDENADOR USUARIO LIST] GET USUARIOS';
export const GET_USUARIOS_SUCCESS = '[COORDENADOR USUARIO LIST] GET USUARIOS SUCCESS';
export const GET_USUARIOS_FAILED = '[COORDENADOR USUARIO LIST] GET USUARIOS FAILED';

export const RELOAD_USUARIOS = '[COORDENADOR USUARIO LIST] RELOAD USUARIOS';
export const UNLOAD_USUARIOS = '[COORDENADOR USUARIO LIST] UNLOAD USUARIOS';


export const DELETE_USUARIO = '[COORDENADOR USUARIO LIST] DELETE USUARIO';
export const DELETE_USUARIO_SUCCESS = '[COORDENADOR USUARIO LIST] DELETE USUARIO SUCCESS';
export const DELETE_USUARIO_FAILED = '[COORDENADOR USUARIO LIST] DELETE USUARIO FAILED';

export const RESET_SENHA = '[COORDENADOR USUARIO LIST] RESET SENHA';
export const RESET_SENHA_SUCCESS = '[COORDENADOR USUARIO LIST] RESET SENHA SUCCESS';
export const RESET_SENHA_FAILED = '[COORDENADOR USUARIO LIST] RESET SENHA FAILED';

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
 * Unload Usuarios
 */
 export class UnloadUsuarios implements Action
 {
     readonly type = UNLOAD_USUARIOS;

     constructor()
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

/**
 * Reset Senha Usuario
 */
export class ResetSenha implements Action
{
    readonly type = RESET_SENHA;

    constructor(public payload: any)
    {
    }
}

/**
 * Reset Senha Usuario Success
 */
export class ResetSenhaSuccess implements Action
{
    readonly type = RESET_SENHA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Reset Senha Usuario Failed
 */
export class ResetSenhaFailed implements Action
{
    readonly type = RESET_SENHA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type UsuariosListActionsAll
    = GetUsuarios
    | GetUsuariosSuccess
    | GetUsuariosFailed
    | UnloadUsuarios
    | ReloadUsuarios
    | DeleteUsuario
    | DeleteUsuarioSuccess
    | DeleteUsuarioFailed
    | ResetSenha
    | ResetSenhaSuccess
    | ResetSenhaFailed;
