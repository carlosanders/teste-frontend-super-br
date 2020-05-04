import { Action } from '@ngrx/store';

export const GET_COMPARTILHAMENTOS = '[COMPARTILHAMENTO LIST] GET COMPARTILHAMENTOS';
export const GET_COMPARTILHAMENTOS_SUCCESS = '[COMPARTILHAMENTO LIST] GET COMPARTILHAMENTOS SUCCESS';
export const GET_COMPARTILHAMENTOS_FAILED = '[COMPARTILHAMENTO LIST] GET COMPARTILHAMENTOS FAILED';

export const DELETE_COMPARTILHAMENTO = '[COMPARTILHAMENTO LIST] DELETE COMPARTILHAMENTO';
export const DELETE_COMPARTILHAMENTO_SUCCESS = '[COMPARTILHAMENTO LIST] DELETE COMPARTILHAMENTO SUCCESS';
export const DELETE_COMPARTILHAMENTO_FAILED = '[COMPARTILHAMENTO LIST] DELETE COMPARTILHAMENTO FAILED';

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

/**
 * Delete Compartilhamento
 */
export class DeleteCompartilhamento implements Action
{
    readonly type = DELETE_COMPARTILHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Compartilhamento Success
 */
export class DeleteCompartilhamentoSuccess implements Action
{
    readonly type = DELETE_COMPARTILHAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Compartilhamento Failed
 */
export class DeleteCompartilhamentoFailed implements Action
{
    readonly type = DELETE_COMPARTILHAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type CompartilhamentoListActionsAll
    = GetCompartilhamentos
    | GetCompartilhamentosSuccess
    | GetCompartilhamentosFailed
    | DeleteCompartilhamento
    | DeleteCompartilhamentoSuccess
    | DeleteCompartilhamentoFailed;

