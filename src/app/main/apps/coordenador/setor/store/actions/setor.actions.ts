import {Action} from '@ngrx/store';

export const GET_SETOR = '[COORDENADOR SETOR] GET SETOR';
export const GET_SETOR_SUCCESS = '[COORDENADOR SETOR] GET SETOR SUCCESS';
export const GET_SETOR_FAILED = '[COORDENADOR SETOR] GET SETOR FAILED';

export const GET_UNIDADE = '[COORDENADOR SETOR] GET UNIDADE';
export const GET_UNIDADE_SUCCESS = '[COORDENADOR SETOR] GET UNIDADE SUCCESS';
export const GET_UNIDADE_FAILED = '[COORDENADOR SETOR] GET UNIDADE FAILED';

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
 * Get Setor
 */
export class GetUnidade implements Action
{
    readonly type = GET_UNIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Setor Success
 */
export class GetUnidadeSuccess implements Action
{
    readonly type = GET_UNIDADE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Setor Failed
 */
export class GetUnidadeFailed implements Action
{
    readonly type = GET_UNIDADE_FAILED;

    constructor(public payload: string)
    {
    }
}

export type CoordenadorSetorActionsAll
    = GetSetor
    | GetSetorSuccess
    | GetSetorFailed
    | GetUnidade
    | GetUnidadeSuccess
    | GetUnidadeFailed;
