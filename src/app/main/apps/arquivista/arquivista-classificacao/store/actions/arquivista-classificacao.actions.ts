import {Action} from '@ngrx/store';

export const CREATE_CLASSIFICACAO = '[CLASSIFICACAO] CREATE CLASSIFICACAO';
export const CREATE_CLASSIFICACAO_SUCCESS = '[CLASSIFICACAO] CREATE CLASSIFICACAO SUCCESS';

export const SAVE_CLASSIFICACAO = '[CLASSIFICACAO] SAVE CLASSIFICACAO';
export const SAVE_CLASSIFICACAO_SUCCESS = '[CLASSIFICACAO] SAVE CLASSIFICACAO SUCCESS';
export const SAVE_CLASSIFICACAO_FAILED = '[CLASSIFICACAO] SAVE CLASSIFICACAO FAILED';

export const GET_CLASSIFICACAO = '[CLASSIFICACAO] GET CLASSIFICACAO';
export const GET_CLASSIFICACAO_SUCCESS = '[CLASSIFICACAO] GET CLASSIFICACAO SUCCESS';
export const GET_CLASSIFICACAO_FAILED = '[CLASSIFICACAO] GET CLASSIFICACAO FAILED';

/**
 * Get Classificação
 */
export class GetClassificacao implements Action
{
    readonly type = GET_CLASSIFICACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Classificação Success
 */
export class GetClassificacaoSuccess implements Action
{
    readonly type = GET_CLASSIFICACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Classificação Failed
 */
export class GetClassificacaoFailed implements Action
{
    readonly type = GET_CLASSIFICACAO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Classificação
 */
export class SaveClassificacao implements Action
{
    readonly type = SAVE_CLASSIFICACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Classificacao Success
 */
export class SaveClassificacaoSuccess implements Action
{
    readonly type = SAVE_CLASSIFICACAO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Classificacao Failed
 */
export class SaveClassificacaoFailed implements Action
{
    readonly type = SAVE_CLASSIFICACAO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Classificacao
 */
export class CreateClassificacao implements Action
{
    readonly type = CREATE_CLASSIFICACAO;

    constructor()
    {
    }
}

/**
 * Create Classificacao Success
 */
export class CreateClassificacaoSuccess implements Action
{
    readonly type = CREATE_CLASSIFICACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type ArquivistaClassificacaoActionsAll
    = CreateClassificacao
    | CreateClassificacaoSuccess
    | GetClassificacao
    | GetClassificacaoSuccess
    | GetClassificacaoFailed
    | SaveClassificacao
    | SaveClassificacaoSuccess
    | SaveClassificacaoFailed;