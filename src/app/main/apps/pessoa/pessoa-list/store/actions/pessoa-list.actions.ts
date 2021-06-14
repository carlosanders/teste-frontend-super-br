import {Action} from '@ngrx/store';

export const GET_PESSOAS = '[PESSOA LIST] GET PESSOAS';
export const GET_PESSOAS_SUCCESS = '[PESSOA LIST] GET PESSOAS SUCCESS';
export const GET_PESSOAS_FAILED = '[PESSOA LIST] GET PESSOAS FAILED';

export const RELOAD_PESSOAS = '[PESSOA LIST] RELOAD PESSOAS';

export const UNLOAD_PESSOAS = '[PESSOA LIST] UNLOAD PESSOAS';

export const DELETE_PESSOA = '[PESSOA LIST] DELETE PESSOA';
export const DELETE_PESSOA_SUCCESS = '[PESSOA LIST] DELETE PESSOA SUCCESS';
export const DELETE_PESSOA_FAILED = '[PESSOA LIST] DELETE PESSOA FAILED';

/**
 * Get Pessoas
 */
export class GetPessoas implements Action
{
    readonly type = GET_PESSOAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Pessoas Success
 */
export class GetPessoasSuccess implements Action
{
    readonly type = GET_PESSOAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Pessoas Failed
 */
export class GetPessoasFailed implements Action
{
    readonly type = GET_PESSOAS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Pessoas
 */
export class ReloadPessoas implements Action
{
    readonly type = RELOAD_PESSOAS;

    constructor()
    {
    }
}

/**
 * Unload Pessoas
 */
export class UnloadPessoas implements Action
{
    readonly type = UNLOAD_PESSOAS;

    constructor()
    {
    }
}

/**
 * Delete Pessoa
 */
export class DeletePessoa implements Action
{
    readonly type = DELETE_PESSOA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Pessoa Success
 */
export class DeletePessoaSuccess implements Action
{
    readonly type = DELETE_PESSOA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Pessoa Failed
 */
export class DeletePessoaFailed implements Action
{
    readonly type = DELETE_PESSOA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type PessoaListActionsAll
    = GetPessoas
    | GetPessoasSuccess
    | GetPessoasFailed
    | ReloadPessoas
    | UnloadPessoas
    | DeletePessoa
    | DeletePessoaSuccess
    | DeletePessoaFailed;

