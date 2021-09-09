import {Action} from '@ngrx/store';

export const CREATE_VALIDACAO = '[VALIDACAO TRANSICAO WORKFLOW] CREATE VALIDACAO';
export const CREATE_VALIDACAO_SUCCESS = '[VALIDACAO TRANSICAO WORKFLOW] CREATE VALIDACAO SUCCESS';

export const SAVE_VALIDACAO = '[VALIDACAO TRANSICAO WORKFLOW] SAVE VALIDACAO';
export const SAVE_VALIDACAO_SUCCESS = '[VALIDACAO TRANSICAO WORKFLOW] SAVE VALIDACAO SUCCESS';
export const SAVE_VALIDACAO_FAILED = '[VALIDACAO TRANSICAO WORKFLOW] SAVE VALIDACAO FAILED';

export const GET_VALIDACAO = '[VALIDACAO TRANSICAO WORKFLOW] GET VALIDACAO';
export const GET_VALIDACAO_SUCCESS = '[VALIDACAO TRANSICAO WORKFLOW] GET VALIDACAO SUCCESS';
export const GET_VALIDACAO_FAILED = '[VALIDACAO TRANSICAO WORKFLOW] GET VALIDACAO FAILED';
export const RELOAD_VALIDACAO = '[VALIDACAO TRANSICAO WORKFLOW] RELOAD VALIDACAO';

/**
 * Get Validacao
 */
export class GetValidacao implements Action {
    readonly type = GET_VALIDACAO;

    constructor(public payload: any) {
    }
}

/**
 * Get Validacao Success
 */
export class GetValidacaoSuccess implements Action {
    readonly type = GET_VALIDACAO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Validacao Failed
 */
export class GetValidacaoFailed implements Action {
    readonly type = GET_VALIDACAO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Validacao
 */
export class SaveValidacao implements Action {
    readonly type = SAVE_VALIDACAO;

    constructor(public payload: any) {
    }
}

/**
 * Save Validacao Success
 */
export class SaveValidacaoSuccess implements Action {
    readonly type = SAVE_VALIDACAO_SUCCESS;

    constructor() {
    }
}

/**
 * Save Validacao Failed
 */
export class SaveValidacaoFailed implements Action {
    readonly type = SAVE_VALIDACAO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Validacao
 */
export class CreateValidacao implements Action {
    readonly type = CREATE_VALIDACAO;

    constructor() {
    }
}

/**
 * Create Validacao Success
 */
export class CreateValidacaoSuccess implements Action {
    readonly type = CREATE_VALIDACAO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Reload
 */
export class ReloadValidacao implements Action {
    readonly type = RELOAD_VALIDACAO;

    constructor(public payload: any) {
    }
}

export type ValidacaoEditActionsAll
    = CreateValidacao
    | CreateValidacaoSuccess
    | GetValidacao
    | GetValidacaoSuccess
    | GetValidacaoFailed
    | SaveValidacao
    | SaveValidacaoSuccess
    | SaveValidacaoFailed
    | ReloadValidacao;
