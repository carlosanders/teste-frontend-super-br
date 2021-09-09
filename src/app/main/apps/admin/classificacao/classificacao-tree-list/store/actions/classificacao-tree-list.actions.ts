import {Action} from '@ngrx/store';

export const GET_CLASSIFICACAO = '[SUPERADMIN ASSUNTO ADMINISTRATIVO TREE LIST] GET CLASSIFICACAO';
export const GET_CLASSIFICACAO_SUCCESS = '[SUPERADMIN ASSUNTO ADMINISTRATIVO TREE LIST] GET CLASSIFICACAO SUCCESS';
export const GET_CLASSIFICACAO_FAILED = '[SUPERADMIN ASSUNTO ADMINISTRATIVO TREE LIST] GET CLASSIFICACAO FAILED';

export const RELOAD_CLASSIFICACAO = '[SUPERADMIN ASSUNTO ADMINISTRATIVO TREE LIST] RELOAD CLASSIFICACAO';

export const SAVE_CLASSIFICACAO = '[SUPERADMIN ASSUNTO ADMINISTRATIVO TREE LIST] SAVE CLASSIFICACAO';
export const SAVE_CLASSIFICACAO_SUCCESS = '[SUPERADMIN ASSUNTO ADMINISTRATIVO TREE LIST] SAVE CLASSIFICACAO SUCCESS';
export const SAVE_CLASSIFICACAO_FAILED = '[SUPERADMIN ASSUNTO ADMINISTRATIVO TREE LIST] SAVE CLASSIFICACAO FAILED';

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

/**
 * Save Classificacao
 */
export class SaveClassificacao implements Action {
    readonly type = SAVE_CLASSIFICACAO;

    constructor(public payload: any) {
    }
}

/**
 * Save Classificacao Success
 */
export class SaveClassificacaoSuccess implements Action {
    readonly type = SAVE_CLASSIFICACAO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Classificacao Failed
 */
export class SaveClassificacaoFailed implements Action {
    readonly type = SAVE_CLASSIFICACAO_FAILED;

    constructor(public payload: any) {
    }
}


export type ClassificacaoTreeListActionsAll
    = GetClassificacao
    | GetClassificacaoSuccess
    | GetClassificacaoFailed
    | ReloadClassificacao
    | SaveClassificacao
    | SaveClassificacaoSuccess
    | SaveClassificacaoFailed;
