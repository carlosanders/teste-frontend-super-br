import {Action} from '@ngrx/store';

export const CREATE_GRUPO_CONTATO = '[GRUPO CONTATO] CREATE GRUPO CONTATO';
export const CREATE_GRUPO_CONTATO_SUCCESS = '[GRUPO CONTATO] CREATE GRUPO CONTATO SUCCESS';

export const SAVE_GRUPO_CONTATO = '[GRUPO CONTATO] SAVE GRUPO CONTATO';
export const SAVE_GRUPO_CONTATO_SUCCESS = '[GRUPO CONTATO] SAVE GRUPO CONTATO SUCCESS';
export const SAVE_GRUPO_CONTATO_FAILED = '[GRUPO CONTATO] SAVE GRUPO CONTATO FAILED';

export const GET_GRUPO_CONTATO = '[GRUPO CONTATO] GET GRUPO CONTATO';
export const GET_GRUPO_CONTATO_SUCCESS = '[GRUPO CONTATO] GET GRUPO CONTATO SUCCESS';
export const GET_GRUPO_CONTATO_FAILED = '[GRUPO CONTATO] GET GRUPO CONTATO FAILED';

/**
 * Get GrupoContato
 */
export class GetGrupoContato implements Action
{
    readonly type = GET_GRUPO_CONTATO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get GrupoContato Success
 */
export class GetGrupoContatoSuccess implements Action
{
    readonly type = GET_GRUPO_CONTATO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get GrupoContato Failed
 */
export class GetGrupoContatoFailed implements Action
{
    readonly type = GET_GRUPO_CONTATO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save GrupoContato
 */
export class SaveGrupoContato implements Action
{
    readonly type = SAVE_GRUPO_CONTATO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save GrupoContato Success
 */
export class SaveGrupoContatoSuccess implements Action
{
    readonly type = SAVE_GRUPO_CONTATO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save GrupoContato Failed
 */
export class SaveGrupoContatoFailed implements Action
{
    readonly type = SAVE_GRUPO_CONTATO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create GrupoContato
 */
export class CreateGrupoContato implements Action
{
    readonly type = CREATE_GRUPO_CONTATO;

    constructor()
    {
    }
}

/**
 * Create GrupoContato Success
 */
export class CreateGrupoContatoSuccess implements Action
{
    readonly type = CREATE_GRUPO_CONTATO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type GrupoContatoEditActionsAll
    = CreateGrupoContato
    | CreateGrupoContatoSuccess
    | GetGrupoContato
    | GetGrupoContatoSuccess
    | GetGrupoContatoFailed
    | SaveGrupoContato
    | SaveGrupoContatoSuccess
    | SaveGrupoContatoFailed;
