import { Action } from '@ngrx/store';

export const SET_PROCESSO = '[APROVEITAR DADOS] SET PROCESSO';

export const CREATE_PROCESSO = '[APROVEITAR DADOS] CREATE PROCESSO';
export const CREATE_PROCESSO_SUCCESS = '[APROVEITAR DADOS] CREATE PROCESSO SUCCESS';

export const SAVE_PROCESSO = '[APROVEITAR DADOS] SAVE PROCESSO';
export const SAVE_PROCESSO_SUCCESS = '[APROVEITAR DADOS] SAVE PROCESSO SUCCESS';
export const SAVE_PROCESSO_FAILED = '[APROVEITAR DADOS] SAVE PROCESSO FAILED';

/**
 * Set Processo
 */
export class SetProcesso implements Action
{
    readonly type = SET_PROCESSO;

    constructor(public payload: any)
    {
    }
}

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

    constructor()
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

export type DadosBasicosActionsAll
    = SetProcesso
    | CreateProcesso
    | CreateProcessoSuccess
    | SaveProcesso
    | SaveProcessoSuccess
    | SaveProcessoFailed;
