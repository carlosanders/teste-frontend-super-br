import { Action } from '@ngrx/store';

export const CREATE_GARANTIA = '[GARANTIA] CREATE GARANTIA';
export const CREATE_GARANTIA_SUCCESS = '[GARANTIA] CREATE GARANTIA SUCCESS';

export const SAVE_GARANTIA = '[GARANTIA] SAVE GARANTIA';
export const SAVE_GARANTIA_SUCCESS = '[GARANTIA] SAVE GARANTIA SUCCESS';
export const SAVE_GARANTIA_FAILED = '[GARANTIA] SAVE GARANTIA FAILED';

export const GET_GARANTIA = '[GARANTIA] GET GARANTIA';
export const GET_GARANTIA_SUCCESS = '[GARANTIA] GET GARANTIA SUCCESS';
export const GET_GARANTIA_FAILED = '[GARANTIA] GET GARANTIA FAILED';

export const UNLOAD_STORE = '[GARANTIA-EDIT] UNLOAD STORE';

/**
 * Get Garantia
 */
export class GetGarantia implements Action
{
    readonly type = GET_GARANTIA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Garantia Success
 */
export class GetGarantiaSuccess implements Action
{
    readonly type = GET_GARANTIA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Garantia Failed
 */
export class GetGarantiaFailed implements Action
{
    readonly type = GET_GARANTIA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Garantia
 */
export class SaveGarantia implements Action
{
    readonly type = SAVE_GARANTIA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Garantia Success
 */
export class SaveGarantiaSuccess implements Action
{
    readonly type = SAVE_GARANTIA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Garantia Failed
 */
export class SaveGarantiaFailed implements Action
{
    readonly type = SAVE_GARANTIA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Garantia
 */
export class CreateGarantia implements Action
{
    readonly type = CREATE_GARANTIA;

    constructor()
    {
    }
}

/**
 * Create Garantia Success
 */
export class CreateGarantiaSuccess implements Action
{
    readonly type = CREATE_GARANTIA_SUCCESS;

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

export type GarantiaEditActionsAll
    = CreateGarantia
    | CreateGarantiaSuccess
    | GetGarantia
    | GetGarantiaSuccess
    | GetGarantiaFailed
    | SaveGarantia
    | SaveGarantiaSuccess
    | SaveGarantiaFailed
    | UnloadStore;
