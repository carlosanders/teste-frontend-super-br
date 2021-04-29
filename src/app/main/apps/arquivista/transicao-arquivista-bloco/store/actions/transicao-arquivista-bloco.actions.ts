import {Action} from '@ngrx/store';

export const SAVE_TRANSICAO_ARQUIVISTA = '[TRANSICAO_ARQUIVISTA_BLOCO] SAVE TRANSICAO_ARQUIVISTA';
export const SAVE_TRANSICAO_ARQUIVISTA_SUCCESS = '[TRANSICAO_ARQUIVISTA_BLOCO] SAVE TRANSICAO_ARQUIVISTA SUCCESS';
export const SAVE_TRANSICAO_ARQUIVISTA_FAILED = '[TRANSICAO_ARQUIVISTA_BLOCO] SAVE TRANSICAO_ARQUIVISTA FAILED';

export const SAVE_TRANSICAO_ARQUIVISTA_CANCEL = '[TRANSICAO_ARQUIVISTA_BLOCO] SAVE TRANSICAO_ARQUIVISTA CANCEL';
export const SAVE_TRANSICAO_ARQUIVISTA_CANCEL_SUCCESS = '[TRANSICAO_ARQUIVISTA_BLOCO] SAVE TRANSICAO_ARQUIVISTA CANCEL SUCCESS';
export const SAVE_TRANSICAO_ARQUIVISTA_FLUSH = '[TRANSICAO_ARQUIVISTA_BLOCO] SAVE TRANSICAO_ARQUIVISTA FLUSH';

export const GET_PROCESSO = '[TRANSICAO_ARQUIVISTA_BLOCO] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[TRANSICAO_ARQUIVISTA_BLOCO] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[TRANSICAO_ARQUIVISTA_BLOCO] GET PROCESSO FAILED';

/**
 * Save TransicaoArquivista
 */
export class SaveTransicaoArquivista implements Action
{
    readonly type = SAVE_TRANSICAO_ARQUIVISTA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save TransicaoArquivista Success
 */
export class SaveTransicaoArquivistaSuccess implements Action
{
    readonly type = SAVE_TRANSICAO_ARQUIVISTA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save TransicaoArquivista Failed
 */
export class SaveTransicaoArquivistaFailed implements Action
{
    readonly type = SAVE_TRANSICAO_ARQUIVISTA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Save TransicaoArquivista Cancel
 */
export class SaveTransicaoArquivistaCancel implements Action
{
    readonly type = SAVE_TRANSICAO_ARQUIVISTA_CANCEL;

    constructor()
    {
    }
}

/**
 * Save TransicaoArquivista Cancel Success
 */
export class SaveTransicaoArquivistaCancelSuccess implements Action
{
    readonly type = SAVE_TRANSICAO_ARQUIVISTA_CANCEL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save TransicaoArquivista Flush
 */
export class SaveTransicaoArquivistaFlush implements Action
{
    readonly type = SAVE_TRANSICAO_ARQUIVISTA_FLUSH;

    constructor()
    {
    }
}

/**
 * Get Processo
 */
export class GetProcesso implements Action {
    readonly type = GET_PROCESSO;

    constructor(public payload: any) {
    }
}

/**
 * Get Processo Success
 */
export class GetProcessoSuccess implements Action {
    readonly type = GET_PROCESSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Processo Failed
 */
export class GetProcessoFailed implements Action {
    readonly type = GET_PROCESSO_FAILED;

    constructor(public payload: string) {
    }
}


export type TransicaoArquivistaBlocoActionsAll
    = SaveTransicaoArquivista
    | SaveTransicaoArquivistaSuccess
    | SaveTransicaoArquivistaFailed
    | SaveTransicaoArquivistaCancel
    | SaveTransicaoArquivistaCancelSuccess
    | SaveTransicaoArquivistaFlush
    | GetProcesso
    | GetProcessoSuccess
    | GetProcessoFailed;
