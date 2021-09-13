import {Action} from '@ngrx/store';

export const GET_ACOES = '[ACAO TRANSICAO WORKFLOW LIST] GET ACOES';
export const GET_ACOES_SUCCESS = '[ACAO TRANSICAO WORKFLOW LIST] GET ACOES SUCCESS';
export const GET_ACOES_FAILED = '[ACAO TRANSICAO WORKFLOW LIST] GET ACOES FAILED';

export const RELOAD_ACOES = '[ACAO TRANSICAO WORKFLOW LIST] RELOAD ACOES';

export const DELETE_ACAO = '[ACAO TRANSICAO WORKFLOW LIST] DELETE ACAO';
export const DELETE_ACAO_SUCCESS = '[ACAO TRANSICAO WORKFLOW LIST] DELETE ACAO SUCCESS';
export const DELETE_ACAO_FAILED = '[ACAO TRANSICAO WORKFLOW LIST] DELETE ACAO FAILED';

/**
 * Get Acoes
 */
export class GetAcoes implements Action {
    readonly type = GET_ACOES;

    constructor(public payload: any) {
    }
}

/**
 * Get Acoes Success
 */
export class GetAcoesSuccess implements Action {
    readonly type = GET_ACOES_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Acoes Failed
 */
export class GetAcoesFailed implements Action {
    readonly type = GET_ACOES_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload Acoes
 */
export class ReloadAcoes implements Action {
    readonly type = RELOAD_ACOES;

    constructor() {
    }
}

/**
 * Delete Acao
 */
export class DeleteAcao implements Action {
    readonly type = DELETE_ACAO;

    constructor(public payload: any) {
    }
}

/**
 * Delete Acao Success
 */
export class DeleteAcaoSuccess implements Action {
    readonly type = DELETE_ACAO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Acao Failed
 */
export class DeleteAcaoFailed implements Action {
    readonly type = DELETE_ACAO_FAILED;

    constructor(public payload: any) {
    }
}

export type AcaoListActionsAll
    = GetAcoes
    | GetAcoesSuccess
    | GetAcoesFailed
    | ReloadAcoes
    | DeleteAcao
    | DeleteAcaoSuccess
    | DeleteAcaoFailed;

