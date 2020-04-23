import { Action } from '@ngrx/store';

export const GET_UNIDADE = '[SUPER-ADMIN SETOR] GET UNIDADE';
export const GET_UNIDADE_SUCCESS = '[SUPER-ADMIN SETOR] GET UNIDADE SUCCESS';
export const GET_UNIDADE_FAILED = '[SUPER-ADMIN SETOR] GET UNIDADE FAILED';

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

export type SetorActionsAll
    = GetUnidade
    | GetUnidadeSuccess
    | GetUnidadeFailed;
