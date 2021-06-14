import {Action} from '@ngrx/store';

export const GET_ACOMPANHAMENTOS = '[ACOMPANHAMENTO LIST] GET ACOMPANHAMENTOS';
export const GET_ACOMPANHAMENTOS_SUCCESS = '[ACOMPANHAMENTO LIST] GET ACOMPANHAMENTOS SUCCESS';
export const GET_ACOMPANHAMENTOS_FAILED = '[ACOMPANHAMENTO LIST] GET ACOMPANHAMENTOS FAILED';

export const RELOAD_ACOMPANHAMENTOS = '[ACOMPANHAMENTO LIST] RELOAD ACOMPANHAMENTOS';
export const UNLOAD_ACOMPANHAMENTOS = '[ACOMPANHAMENTO LIST] UNLOAD ACOMPANHAMENTOS';


export const DELETE_ACOMPANHAMENTO = '[ACOMPANHAMENTO LIST] DELETE ACOMPANHAMENTO';
export const DELETE_ACOMPANHAMENTO_SUCCESS = '[ACOMPANHAMENTO LIST] DELETE ACOMPANHAMENTO SUCCESS';
export const DELETE_ACOMPANHAMENTO_FAILED = '[ACOMPANHAMENTO LIST] DELETE ACOMPANHAMENTO FAILED';

/**
 * Get Acompanhamentos
 */
export class GetAcompanhamentos implements Action
{
    readonly type = GET_ACOMPANHAMENTOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Acompanhamentos Success
 */
export class GetAcompanhamentosSuccess implements Action
{
    readonly type = GET_ACOMPANHAMENTOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Acompanhamentos Failed
 */
export class GetAcompanhamentosFailed implements Action
{
    readonly type = GET_ACOMPANHAMENTOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload Acompanhamentos
 */
 export class UnloadAcompanhamentos implements Action
 {
     readonly type = UNLOAD_ACOMPANHAMENTOS;

     constructor()
     {
     }
 }

/**
 * Reload Acompanhamentos
 */
export class ReloadAcompanhamentos implements Action
{
    readonly type = RELOAD_ACOMPANHAMENTOS;

    constructor()
    {
    }
}

/**
 * Delete Acompanhamento
 */
export class DeleteAcompanhamento implements Action
{
    readonly type = DELETE_ACOMPANHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Acompanhamento Success
 */
export class DeleteAcompanhamentoSuccess implements Action
{
    readonly type = DELETE_ACOMPANHAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Acompanhamento Failed
 */
export class DeleteAcompanhamentoFailed implements Action
{
    readonly type = DELETE_ACOMPANHAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type AcompanhamentoListActionsAll
    = GetAcompanhamentos
    | GetAcompanhamentosSuccess
    | GetAcompanhamentosFailed
    | UnloadAcompanhamentos
    | ReloadAcompanhamentos
    | DeleteAcompanhamento
    | DeleteAcompanhamentoSuccess
    | DeleteAcompanhamentoFailed;

