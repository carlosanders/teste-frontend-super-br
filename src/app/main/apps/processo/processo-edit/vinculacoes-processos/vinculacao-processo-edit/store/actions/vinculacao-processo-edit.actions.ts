import {Action} from '@ngrx/store';

export const CREATE_VINCULACAO_PROCESSO = '[VINCULACAO PROCESSO] CREATE VINCULACAO PROCESSO';
export const CREATE_VINCULACAO_PROCESSO_SUCCESS = '[VINCULACAO PROCESSO] CREATE VINCULACAO PROCESSO SUCCESS';

export const SAVE_VINCULACAO_PROCESSO = '[VINCULACAO PROCESSO] SAVE VINCULACAO PROCESSO';
export const SAVE_VINCULACAO_PROCESSO_SUCCESS = '[VINCULACAO PROCESSO] SAVE VINCULACAO PROCESSO SUCCESS';
export const SAVE_VINCULACAO_PROCESSO_FAILED = '[VINCULACAO PROCESSO] SAVE VINCULACAO PROCESSO FAILED';

export const GET_VINCULACAO_PROCESSO = '[VINCULACAO PROCESSO] GET VINCULACAO PROCESSO';
export const GET_VINCULACAO_PROCESSO_SUCCESS = '[VINCULACAO PROCESSO] GET VINCULACAO PROCESSO SUCCESS';
export const GET_VINCULACAO_PROCESSO_FAILED = '[VINCULACAO PROCESSO] GET VINCULACAO PROCESSO FAILED';

export const UNLOAD_STORE = '[VINCULACAO PROCESSO-EDIT] UNLOAD STORE';

/**
 * Get VinculacaoProcesso
 */
export class GetVinculacaoProcesso implements Action
{
    readonly type = GET_VINCULACAO_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoProcesso Success
 */
export class GetVinculacaoProcessoSuccess implements Action
{
    readonly type = GET_VINCULACAO_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoProcesso Failed
 */
export class GetVinculacaoProcessoFailed implements Action
{
    readonly type = GET_VINCULACAO_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save VinculacaoProcesso
 */
export class SaveVinculacaoProcesso implements Action
{
    readonly type = SAVE_VINCULACAO_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save VinculacaoProcesso Success
 */
export class SaveVinculacaoProcessoSuccess implements Action
{
    readonly type = SAVE_VINCULACAO_PROCESSO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save VinculacaoProcesso Failed
 */
export class SaveVinculacaoProcessoFailed implements Action
{
    readonly type = SAVE_VINCULACAO_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create VinculacaoProcesso
 */
export class CreateVinculacaoProcesso implements Action
{
    readonly type = CREATE_VINCULACAO_PROCESSO;

    constructor()
    {
    }
}

/**
 * Create VinculacaoProcesso Success
 */
export class CreateVinculacaoProcessoSuccess implements Action
{
    readonly type = CREATE_VINCULACAO_PROCESSO_SUCCESS;

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
export type VinculacaoProcessoEditActionsAll
    = CreateVinculacaoProcesso
    | CreateVinculacaoProcessoSuccess
    | GetVinculacaoProcesso
    | GetVinculacaoProcessoSuccess
    | GetVinculacaoProcessoFailed
    | SaveVinculacaoProcesso
    | SaveVinculacaoProcessoSuccess
    | SaveVinculacaoProcessoFailed
    | UnloadStore;
