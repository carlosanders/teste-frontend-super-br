import {Action} from '@ngrx/store';

export const CREATE_NOME = '[NOME] CREATE NOME';
export const CREATE_NOME_SUCCESS = '[NOME] CREATE NOME SUCCESS';

export const SAVE_NOME = '[NOME] SAVE NOME';
export const SAVE_NOME_SUCCESS = '[NOME] SAVE NOME SUCCESS';
export const SAVE_NOME_FAILED = '[NOME] SAVE NOME FAILED';

export const GET_NOME = '[NOME] GET NOME';
export const GET_NOME_SUCCESS = '[NOME] GET NOME SUCCESS';
export const GET_NOME_FAILED = '[NOME] GET NOME FAILED';

/**
 * Get Nome
 */
export class GetNome implements Action {
    readonly type = GET_NOME;

    constructor(public payload: any) {
    }
}

/**
 * Get Nome Success
 */
export class GetNomeSuccess implements Action {
    readonly type = GET_NOME_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Nome Failed
 */
export class GetNomeFailed implements Action {
    readonly type = GET_NOME_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Nome
 */
export class SaveNome implements Action {
    readonly type = SAVE_NOME;

    constructor(public payload: any) {
    }
}

/**
 * Save Nome Success
 */
export class SaveNomeSuccess implements Action {
    readonly type = SAVE_NOME_SUCCESS;

    constructor() {
    }
}

/**
 * Save Nome Failed
 */
export class SaveNomeFailed implements Action {
    readonly type = SAVE_NOME_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Nome
 */
export class CreateNome implements Action {
    readonly type = CREATE_NOME;

    constructor() {
    }
}

/**
 * Create Nome Success
 */
export class CreateNomeSuccess implements Action {
    readonly type = CREATE_NOME_SUCCESS;

    constructor(public payload: any) {
    }
}

export type NomeEditActionsAll
    = CreateNome
    | CreateNomeSuccess
    | GetNome
    | GetNomeSuccess
    | GetNomeFailed
    | SaveNome
    | SaveNomeSuccess
    | SaveNomeFailed;
