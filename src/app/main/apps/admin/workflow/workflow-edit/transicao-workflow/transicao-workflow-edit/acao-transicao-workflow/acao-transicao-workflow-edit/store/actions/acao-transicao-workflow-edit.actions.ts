import {Action} from '@ngrx/store';

export const CREATE_ACAO = '[ACAO TRANSICAO WORKFLOW] CREATE ACAO';
export const CREATE_ACAO_SUCCESS = '[ACAO TRANSICAO WORKFLOW] CREATE ACAO SUCCESS';

export const SAVE_ACAO = '[ACAO TRANSICAO WORKFLOW] SAVE ACAO';
export const SAVE_ACAO_SUCCESS = '[ACAO TRANSICAO WORKFLOW] SAVE ACAO SUCCESS';
export const SAVE_ACAO_FAILED = '[ACAO TRANSICAO WORKFLOW] SAVE ACAO FAILED';

export const GET_ACAO = '[ACAO TRANSICAO WORKFLOW] GET ACAO';
export const GET_ACAO_SUCCESS = '[ACAO TRANSICAO WORKFLOW] GET ACAO SUCCESS';
export const GET_ACAO_FAILED = '[ACAO TRANSICAO WORKFLOW] GET ACAO FAILED';
export const RELOAD_ACAO = '[ACAO TRANSICAO WORKFLOW] RELOAD ACAO';

/**
 * Get Acao
 */
export class GetAcao implements Action {
    readonly type = GET_ACAO;

    constructor(public payload: any) {
    }
}

/**
 * Get Acao Success
 */
export class GetAcaoSuccess implements Action {
    readonly type = GET_ACAO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Acao Failed
 */
export class GetAcaoFailed implements Action {
    readonly type = GET_ACAO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Acao
 */
export class SaveAcao implements Action {
    readonly type = SAVE_ACAO;

    constructor(public payload: any) {
    }
}

/**
 * Save Acao Success
 */
export class SaveAcaoSuccess implements Action {
    readonly type = SAVE_ACAO_SUCCESS;

    constructor() {
    }
}

/**
 * Save Acao Failed
 */
export class SaveAcaoFailed implements Action {
    readonly type = SAVE_ACAO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Acao
 */
export class CreateAcao implements Action {
    readonly type = CREATE_ACAO;

    constructor() {
    }
}

/**
 * Create Acao Success
 */
export class CreateAcaoSuccess implements Action {
    readonly type = CREATE_ACAO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Reload
 */
export class ReloadAcao implements Action {
    readonly type = RELOAD_ACAO;

    constructor(public payload: any) {
    }
}

export type AcaoEditActionsAll
    = CreateAcao
    | CreateAcaoSuccess
    | GetAcao
    | GetAcaoSuccess
    | GetAcaoFailed
    | SaveAcao
    | SaveAcaoSuccess
    | SaveAcaoFailed
    | ReloadAcao;
