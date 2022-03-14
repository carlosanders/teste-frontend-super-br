import {Action} from '@ngrx/store';

export const UNLOAD_COMPARTILHAMENTOS = '[COMPARTILHAMENTO LIST] UNLOAD COMPARTILHAMENTOS';

export const GET_COMPARTILHAMENTOS = '[COMPARTILHAMENTO LIST] GET COMPARTILHAMENTOS';
export const GET_COMPARTILHAMENTOS_SUCCESS = '[COMPARTILHAMENTO LIST] GET COMPARTILHAMENTOS SUCCESS';
export const GET_COMPARTILHAMENTOS_FAILED = '[COMPARTILHAMENTO LIST] GET COMPARTILHAMENTOS FAILED';

/**
 * Unload Compartilhamentos
 */
export class UnloadCompartilhamentos implements Action
{
    readonly type = UNLOAD_COMPARTILHAMENTOS;

    constructor()
    {
    }
}

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
    = UnloadCompartilhamentos
    | GetCompartilhamentos
    | GetCompartilhamentosSuccess
    | GetCompartilhamentosFailed;

