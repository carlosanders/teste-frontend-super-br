import {Action} from '@ngrx/store';

export const SAVE_PROCESSO = '[ENCAMINHAMENTO BLOCO] ARQUIVAR PROCESSO';
export const SAVE_PROCESSO_SUCCESS = '[ENCAMINHAMENTO BLOCO] ARQUIVAR PROCESSO SUCCESS';
export const SAVE_PROCESSO_FAILED = '[ENCAMINHAMENTO BLOCO] ARQUIVAR PROCESSO FAILED';

export const ADD_PROCESSO_ENCAMINHAMENTO = '[ENCAMINHAMENTO BLOCO] ADICIONAR PROCESSO ENCAMINHAMENTO';

export const UNLOAD_ENCAMINHAMENTO_BLOCO = '[ENCAMINHAMENTO BLOCO] UNLOAD';

/**
 * Save Processo
 */
export class SaveProcesso implements Action
{
    readonly type = SAVE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Processo Success
 */
export class SaveProcessoSuccess implements Action
{
    readonly type = SAVE_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Processo Failed
 */
export class SaveProcessoFailed implements Action
{
    readonly type = SAVE_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Adicionar Processo para Encaminhamento em Bloco
 */
export class AddProcessoEncaminhamento implements Action
{
    readonly type = ADD_PROCESSO_ENCAMINHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Encaminhamento Bloco
 */
export class UnloadEncaminhamentoBloco implements Action
{
    readonly type = UNLOAD_ENCAMINHAMENTO_BLOCO;

    constructor()
    {
    }
}

export type ProcessoActionsAll
    = SaveProcesso
    | SaveProcessoSuccess
    | SaveProcessoFailed
    | AddProcessoEncaminhamento
    | UnloadEncaminhamentoBloco;
