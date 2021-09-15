import {Action} from '@ngrx/store';

export const CREATE_ENDERECO = '[ENDERECO] CREATE ENDERECO';
export const CREATE_ENDERECO_SUCCESS = '[ENDERECO] CREATE ENDERECO SUCCESS';

export const SAVE_ENDERECO = '[ENDERECO] SAVE ENDERECO';
export const SAVE_ENDERECO_SUCCESS = '[ENDERECO] SAVE ENDERECO SUCCESS';
export const SAVE_ENDERECO_FAILED = '[ENDERECO] SAVE ENDERECO FAILED';

export const GET_ENDERECO = '[ENDERECO] GET ENDERECO';
export const GET_ENDERECO_SUCCESS = '[ENDERECO] GET ENDERECO SUCCESS';
export const GET_ENDERECO_FAILED = '[ENDERECO] GET ENDERECO FAILED';

/**
 * Get Endereco
 */
export class GetEndereco implements Action {
    readonly type = GET_ENDERECO;

    constructor(public payload: any) {
    }
}

/**
 * Get Endereco Success
 */
export class GetEnderecoSuccess implements Action {
    readonly type = GET_ENDERECO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Endereco Failed
 */
export class GetEnderecoFailed implements Action {
    readonly type = GET_ENDERECO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Endereco
 */
export class SaveEndereco implements Action {
    readonly type = SAVE_ENDERECO;

    constructor(public payload: any) {
    }
}

/**
 * Save Endereco Success
 */
export class SaveEnderecoSuccess implements Action {
    readonly type = SAVE_ENDERECO_SUCCESS;

    constructor() {
    }
}

/**
 * Save Endereco Failed
 */
export class SaveEnderecoFailed implements Action {
    readonly type = SAVE_ENDERECO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Endereco
 */
export class CreateEndereco implements Action {
    readonly type = CREATE_ENDERECO;

    constructor() {
    }
}

/**
 * Create Endereco Success
 */
export class CreateEnderecoSuccess implements Action {
    readonly type = CREATE_ENDERECO_SUCCESS;

    constructor(public payload: any) {
    }
}

export type EnderecoEditActionsAll
    = CreateEndereco
    | CreateEnderecoSuccess
    | GetEndereco
    | GetEnderecoSuccess
    | GetEnderecoFailed
    | SaveEndereco
    | SaveEnderecoSuccess
    | SaveEnderecoFailed;
