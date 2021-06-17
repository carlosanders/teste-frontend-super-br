import {Action} from '@ngrx/store';

export const RECEBER_TRAMITACAO_PROCESSO = '[RECEBER TRAMITACAO] RECEBER TRAMITACAO PROCESSO';
export const RECEBER_TRAMITACAO_PROCESSO_SUCCESS = '[RECEBER TRAMITACAO] RECEBER TRAMITACAO PROCESSO SUCCESS';
export const RECEBER_TRAMITACAO_PROCESSO_FAILED = '[RECEBER TRAMITACAO] RECEBER TRAMITACAO PROCESSO FAILED';

export const GET_TRAMITACAO = '[RECEBER TRAMITACAO] GET TRAMITACAO';
export const GET_TRAMITACAO_SUCCESS = '[RECEBER TRAMITACAO] GET TRAMITACAO SUCCESS';
export const GET_TRAMITACAO_FAILED = '[RECEBER TRAMITACAO] GET TRAMITACAO FAILED';

/**
 * Receber Tramitacao Processo
 */
export class ReceberTramitacaoProcesso implements Action
{
    readonly type = RECEBER_TRAMITACAO_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Receber Tramitacao Processo Success
 */
export class ReceberTramitacaoProcessoSuccess implements Action
{
    readonly type = RECEBER_TRAMITACAO_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Receber Tramitacao Processo Failed
 */
export class ReceberTramitacaoProcessoFailed implements Action
{
    readonly type = RECEBER_TRAMITACAO_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Get Tramitacao
 */
export class GetTramitacao implements Action
{
    readonly type = GET_TRAMITACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tramitacao Success
 */
export class GetTramitacaoSuccess implements Action
{
    readonly type = GET_TRAMITACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tramitacao Failed
 */
export class GetTramitacaoFailed implements Action
{
    readonly type = GET_TRAMITACAO_FAILED;

    constructor(public payload: string)
    {
    }
}

export type RecebimentoActionsAll
    = ReceberTramitacaoProcesso
    | ReceberTramitacaoProcessoSuccess
    | ReceberTramitacaoProcessoFailed
    | GetTramitacao
    | GetTramitacaoSuccess
    | GetTramitacaoFailed;
