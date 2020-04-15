import { Action } from '@ngrx/store';

export const CREATE_ESPECIE_SETOR = '[COORDENADOR ESPECIE_SETOR EDIT] CREATE ESPECIE_SETOR';
export const CREATE_ESPECIE_SETOR_SUCCESS = '[COORDENADOR ESPECIE_SETOR EDIT] CREATE ESPECIE_SETOR SUCCESS';

export const SAVE_ESPECIE_SETOR = '[COORDENADOR ESPECIE_SETOR EDIT] SAVE ESPECIE_SETOR';
export const SAVE_ESPECIE_SETOR_SUCCESS = '[COORDENADOR ESPECIE_SETOR EDIT] SAVE ESPECIE_SETOR SUCCESS';
export const SAVE_ESPECIE_SETOR_FAILED = '[COORDENADOR ESPECIE_SETOR EDIT] SAVE ESPECIE_SETOR FAILED';

export const GET_ESPECIE_SETOR = '[COORDENADOR ESPECIE_SETOR EDIT] GET ESPECIE_SETOR';
export const GET_ESPECIE_SETOR_SUCCESS = '[COORDENADOR ESPECIE_SETOR EDIT] GET ESPECIE_SETOR SUCCESS';
export const GET_ESPECIE_SETOR_FAILED = '[COORDENADOR ESPECIE_SETOR EDIT] GET ESPECIE_SETOR FAILED';

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

/**
 * Save EspecieSetor
 */
export class SaveEspecieSetor implements Action
{
    readonly type = SAVE_ESPECIE_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Save EspecieSetor Success
 */
export class SaveEspecieSetorSuccess implements Action
{
    readonly type = SAVE_ESPECIE_SETOR_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save EspecieSetor Failed
 */
export class SaveEspecieSetorFailed implements Action
{
    readonly type = SAVE_ESPECIE_SETOR_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create EspecieSetor
 */
export class CreateEspecieSetor implements Action
{
    readonly type = CREATE_ESPECIE_SETOR;

    constructor()
    {
    }
}

/**
 * Create EspecieSetor Success
 */
export class CreateEspecieSetorSuccess implements Action
{
    readonly type = CREATE_ESPECIE_SETOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type EspecieSetorEditActionsAll
    = CreateEspecieSetor
    | CreateEspecieSetorSuccess
    | GetEspecieSetor
    | GetEspecieSetorSuccess
    | GetEspecieSetorFailed
    | SaveEspecieSetor
    | SaveEspecieSetorSuccess
    | SaveEspecieSetorFailed;
