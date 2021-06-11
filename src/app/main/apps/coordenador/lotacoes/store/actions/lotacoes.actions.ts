import {Action} from '@ngrx/store';

export const GET_SETOR = '[COORDENADOR LOTACOES] GET SETOR';
export const GET_SETOR_SUCCESS = '[COORDENADOR LOTACOES] GET SETOR SUCCESS';
export const GET_SETOR_FAILED = '[COORDENADOR LOTACOES] GET SETOR FAILED';

export const GET_USUARIO = '[COORDENADOR LOTACOES] GET USUARIO';
export const GET_USUARIO_SUCCESS = '[COORDENADOR LOTACOES] GET USUARIO SUCCESS';
export const GET_USUARIO_FAILED = '[COORDENADOR LOTACOES] GET USUARIO FAILED';

export const UNLOAD_USUARIO = '[COORDENADOR LOTACOES] UNLOAD USUARIO';
export const UNLOAD_SETOR = '[COORDENADOR LOTACOES] UNLOAD SETOR';

/**
 * Get Setor
 */
export class GetSetor implements Action
{
    readonly type = GET_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Setor Success
 */
export class GetSetorSuccess implements Action
{
    readonly type = GET_SETOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Setor Failed
 */
export class GetSetorFailed implements Action
{
    readonly type = GET_SETOR_FAILED;

    constructor(public payload: string)
    {
    }
}

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
 * Unload Usuario
 */
export class UnloadUsuario implements Action
{
    readonly type = UNLOAD_USUARIO;

    constructor()
    {
    }
}

/**
 * Unload Setor
 */
export class UnloadSetor implements Action
{
    readonly type = UNLOAD_SETOR;

    constructor()
    {
    }
}

export type LotacoesActionsAll
    = GetSetor
    | GetSetorSuccess
    | GetSetorFailed
    | GetUsuario
    | GetUsuarioSuccess
    | GetUsuarioFailed
    | UnloadUsuario
    | UnloadSetor;
