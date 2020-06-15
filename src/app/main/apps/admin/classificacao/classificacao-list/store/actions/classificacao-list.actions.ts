import {Action} from '@ngrx/store';

export const GET_CLASSIFICACAO = '[SUPERADMIN CLASSIFICACAO LIST] GET CLASSIFICACAO';
export const GET_CLASSIFICACAO_SUCCESS = '[SUPERADMIN CLASSIFICACAO LIST] GET CLASSIFICACAO SUCCESS';
export const GET_CLASSIFICACAO_FAILED = '[SUPERADMIN CLASSIFICACAO LIST] GET CLASSIFICACAO FAILED';

export const RELOAD_CLASSIFICACAO = '[SUPERADMIN CLASSIFICACAO LIST] RELOAD CLASSIFICACAO';

/**
 * Get Classificacao
 */
export class GetClassificacao implements Action {
    readonly type = GET_CLASSIFICACAO;

    constructor(public payload: any) {
    }
}

/**
 * Get Classificacao Success
 */
export class GetClassificacaoSuccess implements Action {
    readonly type = GET_CLASSIFICACAO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Classificacao Failed
 */
export class GetClassificacaoFailed implements Action {
    readonly type = GET_CLASSIFICACAO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload Classificacao
 */
export class ReloadClassificacao implements Action {
    readonly type = RELOAD_CLASSIFICACAO;

    constructor() {
    }
}

export type ClassificacaoListActionsAll
    = GetClassificacao
    | GetClassificacaoSuccess
    | GetClassificacaoFailed
    | ReloadClassificacao;
