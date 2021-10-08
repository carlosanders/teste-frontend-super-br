import {Action} from '@ngrx/store';

export const GET_JUNTADA = '[DOCUMENTOS] GET JUNTADA';
export const GET_JUNTADA_SUCCESS = '[DOCUMENTOS] GET JUNTADA SUCCESS';
export const GET_JUNTADA_FAILED = '[DOCUMENTOS] GET JUNTADA FAILED';

export const UNLOAD_JUNTADAS = '[DOCUMENTOS] UNLOAD JUNTADAS';

/**
 * Get Juntadas
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
 * Unload Juntadas
 */
export class UnloadJuntadas implements Action
{
    readonly type = UNLOAD_JUNTADAS;

    constructor(public payload: any)
    {
    }
}

export type JuntadasActionsAll
    = GetJuntada
    | GetJuntadaSuccess
    | GetJuntadaFailed
    | UnloadJuntadas;
