import {Action} from '@ngrx/store';

export const UPDATE_ARQUIVISTA_CLASSIFICACAO = '[ARQUIVISTA_CLASSIFICACAO] UPDATE ARQUIVISTA_CLASSIFICACAO';
export const UPDATE_ARQUIVISTA_CLASSIFICACAO_SUCCESS = '[ARQUIVISTA_CLASSIFICACAO] UPDATE ARQUIVISTA_CLASSIFICACAO SUCCESS';

export const SAVE_ARQUIVISTA_CLASSIFICACAO = '[ARQUIVISTA_CLASSIFICACAO] SAVE ARQUIVISTA_CLASSIFICACAO';
export const SAVE_ARQUIVISTA_CLASSIFICACAO_SUCCESS = '[ARQUIVISTA_CLASSIFICACAO] SAVE ARQUIVISTA_CLASSIFICACAO SUCCESS';
export const SAVE_ARQUIVISTA_CLASSIFICACAO_FAILED = '[ARQUIVISTA_CLASSIFICACAO] SAVE ARQUIVISTA_CLASSIFICACAO FAILED';

export const GET_ARQUIVISTA_CLASSIFICACAO = '[ARQUIVISTA_CLASSIFICACAO] GET ARQUIVISTA_CLASSIFICACAO';
export const GET_ARQUIVISTA_CLASSIFICACAO_SUCCESS = '[ARQUIVISTA_CLASSIFICACAO] GET ARQUIVISTA_CLASSIFICACAO SUCCESS';
export const GET_ARQUIVISTA_CLASSIFICACAO_FAILED = '[ARQUIVISTA_CLASSIFICACAO] GET ARQUIVISTA_CLASSIFICACAO FAILED';

export const GET_PROCESSOS = '[ARQUIVISTA_CLASSIFICACAO] GET PROCESSOS';
export const GET_PROCESSOS_SUCCESS = '[ARQUIVISTA_CLASSIFICACAO] GET PROCESSOS SUCCESS';
export const GET_PROCESSOS_FAILED = '[ARQUIVISTA_CLASSIFICACAO] GET PROCESSOS FAILED';

export const UNLOAD_PROCESSOS = '[ARQUIVISTA_CLASSIFICACAO] UNLOAD PROCESSOS';

/**
 * Get ArquivistaClassificacao
 */
export class GetArquivistaClassificacao implements Action
{
    readonly type = GET_ARQUIVISTA_CLASSIFICACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ArquivistaClassificacao Success
 */
export class GetArquivistaClassificacaoSuccess implements Action
{
    readonly type = GET_ARQUIVISTA_CLASSIFICACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ArquivistaClassificacao Failed
 */
export class GetArquivistaClassificacaoFailed implements Action
{
    readonly type = GET_ARQUIVISTA_CLASSIFICACAO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save ArquivistaClassificacao
 */
export class SaveArquivistaClassificacao implements Action
{
    readonly type = SAVE_ARQUIVISTA_CLASSIFICACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save ArquivistaClassificacao Success
 */
export class SaveArquivistaClassificacaoSuccess implements Action
{
    readonly type = SAVE_ARQUIVISTA_CLASSIFICACAO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save ArquivistaClassificacao Failed
 */
export class SaveArquivistaClassificacaoFailed implements Action
{
    readonly type = SAVE_ARQUIVISTA_CLASSIFICACAO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ArquivistaClassificacao
 */
export class UpdateArquivistaClassificacao implements Action
{
    readonly type = UPDATE_ARQUIVISTA_CLASSIFICACAO;

    constructor()
    {
    }
}

/**
 * Update ArquivistaClassificacao Success
 */
export class UpdateArquivistaClassificacaoSuccess implements Action
{
    readonly type = UPDATE_ARQUIVISTA_CLASSIFICACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Processos
 */
export class UnloadProcessos implements Action {
    readonly type = UNLOAD_PROCESSOS;

    constructor(public payload: any) {
    }
}



/**
 * Get Processos
 */
export class GetProcessos implements Action {
    readonly type = GET_PROCESSOS;

    constructor(public payload: any) {
    }
}


/**
 * Get Processos Success
 */
export class GetProcessosSuccess implements Action {
    readonly type = GET_PROCESSOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Processos Failed
 */
export class GetProcessosFailed implements Action {
    readonly type = GET_PROCESSOS_FAILED;

    constructor(public payload: string) {
    }
}

export type ArquivistaClassificacaoActionsAll
    = UpdateArquivistaClassificacao
    | UpdateArquivistaClassificacaoSuccess
    | GetArquivistaClassificacao
    | GetArquivistaClassificacaoSuccess
    | GetArquivistaClassificacaoFailed
    | SaveArquivistaClassificacao
    | SaveArquivistaClassificacaoSuccess
    | SaveArquivistaClassificacaoFailed
    | GetProcessos
    | GetProcessosFailed
    | GetProcessosSuccess
    | UnloadProcessos;
