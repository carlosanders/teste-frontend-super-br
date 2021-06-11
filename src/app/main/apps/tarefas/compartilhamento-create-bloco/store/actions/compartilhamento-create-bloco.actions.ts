import {Action} from '@ngrx/store';

export const CREATE_COMPARTILHAMENTO = '[COMPARTILHAMENTO CREATE BLOCO] CREATE COMPARTILHAMENTO';
export const CREATE_COMPARTILHAMENTO_SUCCESS = '[COMPARTILHAMENTO CREATE BLOCO] CREATE COMPARTILHAMENTO SUCCESS';

export const SAVE_COMPARTILHAMENTO = '[COMPARTILHAMENTO CREATE BLOCO] SAVE COMPARTILHAMENTO';
export const SAVE_COMPARTILHAMENTO_SUCCESS = '[COMPARTILHAMENTO CREATE BLOCO] SAVE COMPARTILHAMENTO SUCCESS';
export const SAVE_COMPARTILHAMENTO_FAILED = '[COMPARTILHAMENTO CREATE BLOCO] SAVE COMPARTILHAMENTO FAILED';

/**
 * Save Compartilhamento
 */
export class SaveCompartilhamento implements Action
{
    readonly type = SAVE_COMPARTILHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Compartilhamento Success
 */
export class SaveCompartilhamentoSuccess implements Action
{
    readonly type = SAVE_COMPARTILHAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Compartilhamento Failed
 */
export class SaveCompartilhamentoFailed implements Action
{
    readonly type = SAVE_COMPARTILHAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Compartilhamento
 */
export class CreateCompartilhamento implements Action
{
    readonly type = CREATE_COMPARTILHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Compartilhamento Success
 */
export class CreateCompartilhamentoSuccess implements Action
{
    readonly type = CREATE_COMPARTILHAMENTO_SUCCESS;

    constructor()
    {
    }
}

export type CompartilhamentoCreateBlocoActionsAll
    = CreateCompartilhamento
    | CreateCompartilhamentoSuccess
    | SaveCompartilhamento
    | SaveCompartilhamentoSuccess
    | SaveCompartilhamentoFailed;
