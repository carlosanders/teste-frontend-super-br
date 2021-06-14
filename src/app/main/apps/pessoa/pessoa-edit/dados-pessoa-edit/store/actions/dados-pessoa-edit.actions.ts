import {Action} from '@ngrx/store';

export const CREATE_PESSOA = '[PESSOA] CREATE PESSOA';
export const CREATE_PESSOA_SUCCESS = '[PESSOA] CREATE PESSOA SUCCESS';

export const SAVE_PESSOA = '[PESSOA] SAVE PESSOA';
export const SAVE_PESSOA_SUCCESS = '[PESSOA] SAVE PESSOA SUCCESS';
export const SAVE_PESSOA_FAILED = '[PESSOA] SAVE PESSOA FAILED';

export const GET_PESSOA = '[PESSOA] GET PESSOA';
export const GET_PESSOA_SUCCESS = '[PESSOA] GET PESSOA SUCCESS';
export const GET_PESSOA_FAILED = '[PESSOA] GET PESSOA FAILED';

/**
 * Get Pessoa
 */
export class GetPessoa implements Action
{
    readonly type = GET_PESSOA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Pessoa Success
 */
export class GetPessoaSuccess implements Action
{
    readonly type = GET_PESSOA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Pessoa Failed
 */
export class GetPessoaFailed implements Action
{
    readonly type = GET_PESSOA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Pessoa
 */
export class SavePessoa implements Action
{
    readonly type = SAVE_PESSOA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Pessoa Success
 */
export class SavePessoaSuccess implements Action
{
    readonly type = SAVE_PESSOA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Pessoa Failed
 */
export class SavePessoaFailed implements Action
{
    readonly type = SAVE_PESSOA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Pessoa
 */
export class CreatePessoa implements Action
{
    readonly type = CREATE_PESSOA;

    constructor()
    {
    }
}

/**
 * Create Pessoa Success
 */
export class CreatePessoaSuccess implements Action
{
    readonly type = CREATE_PESSOA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type DadosPessoaEditActionsAll
    = CreatePessoa
    | CreatePessoaSuccess
    | GetPessoa
    | GetPessoaSuccess
    | GetPessoaFailed
    | SavePessoa
    | SavePessoaSuccess
    | SavePessoaFailed;
