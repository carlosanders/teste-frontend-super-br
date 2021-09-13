import {Action} from '@ngrx/store';

export const SAVE_PESSOA = '[ADMIN PESSOA EDIT] SAVE PESSOA';
export const SAVE_PESSOA_SUCCESS = '[ADMIN PESSOA EDIT] SAVE PESSOA SUCCESS';
export const SAVE_PESSOA_FAILED = '[ADMIN PESSOA EDIT] SAVE PESSOA FAILED';

export const GET_PESSOA = '[ADMIN PESSOA EDIT] GET PESSOA';
export const GET_PESSOA_SUCCESS = '[ADMIN PESSOA EDIT] GET PESSOA SUCCESS';
export const GET_PESSOA_FAILED = '[ADMIN PESSOA EDIT] GET PESSOA FAILED';


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
 * Save Pessoa
 */
export class SavePessoa implements Action {
    readonly type = SAVE_PESSOA;

    constructor(public payload: any) {
    }
}

/**
 * Save Pessoa Success
 */
export class SavePessoaSuccess implements Action {
    readonly type = SAVE_PESSOA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Pessoa Failed
 */
export class SavePessoaFailed implements Action {
    readonly type = SAVE_PESSOA_FAILED;

    constructor(public payload: any) {
    }
}


export type PessoaEditActionsAll
    = GetPessoa
    | GetPessoaSuccess
    | GetPessoaFailed
    | SavePessoa
    | SavePessoaSuccess
    | SavePessoaFailed;
