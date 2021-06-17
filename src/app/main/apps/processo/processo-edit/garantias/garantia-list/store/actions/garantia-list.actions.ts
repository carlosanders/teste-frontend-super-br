import {Action} from '@ngrx/store';

export const GET_GARANTIAS = '[GARANTIA LIST] GET GARANTIAS';
export const GET_GARANTIAS_SUCCESS = '[GARANTIA LIST] GET GARANTIAS SUCCESS';
export const GET_GARANTIAS_FAILED = '[GARANTIA LIST] GET GARANTIAS FAILED';

export const RELOAD_GARANTIAS = '[GARANTIA LIST] RELOAD GARANTIAS';

export const DELETE_GARANTIA = '[GARANTIA LIST] DELETE GARANTIA';
export const DELETE_GARANTIA_SUCCESS = '[GARANTIA LIST] DELETE GARANTIA SUCCESS';
export const DELETE_GARANTIA_FAILED = '[GARANTIA LIST] DELETE GARANTIA FAILED';

/**
 * Get Garantias
 */
export class GetGarantias implements Action
{
    readonly type = GET_GARANTIAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Garantias Success
 */
export class GetGarantiasSuccess implements Action
{
    readonly type = GET_GARANTIAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Garantias Failed
 */
export class GetGarantiasFailed implements Action
{
    readonly type = GET_GARANTIAS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Garantias
 */
export class ReloadGarantias implements Action
{
    readonly type = RELOAD_GARANTIAS;

    constructor()
    {
    }
}

/**
 * Delete Garantia
 */
export class DeleteGarantia implements Action
{
    readonly type = DELETE_GARANTIA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Garantia Success
 */
export class DeleteGarantiaSuccess implements Action
{
    readonly type = DELETE_GARANTIA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Garantia Failed
 */
export class DeleteGarantiaFailed implements Action
{
    readonly type = DELETE_GARANTIA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type GarantiaListActionsAll
    = GetGarantias
    | GetGarantiasSuccess
    | GetGarantiasFailed
    | ReloadGarantias
    | DeleteGarantia
    | DeleteGarantiaSuccess
    | DeleteGarantiaFailed;

