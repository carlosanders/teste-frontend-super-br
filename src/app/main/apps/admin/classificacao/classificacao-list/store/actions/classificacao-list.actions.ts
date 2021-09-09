import {Action} from '@ngrx/store';

export const GET_CLASSIFICACAO = '[SUPERADMIN CLASSIFICACAO LIST] GET CLASSIFICACAO';
export const GET_CLASSIFICACAO_SUCCESS = '[SUPERADMIN CLASSIFICACAO LIST] GET CLASSIFICACAO SUCCESS';
export const GET_CLASSIFICACAO_FAILED = '[SUPERADMIN CLASSIFICACAO LIST] GET CLASSIFICACAO FAILED';

export const RELOAD_CLASSIFICACAO = '[SUPERADMIN CLASSIFICACAO LIST] RELOAD CLASSIFICACAO';
export const UNLOAD_CLASSIFICACAO = '[SUPERADMIN CLASSIFICACAO LIST] UNLOAD CLASSIFICACAO';


export const DELETE_CLASSIFICACAO = '[SUPERADMIN CLASSIFICACAO LIST] DELETE CLASSIFICACAO';
export const DELETE_CLASSIFICACAO_SUCCESS = '[SUPERADMIN CLASSIFICACAO LIST] DELETE CLASSIFICACAO SUCCESS';
export const DELETE_CLASSIFICACAO_FAILED = '[SUPERADMIN CLASSIFICACAO LIST] DELETE CLASSIFICACAO FAILED';

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
 * Unload Classificacao
 */
export class UnloadClassificacao implements Action {
    readonly type = UNLOAD_CLASSIFICACAO;

    constructor() {
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
 * Delete Classificacao
 */
export class DeleteClassificacao implements Action {
    readonly type = DELETE_CLASSIFICACAO;

    constructor(public payload: any) {
    }
}

/**
 * Delete Classificacao Success
 */
export class DeleteClassificacaoSuccess implements Action {
    readonly type = DELETE_CLASSIFICACAO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Classificacao Failed
 */
export class DeleteClassificacaoFailed implements Action {
    readonly type = DELETE_CLASSIFICACAO_FAILED;

    constructor(public payload: any) {
    }
}

export type ClassificacaoListActionsAll
    = GetClassificacao
    | GetClassificacaoSuccess
    | GetClassificacaoFailed
    | UnloadClassificacao
    | ReloadClassificacao
    | DeleteClassificacao
    | DeleteClassificacaoSuccess
    | DeleteClassificacaoFailed;
