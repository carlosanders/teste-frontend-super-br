import {Action} from '@ngrx/store';

export const SAVE_TRANSICAO_ARQUIVISTA_BLOCO = '[TRANSICAO_ARQUIVISTA_BLOCO] SAVE TRANSICAO_ARQUIVISTA_BLOCO';
export const SAVE_TRANSICAO_ARQUIVISTA_BLOCO_SUCCESS = '[TRANSICAO_ARQUIVISTA_BLOCO] SAVE TRANSICAO_ARQUIVISTA_BLOCO SUCCESS';
export const SAVE_TRANSICAO_ARQUIVISTA_BLOCO_FAILED = '[TRANSICAO_ARQUIVISTA_BLOCO] SAVE TRANSICAO_ARQUIVISTA_BLOCO FAILED';

export const GET_TRANSICAO_ARQUIVISTA_BLOCO = '[TRANSICAO_ARQUIVISTA_BLOCO] GET TRANSICAO_ARQUIVISTA_BLOCO';
export const GET_TRANSICAO_ARQUIVISTA_BLOCO_SUCCESS = '[TRANSICAO_ARQUIVISTA_BLOCO] GET TRANSICAO_ARQUIVISTA_BLOCO SUCCESS';
export const GET_TRANSICAO_ARQUIVISTA_BLOCO_FAILED = '[TRANSICAO_ARQUIVISTA_BLOCO] GET TRANSICAO_ARQUIVISTA_BLOCO FAILED';

export const GET_PROCESSOS = '[TRANSICAO_ARQUIVISTA_BLOCO] GET PROCESSOS';
export const GET_PROCESSOS_SUCCESS = '[TRANSICAO_ARQUIVISTA_BLOCO] GET PROCESSOS SUCCESS';
export const GET_PROCESSOS_FAILED = '[TRANSICAO_ARQUIVISTA_BLOCO] GET PROCESSOS FAILED';

/**
 * Get TransicaoArquivistaBloco
 */
export class GetTransicaoArquivistaBloco implements Action
{
    readonly type = GET_TRANSICAO_ARQUIVISTA_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get TransicaoArquivistaBloco Success
 */
export class GetTransicaoArquivistaBlocoSuccess implements Action
{
    readonly type = GET_TRANSICAO_ARQUIVISTA_BLOCO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get TransicaoArquivistaBloco Failed
 */
export class GetTransicaoArquivistaBlocoFailed implements Action
{
    readonly type = GET_TRANSICAO_ARQUIVISTA_BLOCO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save TransicaoArquivistaBloco
 */
export class SaveTransicaoArquivistaBloco implements Action
{
    readonly type = SAVE_TRANSICAO_ARQUIVISTA_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save TransicaoArquivistaBloco Success
 */
export class SaveTransicaoArquivistaBlocoSuccess implements Action
{
    readonly type = SAVE_TRANSICAO_ARQUIVISTA_BLOCO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save TransicaoArquivistaBloco Failed
 */
export class SaveTransicaoArquivistaBlocoFailed implements Action
{
    readonly type = SAVE_TRANSICAO_ARQUIVISTA_BLOCO_FAILED;

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

export type TransicaoArquivistaBlocoActionsAll
    = GetTransicaoArquivistaBloco
    | GetTransicaoArquivistaBlocoSuccess
    | GetTransicaoArquivistaBlocoFailed
    | SaveTransicaoArquivistaBloco
    | SaveTransicaoArquivistaBlocoSuccess
    | SaveTransicaoArquivistaBlocoFailed
    | GetProcessos
    | GetProcessosFailed
    | GetProcessosSuccess;
