import {Action} from '@ngrx/store';

export const UPDATE_ARQUIVISTA_CLASSIFICACAO_BLOCO = '[ARQUIVISTA_CLASSIFICACAO_BLOCO] UPDATE ARQUIVISTA_CLASSIFICACAO_BLOCO';
export const UPDATE_ARQUIVISTA_CLASSIFICACAO_BLOCO_SUCCESS = '[ARQUIVISTA_CLASSIFICACAO_BLOCO] UPDATE ARQUIVISTA_CLASSIFICACAO_BLOCO SUCCESS';

export const SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO = '[ARQUIVISTA_CLASSIFICACAO_BLOCO] SAVE ARQUIVISTA_CLASSIFICACAO_BLOCO';
export const SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO_SUCCESS = '[ARQUIVISTA_CLASSIFICACAO_BLOCO] SAVE ARQUIVISTA_CLASSIFICACAO_BLOCO SUCCESS';
export const SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO_FAILED = '[ARQUIVISTA_CLASSIFICACAO_BLOCO] SAVE ARQUIVISTA_CLASSIFICACAO_BLOCO FAILED';

export const GET_ARQUIVISTA_CLASSIFICACAO_BLOCO = '[ARQUIVISTA_CLASSIFICACAO_BLOCO] GET ARQUIVISTA_CLASSIFICACAO_BLOCO';
export const GET_ARQUIVISTA_CLASSIFICACAO_BLOCO_SUCCESS = '[ARQUIVISTA_CLASSIFICACAO_BLOCO] GET ARQUIVISTA_CLASSIFICACAO_BLOCO SUCCESS';
export const GET_ARQUIVISTA_CLASSIFICACAO_BLOCO_FAILED = '[ARQUIVISTA_CLASSIFICACAO_BLOCO] GET ARQUIVISTA_CLASSIFICACAO_BLOCO FAILED';

export const GET_PROCESSOS = '[ARQUIVISTA_CLASSIFICACAO_BLOCO] GET PROCESSOS';
export const GET_PROCESSOS_SUCCESS = '[ARQUIVISTA_CLASSIFICACAO_BLOCO] GET PROCESSOS SUCCESS';
export const GET_PROCESSOS_FAILED = '[ARQUIVISTA_CLASSIFICACAO_BLOCO] GET PROCESSOS FAILED';

/**
 * Get ArquivistaClassificacaoBloco
 */
export class GetArquivistaClassificacaoBloco implements Action
{
    readonly type = GET_ARQUIVISTA_CLASSIFICACAO_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ArquivistaClassificacaoBloco Success
 */
export class GetArquivistaClassificacaoBlocoSuccess implements Action
{
    readonly type = GET_ARQUIVISTA_CLASSIFICACAO_BLOCO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ArquivistaClassificacaoBloco Failed
 */
export class GetArquivistaClassificacaoBlocoFailed implements Action
{
    readonly type = GET_ARQUIVISTA_CLASSIFICACAO_BLOCO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save ArquivistaClassificacaoBloco
 */
export class SaveArquivistaClassificacaoBloco implements Action
{
    readonly type = SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save ArquivistaClassificacaoBloco Success
 */
export class SaveArquivistaClassificacaoBlocoSuccess implements Action
{
    readonly type = SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save ArquivistaClassificacaoBloco Failed
 */
export class SaveArquivistaClassificacaoBlocoFailed implements Action
{
    readonly type = SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ArquivistaClassificacaoBloco
 */
export class UpdateArquivistaClassificacaoBloco implements Action
{
    readonly type = UPDATE_ARQUIVISTA_CLASSIFICACAO_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ArquivistaClassificacaoBloco Success
 */
export class UpdateArquivistaClassificacaoBlocoSuccess implements Action
{
    readonly type = UPDATE_ARQUIVISTA_CLASSIFICACAO_BLOCO_SUCCESS;

    constructor(public payload: any)
    {
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

export type ArquivistaClassificacaoBlocoActionsAll
    = UpdateArquivistaClassificacaoBloco
    | UpdateArquivistaClassificacaoBlocoSuccess
    | GetArquivistaClassificacaoBloco
    | GetArquivistaClassificacaoBlocoSuccess
    | GetArquivistaClassificacaoBlocoFailed
    | SaveArquivistaClassificacaoBloco
    | SaveArquivistaClassificacaoBlocoSuccess
    | SaveArquivistaClassificacaoBlocoFailed
    | GetProcessos
    | GetProcessosFailed
    | GetProcessosSuccess;
