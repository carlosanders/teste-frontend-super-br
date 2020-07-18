import { Action } from '@ngrx/store';

export const GET_ASSUNTOS = '[PROCESSO ASSUNTOS] GET ASSUNTOS';
export const GET_ASSUNTOS_SUCCESS = '[PROCESSO ASSUNTOS] GET ASSUNTOS SUCCESS';
export const GET_ASSUNTOS_FAILED = '[PROCESSO ASSUNTOS] GET ASSUNTOS FAILED';

export const UNLOAD_ASSUNTOS = '[PROCESSO ASSUNTOS] UNLOAD ASSUNTOS';

/**
 * Get Assuntos Processo
 */
export class GetAssuntos implements Action {
    readonly type = GET_ASSUNTOS;

    constructor(public payload: any) {
    }
}

/**
 * Get Assuntos Processo
 */
export class GetAssuntosSuccess implements Action {
    readonly type = GET_ASSUNTOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Assuntos Processo
 */
export class GetAssuntosFailed implements Action {
    readonly type = GET_ASSUNTOS_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Unload Assuntos
 */
export class UnloadAssuntos implements Action
{
    readonly type = UNLOAD_ASSUNTOS;

    constructor(public payload: any)
    {
    }
}


export type AssuntoActionsAll
    = GetAssuntos
    | GetAssuntosSuccess
    | GetAssuntosFailed
    | UnloadAssuntos;
