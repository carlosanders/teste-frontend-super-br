import {Action} from '@ngrx/store';

export const GET_TRAMITACOES = '[TRAMITACAO LIST] GET TRAMITACOES';
export const GET_TRAMITACOES_SUCCESS = '[TRAMITACAO LIST] GET TRAMITACOES SUCCESS';
export const GET_TRAMITACOES_FAILED = '[TRAMITACAO LIST] GET TRAMITACOES FAILED';

export const RELOAD_TRAMITACOES = '[TRAMITACAO LIST] RELOAD TRAMITACOES';

export const DELETE_TRAMITACAO = '[TRAMITACAO LIST] DELETE TRAMITACAO';
export const DELETE_TRAMITACAO_SUCCESS = '[TRAMITACAO LIST] DELETE TRAMITACAO SUCCESS';
export const DELETE_TRAMITACAO_FAILED = '[TRAMITACAO LIST] DELETE TRAMITACAO FAILED';

/**
 * Get Tramitacoes
 */
export class GetTramitacoes implements Action
{
    readonly type = GET_TRAMITACOES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tramitacoes Success
 */
export class GetTramitacoesSuccess implements Action
{
    readonly type = GET_TRAMITACOES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tramitacoes Failed
 */
export class GetTramitacoesFailed implements Action
{
    readonly type = GET_TRAMITACOES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Tramitacoes
 */
export class ReloadTramitacoes implements Action
{
    readonly type = RELOAD_TRAMITACOES;

    constructor()
    {
    }
}

/**
 * Delete Tramitacao
 */
export class DeleteTramitacao implements Action
{
    readonly type = DELETE_TRAMITACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Tramitacao Success
 */
export class DeleteTramitacaoSuccess implements Action
{
    readonly type = DELETE_TRAMITACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Tramitacao Failed
 */
export class DeleteTramitacaoFailed implements Action
{
    readonly type = DELETE_TRAMITACAO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type TramitacaoListActionsAll
    = GetTramitacoes
    | GetTramitacoesSuccess
    | GetTramitacoesFailed
    | ReloadTramitacoes
    | DeleteTramitacao
    | DeleteTramitacaoSuccess
    | DeleteTramitacaoFailed;

