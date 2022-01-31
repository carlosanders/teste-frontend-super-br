import { Action } from '@ngrx/store';

export const GET_OBJETO_AVALIADO = '[OBJETO AVALIADO] GET OBJETO AVALIADO';
export const GET_OBJETO_AVALIADO_SUCCESS = '[OBJETO AVALIADO] GET OBJETO AVALIADO SUCCESS';
export const GET_OBJETO_AVALIADO_FAILED = '[OBJETO AVALIADO] GET OBJETO AVALIADO FAILED';

/**
 * Get ObjetoAvaliado
 */
export class GetObjetoAvaliado implements Action
{
    readonly type = GET_OBJETO_AVALIADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ObjetoAvaliado Success
 */
export class GetObjetoAvaliadoSuccess implements Action
{
    readonly type = GET_OBJETO_AVALIADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ObjetoAvaliado Failed
 */
export class GetObjetoAvaliadoFailed implements Action
{
    readonly type = GET_OBJETO_AVALIADO_FAILED;

    constructor(public payload: string)
    {
    }
}

export type ObjetoAvaliadoActionsAll
    = GetObjetoAvaliado
    | GetObjetoAvaliadoSuccess
    | GetObjetoAvaliadoFailed;
