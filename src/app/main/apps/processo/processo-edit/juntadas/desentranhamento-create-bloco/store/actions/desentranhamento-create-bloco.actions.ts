import { Action } from '@ngrx/store';

export const CREATE_DESENTRANHAMENTO = '[DESENTRANHAMENTO CREATE BLOCO] CREATE DESENTRANHAMENTO';
export const CREATE_DESENTRANHAMENTO_SUCCESS = '[DESENTRANHAMENTO CREATE BLOCO] CREATE DESENTRANHAMENTO SUCCESS';

export const SAVE_DESENTRANHAMENTO = '[DESENTRANHAMENTO CREATE BLOCO] SAVE DESENTRANHAMENTO';
export const SAVE_DESENTRANHAMENTO_SUCCESS = '[DESENTRANHAMENTO CREATE BLOCO] SAVE DESENTRANHAMENTO SUCCESS';
export const SAVE_DESENTRANHAMENTO_FAILED = '[DESENTRANHAMENTO CREATE BLOCO] SAVE DESENTRANHAMENTO FAILED';

/**
 * Save Desentranhamento
 */
export class SaveDesentranhamento implements Action
{
    readonly type = SAVE_DESENTRANHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Desentranhamento Success
 */
export class SaveDesentranhamentoSuccess implements Action
{
    readonly type = SAVE_DESENTRANHAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Desentranhamento Failed
 */
export class SaveDesentranhamentoFailed implements Action
{
    readonly type = SAVE_DESENTRANHAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Desentranhamento
 */
export class CreateDesentranhamento implements Action
{
    readonly type = CREATE_DESENTRANHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Desentranhamento Success
 */
export class CreateDesentranhamentoSuccess implements Action
{
    readonly type = CREATE_DESENTRANHAMENTO_SUCCESS;

    constructor()
    {
    }
}

export type DesentranhamentoCreateBlocoActionsAll
    = CreateDesentranhamento
    | CreateDesentranhamentoSuccess
    | SaveDesentranhamento
    | SaveDesentranhamentoSuccess
    | SaveDesentranhamentoFailed;
