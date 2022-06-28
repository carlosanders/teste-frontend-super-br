import {Action} from '@ngrx/store';

export const CREATE_PROCESSO = '[PROTOCOLO CREATE] CREATE PROCESSO';
export const CREATE_PROCESSO_SUCCESS = '[PROTOCOLO CREATE] CREATE PROCESSO SUCCESS';

export const SAVE_PROCESSO = '[PROTOCOLO CREATE] SAVE PROCESSO';
export const SAVE_PROCESSO_SUCCESS = '[PROTOCOLO CREATE] SAVE PROCESSO SUCCESS';
export const SAVE_PROCESSO_FAILED = '[PROTOCOLO CREATE] SAVE PROCESSO FAILED';

export const CONCLUIR_PROCESSO = '[PROTOCOLO CREATE] CONCLUIR PROCESSO';

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
 * Create Processo
 */
export class CreateProcesso implements Action
{
    readonly type = CREATE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Processo Success
 */
export class CreateProcessoSuccess implements Action
{
    readonly type = CREATE_PROCESSO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Concluir Processo
 */
export class ConcluirProcesso implements Action
{
    readonly type = CONCLUIR_PROCESSO;

    constructor()
    {
    }
}

export type ProtocoloCreateActionsAll
    = CreateProcesso
    | CreateProcessoSuccess
    | SaveProcesso
    | SaveProcessoSuccess
    | SaveProcessoFailed
    | ConcluirProcesso;
