import { Action } from '@ngrx/store';

export const GET_TESTE = '[TESTE] GET TESTE';
export const GET_TESTE_SUCCESS = '[TESTE] GET TESTE SUCCESS';
export const GET_TESTE_FAILED = '[TESTE] GET TESTE FAILED';

export const EDIT_TESTE = '[TESTE] EDIT TESTE';
export const EDIT_TESTE_SUCCESS = '[TESTE] EDIT TESTE SUCCESS';

export const GET_CURRENT_TESTE = '[TESTE] GET CURRENT TESTE';
export const GET_CURRENT_TESTE_SUCCESS = '[TESTE] GET CURRENT TESTE SUCCESS';
export const GET_CURRENT_TESTE_FAILED = '[TESTE] GET CURRENT TESTE FAILED';

export const CREATE_TESTE = '[TESTE] CREATE TESTE';
export const CREATE_TESTE_SUCCESS = '[TESTE] CREATE TESTE SUCCESS';

export const SAVE_TESTE = '[TESTE] SAVE TESTE';
export const SAVE_TESTE_SUCCESS = '[TESTE] SAVE TESTE SUCCESS';
export const SAVE_TESTE_FAILED = '[TESTE] SAVE TESTE FAILED';

export const DELETE_TESTE = '[TESTE] DELETE TESTE';
export const DELETE_TESTE_SUCCESS = '[TESTE] DELETE TESTE SUCCESS';
export const DELETE_TESTE_FAILED = '[TESTE] DELETE TESTE FAILED';

/**
 * Get Teste
 */
export class GetTeste implements Action
{
    readonly type = GET_TESTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Teste Success
 */
export class GetTesteSuccess implements Action
{
    readonly type = GET_TESTE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Teste Failed
 */
export class GetTesteFailed implements Action
{
    readonly type = GET_TESTE_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Set Current Teste
 */
export class EditTeste implements Action
{
    readonly type = EDIT_TESTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Set Current Teste Success
 */
export class EditTesteuccess implements Action
{
    readonly type = EDIT_TESTE_SUCCESS;

    constructor()
    {
    }
}

/**
 * Get Current Teste
 */
export class GetCurrentTeste implements Action
{
    readonly type = GET_CURRENT_TESTE;

    constructor()
    {
    }
}

/**
 * Get Current Teste Success
 */
export class GetCurrentTesteuccess implements Action
{
    readonly type = GET_CURRENT_TESTE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Current Teste Failed
 */
export class GetCurrentTesteFailed implements Action
{
    readonly type = GET_CURRENT_TESTE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Teste
 */
export class SaveTeste implements Action
{
    readonly type = SAVE_TESTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Teste Success
 */
export class SaveTesteuccess implements Action
{
    readonly type = SAVE_TESTE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Teste Failed
 */
export class SaveTesteFailed implements Action
{
    readonly type = SAVE_TESTE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Teste
 */
export class DeleteTeste implements Action
{
    readonly type = DELETE_TESTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Teste Success
 */
export class DeleteTesteSuccess implements Action
{
    readonly type = DELETE_TESTE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Teste Failed
 */
export class DeleteTesteFailed implements Action
{
    readonly type = DELETE_TESTE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Creat Teste
 */
export class CreateTeste implements Action
{
    readonly type = CREATE_TESTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Creat Teste Success
 */
export class CreateTesteSuccess implements Action
{
    readonly type = CREATE_TESTE_SUCCESS;

    constructor()
    {
    }
}


export type TesteActionsAll
    = GetTeste
    | GetTesteSuccess
    | GetTesteFailed
    | CreateTeste
    | CreateTesteSuccess
    | EditTeste
    | EditTesteuccess
    | GetCurrentTeste
    | GetCurrentTesteuccess
    | GetCurrentTesteFailed
    | SaveTeste
    | SaveTesteuccess
    | SaveTesteFailed
    | DeleteTeste
    | DeleteTesteSuccess
    | DeleteTesteFailed;
