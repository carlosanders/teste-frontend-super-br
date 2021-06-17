import {Action} from '@ngrx/store';

export const GET_GUIA_TRAMITACAO = '[TRAMITACAO] GET GUIA TRAMITACAO';
export const GET_GUIA_TRAMITACAO_SUCCESS = '[TRAMITACAO] GET GUIA TRAMITACAO SUCCESS';
export const GET_GUIA_TRAMITACAO_FAILED = '[TRAMITACAO] GET GUIA TRAMITACAO FAILED';

/**
 * Get Tramitacao
 */
export class GetGuiaTramitacao implements Action
{
    readonly type = GET_GUIA_TRAMITACAO;

    constructor()
    {
    }
}

/**
 * GetGuia Tramitacao Success
 */
export class GetGuiaTramitacaoSuccess implements Action
{
    readonly type = GET_GUIA_TRAMITACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * GetGuia Tramitacao Failed
 */
export class GetGuiaTramitacaoFailed implements Action
{
    readonly type = GET_GUIA_TRAMITACAO_FAILED;

    constructor(public payload: string)
    {
    }
}

export type TramitacaoViewActionsAll
    = GetGuiaTramitacao
    | GetGuiaTramitacaoSuccess
    | GetGuiaTramitacaoFailed;
