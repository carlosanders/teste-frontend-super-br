import { Action } from '@ngrx/store';

export const GET_LOTACOES = '[ADMIN LOTACAO LIST] GET LOTACOES';
export const GET_LOTACOES_SUCCESS = '[ADMIN LOTACAO LIST] GET LOTACOES SUCCESS';
export const GET_LOTACOES_FAILED = '[ADMIN LOTACAO LIST] GET LOTACOES FAILED';

export const RELOAD_LOTACOES = '[ADMIN LOTACAO LIST] RELOAD LOTACOES';

export const DELETE_LOTACAO = '[ADMIN LOTACAO LIST] DELETE LOTACAO';
export const DELETE_LOTACAO_SUCCESS = '[ADMIN LOTACAO LIST] DELETE LOTACAO SUCCESS';
export const DELETE_LOTACAO_FAILED = '[ADMIN LOTACAO LIST] DELETE LOTACAO FAILED';

export const SAVE_LOTACAO = '[ADMIN LOTACAO] SAVE LOTACAO';
export const SAVE_LOTACAO_SUCCESS = '[ADMIN LOTACAO] SAVE LOTACAO SUCCESS';
export const SAVE_LOTACAO_FAILED = '[ADMIN LOTACAO] SAVE LOTACAO FAILED';

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
 * Get Lotacoes
 */
export class GetLotacoes implements Action
{
    readonly type = GET_LOTACOES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Lotacoes Success
 */
export class GetLotacoesSuccess implements Action
{
    readonly type = GET_LOTACOES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Lotacoes Failed
 */
export class GetLotacoesFailed implements Action
{
    readonly type = GET_LOTACOES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Lotacoes
 */
export class ReloadLotacoes implements Action
{
    readonly type = RELOAD_LOTACOES;

    constructor()
    {
    }
}

/**
 * Delete Lotacao
 */
export class DeleteLotacao implements Action
{
    readonly type = DELETE_LOTACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Lotacao Success
 */
export class DeleteLotacaoSuccess implements Action
{
    readonly type = DELETE_LOTACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Lotacao Failed
 */
export class DeleteLotacaoFailed implements Action
{
    readonly type = DELETE_LOTACAO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type LotacaoListActionsAll
    = GetLotacoes
    | GetLotacoesSuccess
    | GetLotacoesFailed
    | SaveLotacao
    | SaveLotacaoSuccess
    | SaveLotacaoFailed
    | ReloadLotacoes
    | DeleteLotacao
    | DeleteLotacaoSuccess
    | DeleteLotacaoFailed;

