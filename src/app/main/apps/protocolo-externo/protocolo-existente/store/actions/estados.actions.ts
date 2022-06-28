import {Action} from '@ngrx/store';

export const GET_ESTADOS = '[PROTOCOLO-DOCUMENTO] GET ESTADOS';
export const GET_ESTADOS_SUCCESS = '[PROTOCOLO-DOCUMENTO] GET ESTADOS SUCCESS';
export const GET_ESTADOS_FAILED = '[PROTOCOLO-DOCUMENTO] GET ESTADOS FAILED';

/**
 * Get Estados
 */
export class GetEstados implements Action
{
    readonly type = GET_ESTADOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Estados Success
 */
export class GetEstadosSuccess implements Action
{
    readonly type = GET_ESTADOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Estados Failed
 */
export class GetEstadosFailed implements Action
{
    readonly type = GET_ESTADOS_FAILED;

    constructor(public payload: string)
    {
    }
}


export type EstadoActionsAll
    = GetEstados
    | GetEstadosSuccess
    | GetEstadosFailed;
