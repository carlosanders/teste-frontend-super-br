import {Action} from '@ngrx/store';

export const GET_VINCULACOES_PROCESSOS = '[VINCULACAO PROCESSO LIST] GET VINCULACOES PROCESSOS';
export const GET_VINCULACOES_PROCESSOS_SUCCESS = '[VINCULACAO PROCESSO LIST] GET VINCULACOES PROCESSOS SUCCESS';
export const GET_VINCULACOES_PROCESSOS_FAILED = '[VINCULACAO PROCESSO LIST] GET VINCULACOES PROCESSOS FAILED';

export const RELOAD_VINCULACOES_PROCESSOS = '[VINCULACAO PROCESSO LIST] RELOAD VINCULACOES PROCESSOS';

export const DELETE_VINCULACAO_PROCESSO = '[VINCULACAO PROCESSO LIST] DELETE VINCULACAO PROCESSO';
export const DELETE_VINCULACAO_PROCESSO_SUCCESS = '[VINCULACAO PROCESSO LIST] DELETE VINCULACAO PROCESSO SUCCESS';
export const DELETE_VINCULACAO_PROCESSO_FAILED = '[VINCULACAO PROCESSO LIST] DELETE VINCULACAO PROCESSO FAILED';

/**
 * Get VinculacoesProcessos
 */
export class GetVinculacoesProcessos implements Action
{
    readonly type = GET_VINCULACOES_PROCESSOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacoesProcessos Success
 */
export class GetVinculacoesProcessosSuccess implements Action
{
    readonly type = GET_VINCULACOES_PROCESSOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacoesProcessos Failed
 */
export class GetVinculacoesProcessosFailed implements Action
{
    readonly type = GET_VINCULACOES_PROCESSOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload VinculacoesProcessos
 */
export class ReloadVinculacoesProcessos implements Action
{
    readonly type = RELOAD_VINCULACOES_PROCESSOS;

    constructor()
    {
    }
}

/**
 * Delete VinculacaoProcesso
 */
export class DeleteVinculacaoProcesso implements Action
{
    readonly type = DELETE_VINCULACAO_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete VinculacaoProcesso Success
 */
export class DeleteVinculacaoProcessoSuccess implements Action
{
    readonly type = DELETE_VINCULACAO_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete VinculacaoProcesso Failed
 */
export class DeleteVinculacaoProcessoFailed implements Action
{
    readonly type = DELETE_VINCULACAO_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type VinculacaoProcessoListActionsAll
    = GetVinculacoesProcessos
    | GetVinculacoesProcessosSuccess
    | GetVinculacoesProcessosFailed
    | ReloadVinculacoesProcessos
    | DeleteVinculacaoProcesso
    | DeleteVinculacaoProcessoSuccess
    | DeleteVinculacaoProcessoFailed;

