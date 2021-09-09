import {Action} from '@ngrx/store';

export const GET_ENDERECOS = '[ENDERECO LIST] GET ENDERECOS';
export const GET_ENDERECOS_SUCCESS = '[ENDERECO LIST] GET ENDERECOS SUCCESS';
export const GET_ENDERECOS_FAILED = '[ENDERECO LIST] GET ENDERECOS FAILED';

export const RELOAD_ENDERECOS = '[ENDERECO LIST] RELOAD ENDERECOS';

export const DELETE_ENDERECO = '[ENDERECO LIST] DELETE ENDERECO';
export const DELETE_ENDERECO_SUCCESS = '[ENDERECO LIST] DELETE ENDERECO SUCCESS';
export const DELETE_ENDERECO_FAILED = '[ENDERECO LIST] DELETE ENDERECO FAILED';

/**
 * Get Enderecos
 */
export class GetEnderecos implements Action {
    readonly type = GET_ENDERECOS;

    constructor(public payload: any) {
    }
}

/**
 * Get Enderecos Success
 */
export class GetEnderecosSuccess implements Action {
    readonly type = GET_ENDERECOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Enderecos Failed
 */
export class GetEnderecosFailed implements Action {
    readonly type = GET_ENDERECOS_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload Enderecos
 */
export class ReloadEnderecos implements Action {
    readonly type = RELOAD_ENDERECOS;

    constructor() {
    }
}

/**
 * Delete Endereco
 */
export class DeleteEndereco implements Action {
    readonly type = DELETE_ENDERECO;

    constructor(public payload: any) {
    }
}

/**
 * Delete Endereco Success
 */
export class DeleteEnderecoSuccess implements Action {
    readonly type = DELETE_ENDERECO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Endereco Failed
 */
export class DeleteEnderecoFailed implements Action {
    readonly type = DELETE_ENDERECO_FAILED;

    constructor(public payload: any) {
    }
}

export type EnderecoListActionsAll
    = GetEnderecos
    | GetEnderecosSuccess
    | GetEnderecosFailed
    | ReloadEnderecos
    | DeleteEndereco
    | DeleteEnderecoSuccess
    | DeleteEnderecoFailed;

