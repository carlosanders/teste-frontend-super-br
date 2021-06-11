import {Action} from '@ngrx/store';

export const GET_CONTATOS = '[CONTATO LIST] GET CONTATOS';
export const GET_CONTATOS_SUCCESS = '[CONTATO LIST] GET CONTATOS SUCCESS';
export const GET_CONTATOS_FAILED = '[CONTATO LIST] GET CONTATOS FAILED';

export const RELOAD_CONTATOS = '[CONTATO LIST] RELOAD CONTATOS';

export const DELETE_CONTATO = '[CONTATO LIST] DELETE CONTATO';
export const DELETE_CONTATO_SUCCESS = '[CONTATO LIST] DELETE CONTATO SUCCESS';
export const DELETE_CONTATO_FAILED = '[CONTATO LIST] DELETE CONTATO FAILED';

/**
 * Get Contato
 */
export class GetContato implements Action
{
    readonly type = GET_CONTATOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Contato Success
 */
export class GetContatoSuccess implements Action
{
    readonly type = GET_CONTATOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Contato Failed
 */
export class GetContatoFailed implements Action
{
    readonly type = GET_CONTATOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Contato
 */
export class ReloadContato implements Action
{
    readonly type = RELOAD_CONTATOS;

    constructor()
    {
    }
}

/**
 * Delete Contato
 */
export class DeleteContato implements Action
{
    readonly type = DELETE_CONTATO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Contato Success
 */
export class DeleteContatoSuccess implements Action
{
    readonly type = DELETE_CONTATO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Contato Failed
 */
export class DeleteContatoFailed implements Action
{
    readonly type = DELETE_CONTATO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ContatoListActionsAll
    = GetContato
    | GetContatoSuccess
    | GetContatoFailed
    | ReloadContato
    | DeleteContato
    | DeleteContatoSuccess
    | DeleteContatoFailed;

