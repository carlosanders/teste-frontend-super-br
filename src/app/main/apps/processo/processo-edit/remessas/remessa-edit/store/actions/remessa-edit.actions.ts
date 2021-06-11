import {Action} from '@ngrx/store';

export const CREATE_TRAMITACAO = '[REMESSA] CREATE TRAMITACAO';
export const CREATE_TRAMITACAO_SUCCESS = '[REMESSA] CREATE TRAMITACAO SUCCESS';

export const SAVE_TRAMITACAO = '[REMESSA] SAVE TRAMITACAO';
export const SAVE_TRAMITACAO_SUCCESS = '[REMESSA] SAVE TRAMITACAO SUCCESS';
export const SAVE_TRAMITACAO_FAILED = '[REMESSA] SAVE TRAMITACAO FAILED';

export const GET_TRAMITACAO = '[REMESSA] GET TRAMITACAO';
export const GET_TRAMITACAO_SUCCESS = '[REMESSA] GET TRAMITACAO SUCCESS';
export const GET_TRAMITACAO_FAILED = '[REMESSA] GET TRAMITACAO FAILED';

export const UNLOAD_STORE = '[REMESSA EDIT] UNLOAD STORE';

/**
 * Get Tramitacao
 */
export class GetTramitacao implements Action
{
    readonly type = GET_TRAMITACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tramitacao Success
 */
export class GetTramitacaoSuccess implements Action
{
    readonly type = GET_TRAMITACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tramitacao Failed
 */
export class GetTramitacaoFailed implements Action
{
    readonly type = GET_TRAMITACAO_FAILED;

    constructor(public payload: string)
    {
    }
}

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

    constructor()
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

/**
 * Create Tramitacao
 */
export class CreateTramitacao implements Action
{
    readonly type = CREATE_TRAMITACAO;

    constructor()
    {
    }
}

/**
 * Create Tramitacao Success
 */
export class CreateTramitacaoSuccess implements Action
{
    readonly type = CREATE_TRAMITACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Store
 */
export class UnloadStore implements Action
{
    readonly type = UNLOAD_STORE;

    constructor()
    {
    }
}

export type RemessaEditActionsAll
    = CreateTramitacao
    | CreateTramitacaoSuccess
    | GetTramitacao
    | GetTramitacaoSuccess
    | GetTramitacaoFailed
    | SaveTramitacao
    | SaveTramitacaoSuccess
    | SaveTramitacaoFailed
    | UnloadStore;
