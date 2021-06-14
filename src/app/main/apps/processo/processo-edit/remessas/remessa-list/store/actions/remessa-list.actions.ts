import {Action} from '@ngrx/store';

export const GET_TRAMITACOES = '[REMESSA LIST] GET TRAMITACOES';
export const GET_TRAMITACOES_SUCCESS = '[REMESSA LIST] GET TRAMITACOES SUCCESS';
export const GET_TRAMITACOES_FAILED = '[REMESSA LIST] GET TRAMITACOES FAILED';

export const RELOAD_TRAMITACOES = '[REMESSA LIST] RELOAD TRAMITACOES';

export const DELETE_TRAMITACAO = '[REMESSA LIST] DELETE TRAMITACAO';
export const DELETE_TRAMITACAO_SUCCESS = '[REMESSA LIST] DELETE TRAMITACAO SUCCESS';
export const DELETE_TRAMITACAO_FAILED = '[REMESSA LIST] DELETE TRAMITACAO FAILED';

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

export type RemessaListActionsAll
    = GetTramitacoes
    | GetTramitacoesSuccess
    | GetTramitacoesFailed
    | ReloadTramitacoes
    | DeleteTramitacao
    | DeleteTramitacaoSuccess
    | DeleteTramitacaoFailed;

