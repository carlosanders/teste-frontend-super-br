import {Action} from '@ngrx/store';

export const UNLOAD_COMPARTILHAMENTOS = '[COMPARTILHAMENTO LIST] UNLOAD COMPARTILHAMENTOS';

export const GET_COMPARTILHAMENTOS = '[COMPARTILHAMENTO LIST] GET COMPARTILHAMENTOS';
export const GET_COMPARTILHAMENTOS_SUCCESS = '[COMPARTILHAMENTO LIST] GET COMPARTILHAMENTOS SUCCESS';
export const GET_COMPARTILHAMENTOS_FAILED = '[COMPARTILHAMENTO LIST] GET COMPARTILHAMENTOS FAILED';

export const DELETE_COMPARTILHAMENTO = '[COMPARTILHAMENTO LIST] DELETE COMPARTILHAMENTO';
export const DELETE_COMPARTILHAMENTO_SUCCESS = '[COMPARTILHAMENTO LIST] DELETE COMPARTILHAMENTO SUCCESS';
export const DELETE_COMPARTILHAMENTO_FAILED = '[COMPARTILHAMENTO LIST] DELETE COMPARTILHAMENTO FAILED';

export const DELETE_COMPARTILHAMENTO_FLUSH = '[COMPARTILHAMENTO LIST] DELETE COMPARTILHAMENTO FLUSH';
export const DELETE_COMPARTILHAMENTO_CANCEL = '[COMPARTILHAMENTO LIST] DELETE COMPARTILHAMENTO CANCEL';
export const DELETE_COMPARTILHAMENTO_CANCEL_SUCCESS = '[COMPARTILHAMENTO LIST] DELETE COMPARTILHAMENTO CANCEL SUCCESS';


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

/**
 * Delete Compartilhamento Flush
 */
export class DeleteCompartilhamentoFlush implements Action {
    readonly type = DELETE_COMPARTILHAMENTO_FLUSH;

    constructor() {
    }
}

/**
 * Delete Compartilhamento Cancel
 */
export class DeleteCompartilhamentoCancel implements Action {
    readonly type = DELETE_COMPARTILHAMENTO_CANCEL;

    constructor() {
    }
}

/**
 * Delete Compartilhamento Cancel Success
 */
export class DeleteCompartilhamentoCancelSuccess implements Action {
    readonly type = DELETE_COMPARTILHAMENTO_CANCEL_SUCCESS;

    constructor(public payload: any) {
    }
}

export type CompartilhamentoListActionsAll
    = UnloadCompartilhamentos
    | GetCompartilhamentos
    | GetCompartilhamentosSuccess
    | GetCompartilhamentosFailed
    | DeleteCompartilhamento
    | DeleteCompartilhamentoSuccess
    | DeleteCompartilhamentoFailed
    | DeleteCompartilhamentoCancel
    | DeleteCompartilhamentoCancelSuccess
    | DeleteCompartilhamentoFlush;

