import {Action} from '@ngrx/store';

export const GET_ACOMPANHAMENTO = '[PROCESSO CAPA] GET ACOMPANHAMENTO';
export const GET_ACOMPANHAMENTO_SUCCESS = '[PROCESSO CAPA] GET ACOMPANHAMENTO SUCCESS';
export const GET_ACOMPANHAMENTO_FAILED = '[PROCESSO CAPA] GET ACOMPANHAMENTO FAILED';

export const UNLOAD_ACOMPANHAMENTO = '[PROCESSO CAPA] UNLOAD ACOMPANHAMENTO';

export const SAVE_ACOMPANHAMENTO = '[PROCESSO CAPA] SAVE ACOMPANHAMENTO PROCESSO';
export const SAVE_ACOMPANHAMENTO_FAILED = '[PROCESSO CAPA] SAVE ACOMPANHAMENTO PROCESSO FAILED';
export const SAVE_ACOMPANHAMENTO_SUCCESS = '[PROCESSO CAPA] SAVE ACOMPANHAMENTO PROCESSO SUCCESS';

export const CREATE_ACOMPANHAMENTO = '[PROCESSO CAPA] CREATE ACOMPANHAMENTO PROCESSO SUCCESS';
export const CREATE_ACOMPANHAMENTO_SUCCESS = '[PROCESSO CAPA] CREATE ACOMPANHAMENTO PROCESSO SUCCESS';

export const DELETE_ACOMPANHAMENTO = '[PROCESSO CAPA] DELETE ACOMPANHAMENTO PROCESSO';
export const DELETE_ACOMPANHAMENTO_SUCCESS = '[PROCESSO CAPA] DELETE ACOMPANHAMENTO PROCESSO SUCCESS';
export const DELETE_ACOMPANHAMENTO_FAILED = '[PROCESSO CAPA] DELETE ACOMPANHAMENTO PROCESSO FAILED';

/**
 * Get Acompanhamento Processo
 */
export class GetAcompanhamento implements Action {
    readonly type = GET_ACOMPANHAMENTO;

    constructor(public payload: any) {

    }
}

/**
 * Get Acompanhamento Processo
 */
export class GetAcompanhamentoSuccess implements Action {
    readonly type = GET_ACOMPANHAMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Acompanhamento Processo
 */
export class GetAcompanhamentoFailed implements Action {
    readonly type = GET_ACOMPANHAMENTO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Unload Acompanhamento
 */
export class UnloadAcompanhamento implements Action
{
    readonly type = UNLOAD_ACOMPANHAMENTO;

    constructor(public payload: any)
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

    constructor(public payload: any)
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
export class CreateAcompanhamentoSuccess implements Action {
    readonly type = CREATE_ACOMPANHAMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}


/**
 * Delete Acompanhamento
 */
export class DeleteAcompanhamento implements Action
{
    readonly type = DELETE_ACOMPANHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Acompanhamento Success
 */
export class DeleteAcompanhamentoSuccess implements Action
{
    readonly type = DELETE_ACOMPANHAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Acompanhamento Failed
 */
export class DeleteAcompanhamentoFailed implements Action
{
    readonly type = DELETE_ACOMPANHAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type AcompanhamentoActionsAll
    = GetAcompanhamento
    | GetAcompanhamentoSuccess
    | GetAcompanhamentoFailed
    | UnloadAcompanhamento
    | CreateAcompanhamento
    | CreateAcompanhamentoSuccess
    | SaveAcompanhamento
    | SaveAcompanhamentoSuccess
    | SaveAcompanhamentoFailed
    | DeleteAcompanhamento
    | DeleteAcompanhamentoSuccess
    | DeleteAcompanhamentoFailed;
