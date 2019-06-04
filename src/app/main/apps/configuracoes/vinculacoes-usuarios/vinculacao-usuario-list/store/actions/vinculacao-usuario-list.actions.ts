import { Action } from '@ngrx/store';

export const GET_VINCULACOES_USUARIOS = '[VINCULACAO USUARIO LIST] GET VINCULACOES USUARIOS';
export const GET_VINCULACOES_USUARIOS_SUCCESS = '[VINCULACAO USUARIO LIST] GET VINCULACOES USUARIOS SUCCESS';
export const GET_VINCULACOES_USUARIOS_FAILED = '[VINCULACAO USUARIO LIST] GET VINCULACOES USUARIOS FAILED';

export const RELOAD_VINCULACOES_USUARIOS = '[VINCULACAO USUARIO LIST] RELOAD VINCULACOES USUARIOS';

export const DELETE_VINCULACAO_USUARIO = '[VINCULACAO USUARIO LIST] DELETE VINCULACAO USUARIO';
export const DELETE_VINCULACAO_USUARIO_SUCCESS = '[VINCULACAO USUARIO LIST] DELETE VINCULACAO USUARIO SUCCESS';
export const DELETE_VINCULACAO_USUARIO_FAILED = '[VINCULACAO USUARIO LIST] DELETE VINCULACAO USUARIO FAILED';

/**
 * Get VinculacoesUsuarios
 */
export class GetVinculacoesUsuarios implements Action
{
    readonly type = GET_VINCULACOES_USUARIOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacoesUsuarios Success
 */
export class GetVinculacoesUsuariosSuccess implements Action
{
    readonly type = GET_VINCULACOES_USUARIOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacoesUsuarios Failed
 */
export class GetVinculacoesUsuariosFailed implements Action
{
    readonly type = GET_VINCULACOES_USUARIOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload VinculacoesUsuarios
 */
export class ReloadVinculacoesUsuarios implements Action
{
    readonly type = RELOAD_VINCULACOES_USUARIOS;

    constructor()
    {
    }
}

/**
 * Delete VinculacaoUsuario
 */
export class DeleteVinculacaoUsuario implements Action
{
    readonly type = DELETE_VINCULACAO_USUARIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete VinculacaoUsuario Success
 */
export class DeleteVinculacaoUsuarioSuccess implements Action
{
    readonly type = DELETE_VINCULACAO_USUARIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete VinculacaoUsuario Failed
 */
export class DeleteVinculacaoUsuarioFailed implements Action
{
    readonly type = DELETE_VINCULACAO_USUARIO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type VinculacaoUsuarioListActionsAll
    = GetVinculacoesUsuarios
    | GetVinculacoesUsuariosSuccess
    | GetVinculacoesUsuariosFailed
    | ReloadVinculacoesUsuarios
    | DeleteVinculacaoUsuario
    | DeleteVinculacaoUsuarioSuccess
    | DeleteVinculacaoUsuarioFailed;

