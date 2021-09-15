import {Action} from '@ngrx/store';

export const GET_NOMES = '[NOME LIST] GET NOMES';
export const GET_NOMES_SUCCESS = '[NOME LIST] GET NOMES SUCCESS';
export const GET_NOMES_FAILED = '[NOME LIST] GET NOMES FAILED';

export const RELOAD_NOMES = '[NOME LIST] RELOAD NOMES';

export const DELETE_NOME = '[NOME LIST] DELETE NOME';
export const DELETE_NOME_SUCCESS = '[NOME LIST] DELETE NOME SUCCESS';
export const DELETE_NOME_FAILED = '[NOME LIST] DELETE NOME FAILED';

/**
 * Get Nomes
 */
export class GetNomes implements Action {
    readonly type = GET_NOMES;

    constructor(public payload: any) {
    }
}

/**
 * Get Nomes Success
 */
export class GetNomesSuccess implements Action {
    readonly type = GET_NOMES_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Nomes Failed
 */
export class GetNomesFailed implements Action {
    readonly type = GET_NOMES_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload Nomes
 */
export class ReloadNomes implements Action {
    readonly type = RELOAD_NOMES;

    constructor() {
    }
}

/**
 * Delete Nome
 */
export class DeleteNome implements Action {
    readonly type = DELETE_NOME;

    constructor(public payload: any) {
    }
}

/**
 * Delete Nome Success
 */
export class DeleteNomeSuccess implements Action {
    readonly type = DELETE_NOME_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Nome Failed
 */
export class DeleteNomeFailed implements Action {
    readonly type = DELETE_NOME_FAILED;

    constructor(public payload: any) {
    }
}

export type NomeListActionsAll
    = GetNomes
    | GetNomesSuccess
    | GetNomesFailed
    | ReloadNomes
    | DeleteNome
    | DeleteNomeSuccess
    | DeleteNomeFailed;

