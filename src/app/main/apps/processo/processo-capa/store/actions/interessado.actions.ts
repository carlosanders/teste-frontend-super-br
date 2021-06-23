import {Action} from '@ngrx/store';

export const GET_INTERESSADOS = '[PROCESSO CAPA] GET INTERESSADOS';
export const GET_INTERESSADOS_SUCCESS = '[PROCESSO CAPA] GET INTERESSADOS SUCCESS';
export const GET_INTERESSADOS_FAILED = '[PROCESSO CAPA] GET INTERESSADOS FAILED';

export const UNLOAD_INTERESSADOS = '[PROCESSO CAPA] UNLOAD INTERESSADOS';

/**
 * Get Assuntos Processo
 */
export class GetInteressados implements Action {
    readonly type = GET_INTERESSADOS;

    constructor(public payload: any) {
    }
}

/**
 * Get Interessados Processo
 */
export class GetInteressadosSuccess implements Action {
    readonly type = GET_INTERESSADOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Interessados Processo
 */
export class GetInteressadosFailed implements Action {
    readonly type = GET_INTERESSADOS_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Unload Interessados
 */
export class UnloadInteressados implements Action
{
    readonly type = UNLOAD_INTERESSADOS;

    constructor(public payload: any)
    {
    }
}


export type InteressadoActionsAll
    = GetInteressados
    | GetInteressadosSuccess
    | GetInteressadosFailed
    | UnloadInteressados;
