import {Action} from '@ngrx/store';

export const GET_VINCULACAO_PESSOA_USUARIO = '[VINCULACAO PESSOA USUARIO] GET VINCULACAO_PESSOA_USUARIO';
export const GET_VINCULACAO_PESSOA_USUARIO_SUCCESS = '[VINCULACAO PESSOA USUARIO] GET VINCULACAO_PESSOA_USUARIO SUCCESS';
export const GET_VINCULACAO_PESSOA_USUARIO_FAILED = '[VINCULACAO PESSOA USUARIO] GET VINCULACAO_PESSOA_USUARIO FAILED';

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

export type VinculacaoPessoaUsuarioActionsAll
    = GetVinculacaoPessoaUsuario
    | GetVinculacaoPessoaUsuarioSuccess
    | GetVinculacaoPessoaUsuarioFailed;
