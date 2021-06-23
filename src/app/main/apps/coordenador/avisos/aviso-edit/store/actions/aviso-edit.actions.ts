import {Action} from '@ngrx/store';

export const CREATE_AVISO = '[COORDENADOR AVISO EDIT] CREATE AVISO';
export const CREATE_AVISO_SUCCESS = '[COORDENADOR AVISO EDIT] CREATE AVISO SUCCESS';

export const SAVE_AVISO = '[COORDENADOR AVISO EDIT] SAVE AVISO';
export const SAVE_AVISO_SUCCESS = '[COORDENADOR AVISO EDIT] SAVE AVISO SUCCESS';
export const SAVE_AVISO_FAILED = '[COORDENADOR AVISO EDIT] SAVE AVISO FAILED';

export const GET_AVISO = '[COORDENADOR AVISO EDIT] GET AVISO';
export const GET_AVISO_SUCCESS = '[COORDENADOR AVISO EDIT] GET AVISO SUCCESS';
export const GET_AVISO_FAILED = '[COORDENADOR AVISO EDIT] GET AVISO FAILED';

/**
 * Get Aviso
 */
export class GetAviso implements Action
{
    readonly type = GET_AVISO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Aviso Success
 */
export class GetAvisoSuccess implements Action
{
    readonly type = GET_AVISO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Aviso Failed
 */
export class GetAvisoFailed implements Action
{
    readonly type = GET_AVISO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Aviso
 */
export class SaveAviso implements Action
{
    readonly type = SAVE_AVISO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Aviso Success
 */
export class SaveAvisoSuccess implements Action
{
    readonly type = SAVE_AVISO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Aviso Failed
 */
export class SaveAvisoFailed implements Action
{
    readonly type = SAVE_AVISO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Aviso
 */
export class CreateAviso implements Action
{
    readonly type = CREATE_AVISO;

    constructor()
    {
    }
}

/**
 * Create Aviso Success
 */
export class CreateAvisoSuccess implements Action
{
    readonly type = CREATE_AVISO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type AvisoEditActionsAll
    = CreateAviso
    | CreateAvisoSuccess
    | GetAviso
    | GetAvisoSuccess
    | GetAvisoFailed
    | SaveAviso
    | SaveAvisoSuccess
    | SaveAvisoFailed;
