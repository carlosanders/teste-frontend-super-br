import {Action} from '@ngrx/store';

export const GET_VALIDACOES = '[VALIDACAO TRANSICAO WORKFLOW LIST] GET VALIDACOES';
export const GET_VALIDACOES_SUCCESS = '[VALIDACAO TRANSICAO WORKFLOW LIST] GET VALIDACOES SUCCESS';
export const GET_VALIDACOES_FAILED = '[VALIDACAO TRANSICAO WORKFLOW LIST] GET VALIDACOES FAILED';

export const RELOAD_VALIDACOES = '[VALIDACAO TRANSICAO WORKFLOW LIST] RELOAD VALIDACOES';

export const DELETE_VALIDACAO = '[VALIDACAO TRANSICAO WORKFLOW LIST] DELETE VALIDACAO';
export const DELETE_VALIDACAO_SUCCESS = '[VALIDACAO TRANSICAO WORKFLOW LIST] DELETE VALIDACAO SUCCESS';
export const DELETE_VALIDACAO_FAILED = '[VALIDACAO TRANSICAO WORKFLOW LIST] DELETE VALIDACAO FAILED';

/**
 * Get Validacoes
 */
export class GetValidacoes implements Action {
    readonly type = GET_VALIDACOES;

    constructor(public payload: any) {
    }
}

/**
 * Get Validacoes Success
 */
export class GetValidacoesSuccess implements Action {
    readonly type = GET_VALIDACOES_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Validacoes Failed
 */
export class GetValidacoesFailed implements Action {
    readonly type = GET_VALIDACOES_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload Validacoes
 */
export class ReloadValidacoes implements Action {
    readonly type = RELOAD_VALIDACOES;

    constructor() {
    }
}

/**
 * Delete Validacao
 */
export class DeleteValidacao implements Action {
    readonly type = DELETE_VALIDACAO;

    constructor(public payload: any) {
    }
}

/**
 * Delete Validacao Success
 */
export class DeleteValidacaoSuccess implements Action {
    readonly type = DELETE_VALIDACAO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Validacao Failed
 */
export class DeleteValidacaoFailed implements Action {
    readonly type = DELETE_VALIDACAO_FAILED;

    constructor(public payload: any) {
    }
}

export type ValidacaoListActionsAll
    = GetValidacoes
    | GetValidacoesSuccess
    | GetValidacoesFailed
    | ReloadValidacoes
    | DeleteValidacao
    | DeleteValidacaoSuccess
    | DeleteValidacaoFailed;

