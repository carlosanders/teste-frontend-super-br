import {Action} from '@ngrx/store';

export const CREATE_ACOMPANHAMENTO = '[ACOMPANHAMENTO] CREATE ACOMPANHAMENTO';
export const CREATE_ACOMPANHAMENTO_SUCCESS = '[ACOMPANHAMENTO] CREATE ACOMPANHAMENTO SUCCESS';

export const SAVE_ACOMPANHAMENTO = '[ACOMPANHAMENTO] SAVE ACOMPANHAMENTO';
export const SAVE_ACOMPANHAMENTO_SUCCESS = '[ACOMPANHAMENTO] SAVE ACOMPANHAMENTO SUCCESS';
export const SAVE_ACOMPANHAMENTO_FAILED = '[ACOMPANHAMENTO] SAVE ACOMPANHAMENTO FAILED';

export const GET_ACOMPANHAMENTO = '[ACOMPANHAMENTO] GET ACOMPANHAMENTO';
export const GET_ACOMPANHAMENTO_SUCCESS = '[ACOMPANHAMENTO] GET ACOMPANHAMENTO SUCCESS';
export const GET_ACOMPANHAMENTO_FAILED = '[ACOMPANHAMENTO] GET ACOMPANHAMENTO FAILED';

/**
 * Get Acompanhamento
 */
export class GetAcompanhamento implements Action
{
    readonly type = GET_ACOMPANHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Acompanhamento Success
 */
export class GetAcompanhamentoSuccess implements Action
{
    readonly type = GET_ACOMPANHAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Acompanhamento Failed
 */
export class GetAcompanhamentoFailed implements Action
{
    readonly type = GET_ACOMPANHAMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Acompanhamento
 */
export class SaveAcompanhamento implements Action
{
    readonly type = SAVE_ACOMPANHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Acompanhamento Success
 */
export class SaveAcompanhamentoSuccess implements Action
{
    readonly type = SAVE_ACOMPANHAMENTO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Acompanhamento Failed
 */
export class SaveAcompanhamentoFailed implements Action
{
    readonly type = SAVE_ACOMPANHAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Acompanhamento
 */
export class CreateAcompanhamento implements Action
{
    readonly type = CREATE_ACOMPANHAMENTO;

    constructor()
    {
    }
}

/**
 * Create Acompanhamento Success
 */
export class CreateAcompanhamentoSuccess implements Action
{
    readonly type = CREATE_ACOMPANHAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type AcompanhamentoEditActionsAll
    = CreateAcompanhamento
    | CreateAcompanhamentoSuccess
    | GetAcompanhamento
    | GetAcompanhamentoSuccess
    | GetAcompanhamentoFailed
    | SaveAcompanhamento
    | SaveAcompanhamentoSuccess
    | SaveAcompanhamentoFailed;
