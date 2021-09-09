import {Action} from '@ngrx/store';

export const CREATE_CLASSIFICACAO = '[ADMIN CLASSIFICACAO EDIT] CREATE CLASSIFICACAO';
export const CREATE_CLASSIFICACAO_SUCCESS = '[ADMIN CLASSIFICACAO EDIT] CREATE CLASSIFICACAO SUCCESS';

export const SAVE_CLASSIFICACAO = '[ADMIN CLASSIFICACAO EDIT] SAVE CLASSIFICACAO';
export const SAVE_CLASSIFICACAO_SUCCESS = '[ADMIN CLASSIFICACAO EDIT] SAVE CLASSIFICACAO SUCCESS';
export const SAVE_CLASSIFICACAO_FAILED = '[ADMIN CLASSIFICACAO EDIT] SAVE CLASSIFICACAO FAILED';

export const UPDATE_CLASSIFICACAO = '[ADMIN CLASSIFICACAO EDIT] UPDATE CLASSIFICACAO';
export const UPDATE_CLASSIFICACAO_SUCCESS = '[ADMIN CLASSIFICACAO EDIT] UPDATE CLASSIFICACAO SUCCESS';
export const UPDATE_CLASSIFICACAO_FAILED = '[ADMIN CLASSIFICACAO EDIT] UPDATE CLASSIFICACAO FAILED';

export const GET_CLASSIFICACAO = '[ADMIN CLASSIFICACAO EDIT] GET CLASSIFICACAO';
export const GET_CLASSIFICACAO_SUCCESS = '[ADMIN CLASSIFICACAO EDIT] GET CLASSIFICACAO SUCCESS';
export const GET_CLASSIFICACAO_FAILED = '[ADMIN CLASSIFICACAO EDIT] GET CLASSIFICACAO FAILED';


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
 * Save Classificacao
 */
export class SaveClassificacao implements Action {
    readonly type = SAVE_CLASSIFICACAO;

    constructor(public payload: any) {
    }
}

/**
 * Update Classificacao
 */
export class UpdateClassificacao implements Action {
    readonly type = UPDATE_CLASSIFICACAO;

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

/**
 * Update Classificacao Success
 */
export class UpdateClassificacaoSuccess implements Action {
    readonly type = UPDATE_CLASSIFICACAO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update Classificacao Failed
 */
export class UpdateClassificacaoFailed implements Action {
    readonly type = UPDATE_CLASSIFICACAO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Classificacao
 */
export class CreateClassificacao implements Action {
    readonly type = CREATE_CLASSIFICACAO;

    constructor() {
    }
}

/**
 * Create Classificacao Success
 */
export class CreateClassificacaoSuccess implements Action {
    readonly type = CREATE_CLASSIFICACAO_SUCCESS;

    constructor(public payload: any) {
    }
}

export type ClassificacaoEditActionsAll
    = CreateClassificacao
    | CreateClassificacaoSuccess
    | GetClassificacao
    | GetClassificacaoSuccess
    | GetClassificacaoFailed
    | SaveClassificacao
    | SaveClassificacaoSuccess
    | SaveClassificacaoFailed
    | UpdateClassificacao
    | UpdateClassificacaoSuccess
    | UpdateClassificacaoFailed;
