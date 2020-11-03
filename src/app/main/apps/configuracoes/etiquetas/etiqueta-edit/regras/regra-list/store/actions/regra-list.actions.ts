import { Action } from '@ngrx/store';

export const GET_REGRAS = '[REGRA LIST] GET REGRAS';
export const GET_REGRAS_SUCCESS = '[REGRA LIST] GET REGRAS SUCCESS';
export const GET_REGRAS_FAILED = '[REGRA LIST] GET REGRAS FAILED';

export const RELOAD_REGRAS = '[REGRA LIST] RELOAD REGRAS';

export const DELETE_REGRA = '[REGRA LIST] DELETE REGRA';
export const DELETE_REGRA_SUCCESS = '[REGRA LIST] DELETE REGRA SUCCESS';
export const DELETE_REGRA_FAILED = '[REGRA LIST] DELETE REGRA FAILED';

/**
 * Get Regras
 */
export class GetRegras implements Action
{
    readonly type = GET_REGRAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Regras Success
 */
export class GetRegrasSuccess implements Action
{
    readonly type = GET_REGRAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Regras Failed
 */
export class GetRegrasFailed implements Action
{
    readonly type = GET_REGRAS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Regras
 */
export class ReloadRegras implements Action
{
    readonly type = RELOAD_REGRAS;

    constructor()
    {
    }
}

/**
 * Delete Regra
 */
export class DeleteRegra implements Action
{
    readonly type = DELETE_REGRA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Regra Success
 */
export class DeleteRegraSuccess implements Action
{
    readonly type = DELETE_REGRA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Regra Failed
 */
export class DeleteRegraFailed implements Action
{
    readonly type = DELETE_REGRA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type RegraListActionsAll
    = GetRegras
    | GetRegrasSuccess
    | GetRegrasFailed
    | ReloadRegras
    | DeleteRegra
    | DeleteRegraSuccess
    | DeleteRegraFailed;

