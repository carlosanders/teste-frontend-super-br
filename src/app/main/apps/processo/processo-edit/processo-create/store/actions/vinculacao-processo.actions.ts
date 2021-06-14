import {Action} from '@ngrx/store';

export const GET_VINCULACOES_PROCESSOS = '[DADOS BASICOS STEPS] GET VINCULACOES PROCESSOS';
export const GET_VINCULACOES_PROCESSOS_SUCCESS = '[DADOS BASICOS STEPS] GET VINCULACOES PROCESSOS SUCCESS';
export const GET_VINCULACOES_PROCESSOS_FAILED = '[DADOS BASICOS STEPS] GET VINCULACOES PROCESSOS FAILED';

export const UNLOAD_VINCULACOES_PROCESSOS = '[DADOS BASICOS STEPS] UNLOAD VINCULACOES PROCESSOS';
export const RELOAD_VINCULACOES_PROCESSOS = '[DADOS BASICOS STEPS] RELOAD VINCULACOES PROCESSOS';

export const SAVE_VINCULACAO_PROCESSO = '[DADOS BASICOS STEPS] SAVE VINCULACAO PROCESSO';
export const SAVE_VINCULACAO_PROCESSO_SUCCESS = '[DADOS BASICOS STEPS] SAVE VINCULACAO PROCESSO SUCCESS';
export const SAVE_VINCULACAO_PROCESSO_FAILED = '[DADOS BASICOS STEPS] SAVE VINCULACAO PROCESSO FAILED';

export const DELETE_VINCULACAO_PROCESSO = '[DADOS BASICOS STEPS] DELETE VINCULACAO_PROCESSO';
export const DELETE_VINCULACAO_PROCESSO_SUCCESS = '[DADOS BASICOS STEPS] DELETE VINCULACAO_PROCESSO SUCCESS';
export const DELETE_VINCULACAO_PROCESSO_FAILED = '[DADOS BASICOS STEPS] DELETE VINCULACAO_PROCESSO FAILED';

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

/**
 * Save VinculacaoProcesso
 */
export class SaveVinculacaoProcesso implements Action
{
    readonly type = SAVE_VINCULACAO_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save VinculacaoProcesso Success
 */
export class SaveVinculacaoProcessoSuccess implements Action
{
    readonly type = SAVE_VINCULACAO_PROCESSO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save VinculacaoProcesso Failed
 */
export class SaveVinculacaoProcessoFailed implements Action
{
    readonly type = SAVE_VINCULACAO_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type VinculacaoProcessoActionsAll
    = GetVinculacoesProcessos
    | GetVinculacoesProcessosSuccess
    | GetVinculacoesProcessosFailed
    | UnloadVinculacoesProcessos
    | ReloadVinculacoesProcessos
    | DeleteVinculacaoProcesso
    | DeleteVinculacaoProcessoSuccess
    | DeleteVinculacaoProcessoFailed
    | SaveVinculacaoProcesso
    | SaveVinculacaoProcessoSuccess
    | SaveVinculacaoProcessoFailed;
