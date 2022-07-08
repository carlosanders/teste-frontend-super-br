import {Action} from '@ngrx/store';

export const GET_INTERESSADOS = '[VISUALIZAR PROCESSO] GET INTERESSADOS';
export const GET_INTERESSADOS_SUCCESS = '[VISUALIZAR PROCESSO] GET INTERESSADOS SUCCESS';
export const GET_INTERESSADOS_FAILED = '[VISUALIZAR PROCESSO] GET INTERESSADOS FAILED';

export const UNLOAD_INTERESSADOS = '[VISUALIZAR PROCESSO] UNLOAD INTERESSADOS';

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
