import {Action} from '@ngrx/store';

export const GET_PESSOA = '[ADMIN PESSOA LIST] GET PESSOA';
export const GET_PESSOA_SUCCESS = '[ADMIN PESSOA LIST] GET PESSOA SUCCESS';
export const GET_PESSOA_FAILED = '[ADMIN PESSOA LIST] GET PESSOA FAILED';

export const RELOAD_PESSOA = '[ADMIN PESSOA LIST] RELOAD PESSOA';
export const UNLOAD_PESSOA = '[ADMIN PESSOA LIST] UNLOAD PESSOA';


/**
 * Get Pessoa
 */
export class GetPessoa implements Action {
    readonly type = GET_PESSOA;

    constructor(public payload: any) {
    }
}

/**
 * Get Pessoa Success
 */
export class GetPessoaSuccess implements Action {
    readonly type = GET_PESSOA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Pessoa Failed
 */
export class GetPessoaFailed implements Action {
    readonly type = GET_PESSOA_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Unload Pessoa
 */
export class UnloadPessoa implements Action {
    readonly type = UNLOAD_PESSOA;

    constructor() {
    }
}

/**
 * Reload Pessoa
 */
export class ReloadPessoa implements Action {
    readonly type = RELOAD_PESSOA;

    constructor() {
    }
}


export type PessoaListActionsAll
    = GetPessoa
    | GetPessoaSuccess
    | GetPessoaFailed
    | UnloadPessoa
    | ReloadPessoa;

