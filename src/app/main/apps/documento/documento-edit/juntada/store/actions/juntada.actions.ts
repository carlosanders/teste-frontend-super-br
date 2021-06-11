import {Action} from '@ngrx/store';

export const GET_JUNTADA = '[DOCUMENTO EDIT JUNTADA] GET JUNTADAS';
export const GET_JUNTADA_SUCCESS = '[DOCUMENTO EDIT JUNTADA] GET JUNTADAS SUCCESS';
export const GET_JUNTADA_FAILED = '[DOCUMENTO EDIT JUNTADA] GET JUNTADAS FAILED';

export const UNLAOD_JUNTADA = '[DOCUMENTO EDIT JUNTADA] UNLOAD JUNTADA';

export const SAVE_JUNTADA = '[DOCUMENTO EDIT JUNTADA] SAVE DOCUMENTO JUNTADA';
export const SAVE_JUNTADA_SUCCESS = '[DOCUMENTO EDIT JUNTADA] SAVE JUNTADA DOCUMENTO SUCCESS';
export const SAVE_JUNTADA_FAILED = '[DOCUMENTO EDIT JUNTADA] SAVE JUNTADA DOCUMENTO FAILED';

/**
 * Get Juntada
 */
export class GetJuntada implements Action
{
    readonly type = GET_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada Success
 */
export class GetJuntadaSuccess implements Action
{
    readonly type = GET_JUNTADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada Failed
 */
export class GetJuntadaFailed implements Action
{
    readonly type = GET_JUNTADA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Juntada
 */
export class SaveJuntada implements Action
{
    readonly type = SAVE_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Assinatura Success
 */
export class SaveJuntadaSuccess implements Action
{
    readonly type = SAVE_JUNTADA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Assinatura Failed
 */
export class SaveJuntadaFailed implements Action
{
    readonly type = SAVE_JUNTADA_FAILED;

    constructor(public payload: any)
    {
    }
}

export class UnloadJuntada implements Action {

    readonly  type = UNLAOD_JUNTADA;

    constructor() {
    }
}

export type JuntadaActionsAll
    = GetJuntada
    | GetJuntadaSuccess
    | GetJuntadaFailed
    | SaveJuntada
    | SaveJuntadaSuccess
    | SaveJuntadaFailed
    | UnloadJuntada;

