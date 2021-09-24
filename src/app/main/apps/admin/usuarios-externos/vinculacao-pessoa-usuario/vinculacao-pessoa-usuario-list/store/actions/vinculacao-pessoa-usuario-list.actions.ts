import {Action} from '@ngrx/store';

export const GET_VINCULACAO_PESSOA_USUARIO = '[SUPERADMIN VINCULACAO PESSOA USUARIO LIST] GET VINCULACAO_PESSOA_USUARIO';
export const GET_VINCULACAO_PESSOA_USUARIO_SUCCESS = '[SUPERADMIN VINCULACAO PESSOA USUARIO LIST] GET VINCULACAO_PESSOA_USUARIO SUCCESS';
export const GET_VINCULACAO_PESSOA_USUARIO_FAILED = '[SUPERADMIN VINCULACAO PESSOA USUARIO LIST] GET VINCULACAO_PESSOA_USUARIO FAILED';

export const RELOAD_VINCULACAO_PESSOA_USUARIO = '[SUPERADMIN VINCULACAO PESSOA USUARIO LIST] RELOAD VINCULACAO_PESSOA_USUARIO';

export const DELETE_VINCULACAO_PESSOA_USUARIO = '[SUPERADMIN VINCULACAO PESSOA USUARIO LIST] DELETE VINCULACAO_PESSOA_USUARIO';
export const DELETE_VINCULACAO_PESSOA_USUARIO_SUCCESS = '[SUPERADMIN VINCULACAO PESSOA USUARIO LIST] DELETE VINCULACAO_PESSOA_USUARIO SUCCESS';
export const DELETE_VINCULACAO_PESSOA_USUARIO_FAILED = '[SUPERADMIN VINCULACAO PESSOA USUARIO LIST] DELETE VINCULACAO_PESSOA_USUARIO FAILED';

/**
 * Get VinculacaoPessoaUsuario
 */
export class GetVinculacaoPessoaUsuario implements Action {
    readonly type = GET_VINCULACAO_PESSOA_USUARIO;

    constructor(public payload: any) {
    }
}

/**
 * Get VinculacaoPessoaUsuario Success
 */
export class GetVinculacaoPessoaUsuarioSuccess implements Action {
    readonly type = GET_VINCULACAO_PESSOA_USUARIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get VinculacaoPessoaUsuario Failed
 */
export class GetVinculacaoPessoaUsuarioFailed implements Action {
    readonly type = GET_VINCULACAO_PESSOA_USUARIO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload VinculacaoPessoaUsuario
 */
export class ReloadVinculacaoPessoaUsuario implements Action {
    readonly type = RELOAD_VINCULACAO_PESSOA_USUARIO;

    constructor() {
    }
}

/**
 * Delete VinculacaoPessoaUsuario
 */
export class DeleteVinculacaoPessoaUsuario implements Action {
    readonly type = DELETE_VINCULACAO_PESSOA_USUARIO;

    constructor(public payload: any) {
    }
}

/**
 * Delete VinculacaoPessoaUsuario Success
 */
export class DeleteVinculacaoPessoaUsuarioSuccess implements Action {
    readonly type = DELETE_VINCULACAO_PESSOA_USUARIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete VinculacaoPessoaUsuario Failed
 */
export class DeleteVinculacaoPessoaUsuarioFailed implements Action {
    readonly type = DELETE_VINCULACAO_PESSOA_USUARIO_FAILED;

    constructor(public payload: any) {
    }
}

export type VinculacaoPessoaUsuarioListActionsAll
    = GetVinculacaoPessoaUsuario
    | GetVinculacaoPessoaUsuarioSuccess
    | GetVinculacaoPessoaUsuarioFailed
    | ReloadVinculacaoPessoaUsuario
    | DeleteVinculacaoPessoaUsuario
    | DeleteVinculacaoPessoaUsuarioSuccess
    | DeleteVinculacaoPessoaUsuarioFailed;

