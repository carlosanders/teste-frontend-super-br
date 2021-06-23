import {Action} from '@ngrx/store';

export const CREATE_VINCULACAO_USUARIO = '[VINCULACAO USUARIO] CREATE VINCULACAO USUARIO';
export const CREATE_VINCULACAO_USUARIO_SUCCESS = '[VINCULACAO USUARIO] CREATE VINCULACAO USUARIO SUCCESS';

export const SAVE_VINCULACAO_USUARIO = '[VINCULACAO USUARIO] SAVE VINCULACAO USUARIO';
export const SAVE_VINCULACAO_USUARIO_SUCCESS = '[VINCULACAO USUARIO] SAVE VINCULACAO USUARIO SUCCESS';
export const SAVE_VINCULACAO_USUARIO_FAILED = '[VINCULACAO USUARIO] SAVE VINCULACAO USUARIO FAILED';

export const GET_VINCULACAO_USUARIO = '[VINCULACAO USUARIO] GET VINCULACAO USUARIO';
export const GET_VINCULACAO_USUARIO_SUCCESS = '[VINCULACAO USUARIO] GET VINCULACAO USUARIO SUCCESS';
export const GET_VINCULACAO_USUARIO_FAILED = '[VINCULACAO USUARIO] GET VINCULACAO USUARIO FAILED';

/**
 * Get VinculacaoUsuario
 */
export class GetVinculacaoUsuario implements Action
{
    readonly type = GET_VINCULACAO_USUARIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoUsuario Success
 */
export class GetVinculacaoUsuarioSuccess implements Action
{
    readonly type = GET_VINCULACAO_USUARIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoUsuario Failed
 */
export class GetVinculacaoUsuarioFailed implements Action
{
    readonly type = GET_VINCULACAO_USUARIO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save VinculacaoUsuario
 */
export class SaveVinculacaoUsuario implements Action
{
    readonly type = SAVE_VINCULACAO_USUARIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save VinculacaoUsuario Success
 */
export class SaveVinculacaoUsuarioSuccess implements Action
{
    readonly type = SAVE_VINCULACAO_USUARIO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save VinculacaoUsuario Failed
 */
export class SaveVinculacaoUsuarioFailed implements Action
{
    readonly type = SAVE_VINCULACAO_USUARIO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create VinculacaoUsuario
 */
export class CreateVinculacaoUsuario implements Action
{
    readonly type = CREATE_VINCULACAO_USUARIO;

    constructor()
    {
    }
}

/**
 * Create VinculacaoUsuario Success
 */
export class CreateVinculacaoUsuarioSuccess implements Action
{
    readonly type = CREATE_VINCULACAO_USUARIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type VinculacaoUsuarioEditActionsAll
    = CreateVinculacaoUsuario
    | CreateVinculacaoUsuarioSuccess
    | GetVinculacaoUsuario
    | GetVinculacaoUsuarioSuccess
    | GetVinculacaoUsuarioFailed
    | SaveVinculacaoUsuario
    | SaveVinculacaoUsuarioSuccess
    | SaveVinculacaoUsuarioFailed;
