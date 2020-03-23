import { Action } from '@ngrx/store';

export const GET_ESPECIE_SETOR = '[COORDENADOR ESPECIE SETOR] GET ESPECIE_SETOR';
export const GET_ESPECIE_SETOR_SUCCESS = '[COORDENADOR ESPECIE SETOR] GET ESPECIE_SETOR SUCCESS';
export const GET_ESPECIE_SETOR_FAILED = '[COORDENADOR ESPECIE SETOR] GET ESPECIE_SETOR FAILED';

/**
 * Get EspecieSetor
 */
export class GetEspecieSetor implements Action
{
    readonly type = GET_ESPECIE_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Get EspecieSetor Success
 */
export class GetEspecieSetorSuccess implements Action
{
    readonly type = GET_ESPECIE_SETOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get EspecieSetor Failed
 */
export class GetEspecieSetorFailed implements Action
{
    readonly type = GET_ESPECIE_SETOR_FAILED;

    constructor(public payload: string)
    {
    }
}

export type EspecieSetorActionsAll
    = GetEspecieSetor
    | GetEspecieSetorSuccess
    | GetEspecieSetorFailed;
