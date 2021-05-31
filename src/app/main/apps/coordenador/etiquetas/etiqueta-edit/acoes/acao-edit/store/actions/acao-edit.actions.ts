import { Action } from '@ngrx/store';

export const CREATE_ACAO = '[ACAO COORDENACAO] CREATE ACAO';
export const CREATE_ACAO_SUCCESS = '[ACAO COORDENACAO] CREATE ACAO SUCCESS';

export const SAVE_ACAO = '[ACAO COORDENACAO] SAVE ACAO';
export const SAVE_ACAO_SUCCESS = '[ACAO COORDENACAO] SAVE ACAO SUCCESS';
export const SAVE_ACAO_FAILED = '[ACAO COORDENACAO] SAVE ACAO FAILED';

export const GET_ACAO = '[ACAO COORDENACAO] GET ACAO';
export const GET_ACAO_SUCCESS = '[ACAO COORDENACAO] GET ACAO SUCCESS';
export const GET_ACAO_FAILED = '[ACAO COORDENACAO] GET ACAO FAILED';

/**
 * Get Acao
 */
export class GetAcao implements Action
{
    readonly type = GET_ACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Acao Success
 */
export class GetAcaoSuccess implements Action
{
    readonly type = GET_ACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Acao Failed
 */
export class GetAcaoFailed implements Action
{
    readonly type = GET_ACAO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Acao
 */
export class SaveAcao implements Action
{
    readonly type = SAVE_ACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Acao Success
 */
export class SaveAcaoSuccess implements Action
{
    readonly type = SAVE_ACAO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Acao Failed
 */
export class SaveAcaoFailed implements Action
{
    readonly type = SAVE_ACAO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Acao
 */
export class CreateAcao implements Action
{
    readonly type = CREATE_ACAO;

    constructor()
    {
    }
}

/**
 * Create Acao Success
 */
export class CreateAcaoSuccess implements Action
{
    readonly type = CREATE_ACAO_SUCCESS;

    constructor(public payload: any)
    {
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
    | SaveAcaoFailed;
