import {Action} from '@ngrx/store';

export const GET_JUNTADA = '[PROCESSO VIEW JUNTADA DESENTRANHAMENTO] GET JUNTADA';
export const GET_JUNTADA_SUCCESS = '[PROCESSO VIEW JUNTADA DESENTRANHAMENTO] GET JUNTADA SUCCESS';
export const GET_JUNTADA_FAILED = '[PROCESSO VIEW JUNTADA DESENTRANHAMENTO] GET JUNTADA FAILED';

export const CREATE_DESENTRANHAMENTO = '[PROCESSO VIEW JUNTADA DESENTRANHAMENTO] CREATE DESENTRANHAMENTO';
export const CREATE_DESENTRANHAMENTO_SUCCESS = '[PROCESSO VIEW JUNTADA DESENTRANHAMENTO] CREATE DESENTRANHAMENTO SUCCESS';

export const SAVE_DESENTRANHAMENTO = '[PROCESSO VIEW JUNTADA DESENTRANHAMENTO] SAVE DESENTRANHAMENTO';
export const SAVE_DESENTRANHAMENTO_SUCCESS = '[PROCESSO VIEW JUNTADA DESENTRANHAMENTO] SAVE DESENTRANHAMENTO SUCCESS';
export const SAVE_DESENTRANHAMENTO_FAILED = '[PROCESSO VIEW JUNTADA DESENTRANHAMENTO] SAVE DESENTRANHAMENTO FAILED';

/**
 * Get Juntada
 */
export class GetJuntada implements Action
{
    readonly type = GET_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada Success
 */
export class GetJuntadaSuccess implements Action
{
    readonly type = GET_JUNTADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada Failed
 */
export class GetJuntadaFailed implements Action
{
    readonly type = GET_JUNTADA_FAILED;

    constructor(public payload: string)
    {
    }
}

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

    constructor()
    {
    }
}

/**
 * Create Desentranhamento Success
 */
export class CreateDesentranhamentoSuccess implements Action
{
    readonly type = CREATE_DESENTRANHAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type ProcessoViewDesentranhamentoActionsAll
    = GetJuntada
    | GetJuntadaSuccess
    | GetJuntadaFailed
    | CreateDesentranhamento
    | CreateDesentranhamentoSuccess
    | SaveDesentranhamento
    | SaveDesentranhamentoSuccess
    | SaveDesentranhamentoFailed;

