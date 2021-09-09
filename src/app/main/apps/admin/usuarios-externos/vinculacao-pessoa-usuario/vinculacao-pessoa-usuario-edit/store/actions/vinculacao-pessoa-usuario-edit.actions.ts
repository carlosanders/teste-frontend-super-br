import {Action} from '@ngrx/store';

export const CREATE_VINCULACAO_PESSOA_USUARIO = '[ADMIN VINCULACAO_PESSOA_USUARIO EDIT] CREATE VINCULACAO_PESSOA_USUARIO';
export const CREATE_VINCULACAO_PESSOA_USUARIO_SUCCESS = '[ADMIN VINCULACAO_PESSOA_USUARIO EDIT] CREATE VINCULACAO_PESSOA_USUARIO SUCCESS';

export const SAVE_VINCULACAO_PESSOA_USUARIO = '[ADMIN VINCULACAO_PESSOA_USUARIO EDIT] SAVE VINCULACAO_PESSOA_USUARIO';
export const SAVE_VINCULACAO_PESSOA_USUARIO_SUCCESS = '[ADMIN VINCULACAO_PESSOA_USUARIO EDIT] SAVE VINCULACAO_PESSOA_USUARIO SUCCESS';
export const SAVE_VINCULACAO_PESSOA_USUARIO_FAILED = '[ADMIN VINCULACAO_PESSOA_USUARIO EDIT] SAVE VINCULACAO_PESSOA_USUARIO FAILED';

/**
 * Save VinculacaoPessoaUsuario
 */
export class SaveVinculacaoPessoaUsuario implements Action {
    readonly type = SAVE_VINCULACAO_PESSOA_USUARIO;

    constructor(public payload: any) {
    }
}

/**
 * Save VinculacaoPessoaUsuario Success
 */
export class SaveVinculacaoPessoaUsuarioSuccess implements Action {
    readonly type = SAVE_VINCULACAO_PESSOA_USUARIO_SUCCESS;

    constructor() {
    }
}

/**
 * Save VinculacaoPessoaUsuario Failed
 */
export class SaveVinculacaoPessoaUsuarioFailed implements Action {
    readonly type = SAVE_VINCULACAO_PESSOA_USUARIO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create VinculacaoPessoaUsuario
 */
export class CreateVinculacaoPessoaUsuario implements Action {
    readonly type = CREATE_VINCULACAO_PESSOA_USUARIO;

    constructor() {
    }
}

/**
 * Create VinculacaoPessoaUsuario Success
 */
export class CreateVinculacaoPessoaUsuarioSuccess implements Action {
    readonly type = CREATE_VINCULACAO_PESSOA_USUARIO_SUCCESS;

    constructor(public payload: any) {
    }
}

export type VinculacaoPessoaUsuarioEditActionsAll
    = CreateVinculacaoPessoaUsuario
    | CreateVinculacaoPessoaUsuarioSuccess
    | SaveVinculacaoPessoaUsuario
    | SaveVinculacaoPessoaUsuarioSuccess
    | SaveVinculacaoPessoaUsuarioFailed;
