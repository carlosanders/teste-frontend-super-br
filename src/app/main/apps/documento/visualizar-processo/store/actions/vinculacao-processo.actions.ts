import {Action} from '@ngrx/store';

export const GET_VINCULACOES_PROCESSOS = '[VISUALIZAR PROCESSO] GET VINCULACOES PROCESSOS';
export const GET_VINCULACOES_PROCESSOS_SUCCESS = '[VISUALIZAR PROCESSO] GET VINCULACOES PROCESSOS SUCCESS';
export const GET_VINCULACOES_PROCESSOS_FAILED = '[VISUALIZAR PROCESSO] GET VINCULACOES PROCESSOS FAILED';

export const UNLOAD_VINCULACOES_PROCESSOS = '[VISUALIZAR PROCESSO] UNLOAD VINCULACOES PROCESSOS';

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
