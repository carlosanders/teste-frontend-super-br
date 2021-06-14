import {Action} from '@ngrx/store';

export const GET_VINCULACOES_PROCESSOS = '[PROCESSO CAPA] GET VINCULACOES PROCESSOS';
export const GET_VINCULACOES_PROCESSOS_SUCCESS = '[PROCESSO CAPA] GET VINCULACOES PROCESSOS SUCCESS';
export const GET_VINCULACOES_PROCESSOS_FAILED = '[PROCESSO CAPA] GET VINCULACOES PROCESSOS FAILED';

export const UNLOAD_VINCULACOES_PROCESSOS = '[PROCESSO CAPA] UNLOAD VINCULACOES PROCESSOS';

/**
 * Get Assuntos Processo
 */
export class GetVinculacoesProcessos implements Action {
    readonly type = GET_VINCULACOES_PROCESSOS;

    constructor(public payload: any) {
    }
}

/**
 * Get VinculacoesProcessos Processo
 */
export class GetVinculacoesProcessosSuccess implements Action {
    readonly type = GET_VINCULACOES_PROCESSOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get VinculacoesProcessos Processo
 */
export class GetVinculacoesProcessosFailed implements Action {
    readonly type = GET_VINCULACOES_PROCESSOS_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Unload VinculacoesProcessos
 */
export class UnloadVinculacoesProcessos implements Action
{
    readonly type = UNLOAD_VINCULACOES_PROCESSOS;

    constructor(public payload: any)
    {
    }
}


export type VinculacaoProcessoActionsAll
    = GetVinculacoesProcessos
    | GetVinculacoesProcessosSuccess
    | GetVinculacoesProcessosFailed
    | UnloadVinculacoesProcessos;
