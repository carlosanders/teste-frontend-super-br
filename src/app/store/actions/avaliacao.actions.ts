import { Action } from '@ngrx/store';

export const SAVE_AVALIACAO = '[AVALIACAO] SAVE AVALIACAO';
export const SAVE_AVALIACAO_SUCCESS = '[AVALIACAO] SAVE AVALIACAO SUCCESS';
export const SAVE_AVALIACAO_FAILED = '[AVALIACAO] SAVE AVALIACAO FAILED';

export const GET_AVALIACAO = '[AVALIACAO] GET AVALIACAO';
export const GET_AVALIACAO_SUCCESS = '[AVALIACAO] GET AVALIACAO SUCCESS';
export const GET_AVALIACAO_FAILED = '[AVALIACAO] GET AVALIACAO FAILED';

export const UNLOAD_AVALIACAO = '[AVALIACAO] UNLOAD AVALIACAO';

/**
 * Get Avaliacao
 */
export class GetAvaliacao implements Action
{
    readonly type = GET_AVALIACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Avaliacao Success
 */
export class GetAvaliacaoSuccess implements Action
{
    readonly type = GET_AVALIACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Avaliacao Failed
 */
export class GetAvaliacaoFailed implements Action
{
    readonly type = GET_AVALIACAO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Avaliacao
 */
export class SaveAvaliacao implements Action
{
    readonly type = SAVE_AVALIACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Avaliacao Success
 */
export class SaveAvaliacaoSuccess implements Action
{
    readonly type = SAVE_AVALIACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Avaliacao Failed
 */
export class SaveAvaliacaoFailed implements Action
{
    readonly type = SAVE_AVALIACAO_FAILED;

    constructor(public payload: any)
    {
    }
}

export class UnloadAvaliacao implements Action
{
    readonly type = UNLOAD_AVALIACAO;

    constructor() {
    }
}

export type AvaliacaoActionsAll
    = GetAvaliacao
    | GetAvaliacaoSuccess
    | GetAvaliacaoFailed
    | SaveAvaliacao
    | SaveAvaliacaoSuccess
    | SaveAvaliacaoFailed
    | UnloadAvaliacao;
