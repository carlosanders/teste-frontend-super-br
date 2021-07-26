import {Action} from '@ngrx/store';

export const GET_PROCESSO_RELATORIO = '[PROCESSO RELATORIO] GET PROCESSO RELATORIO';
export const GET_PROCESSO_RELATORIO_SUCCESS = '[PROCESSO RELATORIO] GET PROCESSO RELATORIO SUCCESS';
export const GET_PROCESSO_RELATORIO_FAILED = '[PROCESSO RELATORIO] GET PROCESSO RELATORIO FAILED';

/**
 * Get Tramitacao
 */
export class GetProcessoRelatorio implements Action
{
    readonly type = GET_PROCESSO_RELATORIO;

    constructor()
    {
    }
}

/**
 * GetGuia Tramitacao Success
 */
export class GetProcessoRelatorioSuccess implements Action
{
    readonly type = GET_PROCESSO_RELATORIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * GetGuia Tramitacao Failed
 */
export class GetProcessoRelatorioFailed implements Action
{
    readonly type = GET_PROCESSO_RELATORIO_FAILED;

    constructor(public payload: string)
    {
    }
}

export type ProcessoRelatorioViewActionsAll
    = GetProcessoRelatorio
    | GetProcessoRelatorioSuccess
    | GetProcessoRelatorioFailed;
