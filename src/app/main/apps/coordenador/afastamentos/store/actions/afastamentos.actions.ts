import {Action} from '@ngrx/store';

export const GET_USUARIO = '[COORDENADOR AFASTAMENTOS] GET USUARIO';
export const GET_USUARIO_SUCCESS = '[COORDENADOR AFASTAMENTOS] GET USUARIO SUCCESS';
export const GET_USUARIO_FAILED = '[COORDENADOR AFASTAMENTOS] GET USUARIO FAILED';

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

export type AfastamentosActionsAll
    = GetUsuario
    | GetUsuarioSuccess
    | GetUsuarioFailed;
