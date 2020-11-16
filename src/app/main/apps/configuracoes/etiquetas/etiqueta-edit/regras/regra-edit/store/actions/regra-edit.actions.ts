import { Action } from '@ngrx/store';

export const CREATE_REGRA = '[REGRA] CREATE REGRA';
export const CREATE_REGRA_SUCCESS = '[REGRA] CREATE REGRA SUCCESS';

export const SAVE_REGRA = '[REGRA] SAVE REGRA';
export const SAVE_REGRA_SUCCESS = '[REGRA] SAVE REGRA SUCCESS';
export const SAVE_REGRA_FAILED = '[REGRA] SAVE REGRA FAILED';

export const GET_REGRA = '[REGRA] GET REGRA';
export const GET_REGRA_SUCCESS = '[REGRA] GET REGRA SUCCESS';
export const GET_REGRA_FAILED = '[REGRA] GET REGRA FAILED';

/**
 * Get Regra
 */
export class GetRegra implements Action
{
    readonly type = GET_REGRA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Regra Success
 */
export class GetRegraSuccess implements Action
{
    readonly type = GET_REGRA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Regra Failed
 */
export class GetRegraFailed implements Action
{
    readonly type = GET_REGRA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Regra
 */
export class SaveRegra implements Action
{
    readonly type = SAVE_REGRA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Regra Success
 */
export class SaveRegraSuccess implements Action
{
    readonly type = SAVE_REGRA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Regra Failed
 */
export class SaveRegraFailed implements Action
{
    readonly type = SAVE_REGRA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Regra
 */
export class CreateRegra implements Action
{
    readonly type = CREATE_REGRA;

    constructor()
    {
    }
}

/**
 * Create Regra Success
 */
export class CreateRegraSuccess implements Action
{
    readonly type = CREATE_REGRA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type RegraEditActionsAll
    = CreateRegra
    | CreateRegraSuccess
    | GetRegra
    | GetRegraSuccess
    | GetRegraFailed
    | SaveRegra
    | SaveRegraSuccess
    | SaveRegraFailed;
