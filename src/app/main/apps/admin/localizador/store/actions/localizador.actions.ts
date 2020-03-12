import { Action } from '@ngrx/store';

export const GET_SETOR = '[ADMIN LOCALIZADOR] GET SETOR';
export const GET_SETOR_SUCCESS = '[ADMIN LOCALIZADOR] GET SETOR SUCCESS';
export const GET_SETOR_FAILED = '[ADMIN LOCALIZADOR] GET SETOR FAILED';

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

export type LocalizadorActionsAll
    = GetSetor
    | GetSetorSuccess
    | GetSetorFailed;
