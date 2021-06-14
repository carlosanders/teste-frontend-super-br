import {Action} from '@ngrx/store';

export const GET_REPOSITORIO = '[COORDENADOR REPOSITORIOS ESPECIE SETOR] GET REPOSITORIO';
export const GET_REPOSITORIO_SUCCESS = '[COORDENADOR REPOSITORIOS ESPECIE SETOR] GET REPOSITORIO SUCCESS';
export const GET_REPOSITORIO_FAILED = '[COORDENADOR REPOSITORIOS ESPECIE SETOR] GET REPOSITORIO FAILED';

/**
 * Get Repositorio
 */
export class GetRepositorio implements Action
{
    readonly type = GET_REPOSITORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Repositorio Success
 */
export class GetRepositorioSuccess implements Action
{
    readonly type = GET_REPOSITORIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Repositorio Failed
 */
export class GetRepositorioFailed implements Action
{
    readonly type = GET_REPOSITORIO_FAILED;

    constructor(public payload: string)
    {
    }
}

export type RepositoriosEspecieSetorActionsAll
    = GetRepositorio
    | GetRepositorioSuccess
    | GetRepositorioFailed;
