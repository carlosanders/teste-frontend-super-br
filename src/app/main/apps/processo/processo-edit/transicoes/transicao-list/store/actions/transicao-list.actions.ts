import {Action} from '@ngrx/store';

export const GET_TRANSICOES = '[TRANSICAO LIST] GET TRANSICOES';
export const GET_TRANSICOES_SUCCESS = '[TRANSICAO LIST] GET TRANSICOES SUCCESS';
export const GET_TRANSICOES_FAILED = '[TRANSICAO LIST] GET TRANSICOES FAILED';

export const RELOAD_TRANSICOES = '[TRANSICAO LIST] RELOAD TRANSICOES';

export const DELETE_TRANSICAO = '[TRANSICAO LIST] DELETE TRANSICAO';
export const DELETE_TRANSICAO_SUCCESS = '[TRANSICAO LIST] DELETE TRANSICAO SUCCESS';
export const DELETE_TRANSICAO_FAILED = '[TRANSICAO LIST] DELETE TRANSICAO FAILED';

/**
 * Get Transicoes
 */
export class GetTransicoes implements Action
{
    readonly type = GET_TRANSICOES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Transicoes Success
 */
export class GetTransicoesSuccess implements Action
{
    readonly type = GET_TRANSICOES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Transicoes Failed
 */
export class GetTransicoesFailed implements Action
{
    readonly type = GET_TRANSICOES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Transicoes
 */
export class ReloadTransicoes implements Action
{
    readonly type = RELOAD_TRANSICOES;

    constructor()
    {
    }
}

/**
 * Delete Transicao
 */
export class DeleteTransicao implements Action
{
    readonly type = DELETE_TRANSICAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Transicao Success
 */
export class DeleteTransicaoSuccess implements Action
{
    readonly type = DELETE_TRANSICAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Transicao Failed
 */
export class DeleteTransicaoFailed implements Action
{
    readonly type = DELETE_TRANSICAO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type TransicaoListActionsAll
    = GetTransicoes
    | GetTransicoesSuccess
    | GetTransicoesFailed
    | ReloadTransicoes
    | DeleteTransicao
    | DeleteTransicaoSuccess
    | DeleteTransicaoFailed;

