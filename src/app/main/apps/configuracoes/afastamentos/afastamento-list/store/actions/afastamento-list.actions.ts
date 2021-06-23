import {Action} from '@ngrx/store';

export const GET_AFASTAMENTOS = '[AFASTAMENTO LIST] GET AFASTAMENTOS';
export const GET_AFASTAMENTOS_SUCCESS = '[AFASTAMENTO LIST] GET AFASTAMENTOS SUCCESS';
export const GET_AFASTAMENTOS_FAILED = '[AFASTAMENTO LIST] GET AFASTAMENTOS FAILED';

export const RELOAD_AFASTAMENTOS = '[AFASTAMENTO LIST] RELOAD AFASTAMENTOS';
export const UNLOAD_AFASTAMENTOS = '[AFASTAMENTO LIST] UNLOAD AFASTAMENTOS';


export const DELETE_AFASTAMENTO = '[AFASTAMENTO LIST] DELETE AFASTAMENTO';
export const DELETE_AFASTAMENTO_SUCCESS = '[AFASTAMENTO LIST] DELETE AFASTAMENTO SUCCESS';
export const DELETE_AFASTAMENTO_FAILED = '[AFASTAMENTO LIST] DELETE AFASTAMENTO FAILED';

/**
 * Get Afastamentos
 */
export class GetAfastamentos implements Action
{
    readonly type = GET_AFASTAMENTOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Afastamentos Success
 */
export class GetAfastamentosSuccess implements Action
{
    readonly type = GET_AFASTAMENTOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Afastamentos Failed
 */
export class GetAfastamentosFailed implements Action
{
    readonly type = GET_AFASTAMENTOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload Afastamentos
 */
 export class UnloadAfastamentos implements Action
 {
     readonly type = UNLOAD_AFASTAMENTOS;

     constructor()
     {
     }
 }

/**
 * Reload Afastamentos
 */
export class ReloadAfastamentos implements Action
{
    readonly type = RELOAD_AFASTAMENTOS;

    constructor()
    {
    }
}

/**
 * Delete Afastamento
 */
export class DeleteAfastamento implements Action
{
    readonly type = DELETE_AFASTAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Afastamento Success
 */
export class DeleteAfastamentoSuccess implements Action
{
    readonly type = DELETE_AFASTAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Afastamento Failed
 */
export class DeleteAfastamentoFailed implements Action
{
    readonly type = DELETE_AFASTAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type AfastamentoListActionsAll
    = GetAfastamentos
    | GetAfastamentosSuccess
    | GetAfastamentosFailed
    | UnloadAfastamentos
    | ReloadAfastamentos
    | DeleteAfastamento
    | DeleteAfastamentoSuccess
    | DeleteAfastamentoFailed;

