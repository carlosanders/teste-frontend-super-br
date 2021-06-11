import {Action} from '@ngrx/store';

export const CREATE_LOTACAO = '[COORDENADOR LOTACAO EDIT] CREATE LOTACAO';
export const CREATE_LOTACAO_SUCCESS = '[COORDENADOR LOTACAO EDIT] CREATE LOTACAO SUCCESS';

export const SAVE_LOTACAO = '[COORDENADOR LOTACAO EDIT] SAVE LOTACAO';
export const SAVE_LOTACAO_SUCCESS = '[COORDENADOR LOTACAO EDIT] SAVE LOTACAO SUCCESS';
export const SAVE_LOTACAO_FAILED = '[COORDENADOR LOTACAO EDIT] SAVE LOTACAO FAILED';

export const GET_LOTACAO = '[COORDENADOR LOTACAO EDIT] GET LOTACAO';
export const GET_LOTACAO_SUCCESS = '[COORDENADOR LOTACAO EDIT] GET LOTACAO SUCCESS';
export const GET_LOTACAO_FAILED = '[COORDENADOR LOTACAO EDIT] GET LOTACAO FAILED';

/**
 * Get Lotacao
 */
export class GetLotacao implements Action
{
    readonly type = GET_LOTACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Lotacao Success
 */
export class GetLotacaoSuccess implements Action
{
    readonly type = GET_LOTACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Lotacao Failed
 */
export class GetLotacaoFailed implements Action
{
    readonly type = GET_LOTACAO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Lotacao
 */
export class SaveLotacao implements Action
{
    readonly type = SAVE_LOTACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Lotacao Success
 */
export class SaveLotacaoSuccess implements Action
{
    readonly type = SAVE_LOTACAO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Lotacao Failed
 */
export class SaveLotacaoFailed implements Action
{
    readonly type = SAVE_LOTACAO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Lotacao
 */
export class CreateLotacao implements Action
{
    readonly type = CREATE_LOTACAO;

    constructor()
    {
    }
}

/**
 * Create Lotacao Success
 */
export class CreateLotacaoSuccess implements Action
{
    readonly type = CREATE_LOTACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type LotacaoEditActionsAll
    = CreateLotacao
    | CreateLotacaoSuccess
    | GetLotacao
    | GetLotacaoSuccess
    | GetLotacaoFailed
    | SaveLotacao
    | SaveLotacaoSuccess
    | SaveLotacaoFailed;
