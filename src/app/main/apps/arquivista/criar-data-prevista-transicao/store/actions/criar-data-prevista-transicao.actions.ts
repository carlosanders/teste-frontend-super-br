import {Action} from '@ngrx/store';

export const CREATE_DATA_PREVISTA_TRANSICAO = '[DATA_PREVISTA_TRANSICAO] CREATE DATA_PREVISTA_TRANSICAO';
export const CREATE_DATA_PREVISTA_TRANSICAO_SUCCESS = '[DATA_PREVISTA_TRANSICAO] CREATE DATA_PREVISTA_TRANSICAO SUCCESS';

export const SAVE_DATA_PREVISTA_TRANSICAO = '[DATA_PREVISTA_TRANSICAO] SAVE DATA_PREVISTA_TRANSICAO';
export const SAVE_DATA_PREVISTA_TRANSICAO_SUCCESS = '[DATA_PREVISTA_TRANSICAO] SAVE DATA_PREVISTA_TRANSICAO SUCCESS';
export const SAVE_DATA_PREVISTA_TRANSICAO_FAILED = '[DATA_PREVISTA_TRANSICAO] SAVE DATA_PREVISTA_TRANSICAO FAILED';

export const GET_DATA_PREVISTA_TRANSICAO = '[DATA_PREVISTA_TRANSICAO] GET DATA_PREVISTA_TRANSICAO';
export const GET_DATA_PREVISTA_TRANSICAO_SUCCESS = '[DATA_PREVISTA_TRANSICAO] GET DATA_PREVISTA_TRANSICAO SUCCESS';
export const GET_DATA_PREVISTA_TRANSICAO_FAILED = '[DATA_PREVISTA_TRANSICAO] GET DATA_PREVISTA_TRANSICAO FAILED';

/**
 * Get DataPrevistaTransicao
 */
export class GetDataPrevistaTransicao implements Action
{
    readonly type = GET_DATA_PREVISTA_TRANSICAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get DataPrevistaTransicao Success
 */
export class GetDataPrevistaTransicaoSuccess implements Action
{
    readonly type = GET_DATA_PREVISTA_TRANSICAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get DataPrevistaTransicao Failed
 */
export class GetDataPrevistaTransicaoFailed implements Action
{
    readonly type = GET_DATA_PREVISTA_TRANSICAO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save DataPrevistaTransicao
 */
export class SaveDataPrevistaTransicao implements Action
{
    readonly type = SAVE_DATA_PREVISTA_TRANSICAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DataPrevistaTransicao Success
 */
export class SaveDataPrevistaTransicaoSuccess implements Action
{
    readonly type = SAVE_DATA_PREVISTA_TRANSICAO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save DataPrevistaTransicao Failed
 */
export class SaveDataPrevistaTransicaoFailed implements Action
{
    readonly type = SAVE_DATA_PREVISTA_TRANSICAO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create DataPrevistaTransicao
 */
export class CreateDataPrevistaTransicao implements Action
{
    readonly type = CREATE_DATA_PREVISTA_TRANSICAO;

    constructor()
    {
    }
}

/**
 * Create DataPrevistaTransicao Success
 */
export class CreateDataPrevistaTransicaoSuccess implements Action
{
    readonly type = CREATE_DATA_PREVISTA_TRANSICAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type DataPrevistaTransicaoActionsAll
    = CreateDataPrevistaTransicao
    | CreateDataPrevistaTransicaoSuccess
    | GetDataPrevistaTransicao
    | GetDataPrevistaTransicaoSuccess
    | GetDataPrevistaTransicaoFailed
    | SaveDataPrevistaTransicao
    | SaveDataPrevistaTransicaoSuccess
    | SaveDataPrevistaTransicaoFailed;
