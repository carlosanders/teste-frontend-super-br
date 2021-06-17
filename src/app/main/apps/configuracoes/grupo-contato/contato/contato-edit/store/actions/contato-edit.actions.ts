import {Action} from '@ngrx/store';

export const CREATE_CONTATO = '[CONTATO] CREATE CONTATO';
export const CREATE_CONTATO_SUCCESS = '[CONTATO] CREATE CONTATO SUCCESS';

export const SAVE_CONTATO = '[CONTATO] SAVE CONTATO';
export const SAVE_CONTATO_SUCCESS = '[CONTATO] SAVE CONTATO SUCCESS';
export const SAVE_CONTATO_FAILED = '[CONTATO] SAVE CONTATO FAILED';

export const GET_CONTATO = '[CONTATO] GET CONTATO';
export const GET_CONTATO_SUCCESS = '[CONTATO] GET CONTATO SUCCESS';
export const GET_CONTATO_FAILED = '[CONTATO] GET CONTATO FAILED';

/**
 * Get Contato
 */
export class GetContato implements Action
{
    readonly type = GET_CONTATO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Contato Success
 */
export class GetContatoSuccess implements Action
{
    readonly type = GET_CONTATO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Contato Failed
 */
export class GetContatoFailed implements Action
{
    readonly type = GET_CONTATO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Contato
 */
export class SaveContato implements Action
{
    readonly type = SAVE_CONTATO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Contato Success
 */
export class SaveContatoSuccess implements Action
{
    readonly type = SAVE_CONTATO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Contato Failed
 */
export class SaveContatoFailed implements Action
{
    readonly type = SAVE_CONTATO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Contato
 */
export class CreateContato implements Action
{
    readonly type = CREATE_CONTATO;

    constructor()
    {
    }
}

/**
 * Create Contato Success
 */
export class CreateContatoSuccess implements Action
{
    readonly type = CREATE_CONTATO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type ContatoEditActionsAll
    = CreateContato
    | CreateContatoSuccess
    | GetContato
    | GetContatoSuccess
    | GetContatoFailed
    | SaveContato
    | SaveContatoSuccess
    | SaveContatoFailed;
