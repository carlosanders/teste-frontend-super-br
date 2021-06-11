import {Action} from '@ngrx/store';

export const CREATE_TRANSICAO = '[TRANSICAO] CREATE TRANSICAO';
export const CREATE_TRANSICAO_SUCCESS = '[TRANSICAO] CREATE TRANSICAO SUCCESS';

export const SAVE_TRANSICAO = '[TRANSICAO] SAVE TRANSICAO';
export const SAVE_TRANSICAO_SUCCESS = '[TRANSICAO] SAVE TRANSICAO SUCCESS';
export const SAVE_TRANSICAO_FAILED = '[TRANSICAO] SAVE TRANSICAO FAILED';

export const GET_TRANSICAO = '[TRANSICAO] GET TRANSICAO';
export const GET_TRANSICAO_SUCCESS = '[TRANSICAO] GET TRANSICAO SUCCESS';
export const GET_TRANSICAO_FAILED = '[TRANSICAO] GET TRANSICAO FAILED';

export const UNLOAD_STORE = '[TRANSICAO EDIT] UNLOAD STORE';

/**
 * Get Transicao
 */
export class GetTransicao implements Action
{
    readonly type = GET_TRANSICAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Transicao Success
 */
export class GetTransicaoSuccess implements Action
{
    readonly type = GET_TRANSICAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Transicao Failed
 */
export class GetTransicaoFailed implements Action
{
    readonly type = GET_TRANSICAO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Transicao
 */
export class SaveTransicao implements Action
{
    readonly type = SAVE_TRANSICAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Transicao Success
 */
export class SaveTransicaoSuccess implements Action
{
    readonly type = SAVE_TRANSICAO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Transicao Failed
 */
export class SaveTransicaoFailed implements Action
{
    readonly type = SAVE_TRANSICAO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Transicao
 */
export class CreateTransicao implements Action
{
    readonly type = CREATE_TRANSICAO;

    constructor()
    {
    }
}

/**
 * Create Transicao Success
 */
export class CreateTransicaoSuccess implements Action
{
    readonly type = CREATE_TRANSICAO_SUCCESS;

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

export type TransicaoEditActionsAll
    = CreateTransicao
    | CreateTransicaoSuccess
    | GetTransicao
    | GetTransicaoSuccess
    | GetTransicaoFailed
    | SaveTransicao
    | SaveTransicaoSuccess
    | SaveTransicaoFailed
    | UnloadStore;
