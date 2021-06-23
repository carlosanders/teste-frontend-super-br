import {Action} from '@ngrx/store';

export const SAVE_TRAMITACAO = '[REMESSA PROCESSOS BLOCO] SAVE TRAMITACAO';
export const SAVE_TRAMITACAO_SUCCESS = '[REMESSA PROCESSOS BLOCO] SAVE TRAMITACAO SUCCESS';
export const SAVE_TRAMITACAO_FAILED = '[REMESSA PROCESSOS BLOCO] SAVE TRAMITACAO FAILED';

/**
 * Save Tramitacao
 */
export class SaveTramitacao implements Action
{
    readonly type = SAVE_TRAMITACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Tramitacao Success
 */
export class SaveTramitacaoSuccess implements Action
{
    readonly type = SAVE_TRAMITACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Tramitacao Failed
 */
export class SaveTramitacaoFailed implements Action
{
    readonly type = SAVE_TRAMITACAO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type RemessaBlocoActionsAll
    = SaveTramitacao
    | SaveTramitacaoSuccess
    | SaveTramitacaoFailed;
