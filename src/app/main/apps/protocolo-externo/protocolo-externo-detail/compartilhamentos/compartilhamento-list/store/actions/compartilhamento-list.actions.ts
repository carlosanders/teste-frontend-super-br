import { Action } from '@ngrx/store';

export const GET_COMPARTILHAMENTOS = '[COMPARTILHAMENTO LIST] GET COMPARTILHAMENTOS';
export const GET_COMPARTILHAMENTOS_SUCCESS = '[COMPARTILHAMENTO LIST] GET COMPARTILHAMENTOS SUCCESS';
export const GET_COMPARTILHAMENTOS_FAILED = '[COMPARTILHAMENTO LIST] GET COMPARTILHAMENTOS FAILED';

/**
 * Get Compartilhamentos
 */
export class GetCompartilhamentos implements Action
{
    readonly type = GET_COMPARTILHAMENTOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Compartilhamentos Success
 */
export class GetCompartilhamentosSuccess implements Action
{
    readonly type = GET_COMPARTILHAMENTOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Compartilhamentos Failed
 */
export class GetCompartilhamentosFailed implements Action
{
    readonly type = GET_COMPARTILHAMENTOS_FAILED;

    constructor(public payload: string)
    {
    }
}

export type CompartilhamentoListActionsAll
    = GetCompartilhamentos
    | GetCompartilhamentosSuccess
    | GetCompartilhamentosFailed;

