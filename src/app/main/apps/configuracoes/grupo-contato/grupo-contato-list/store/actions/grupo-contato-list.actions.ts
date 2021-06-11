import {Action} from '@ngrx/store';

export const GET_GRUPO_CONTATOS = '[GRUPO CONTATO LIST] GET GRUPO CONTATOS';
export const GET_GRUPO_CONTATOS_SUCCESS = '[GRUPO CONTATO LIST] GET GRUPO CONTATOS SUCCESS';
export const GET_GRUPO_CONTATOS_FAILED = '[GRUPO CONTATO LIST] GET GRUPO CONTATOS FAILED';

export const RELOAD_GRUPO_CONTATOS = '[GRUPO CONTATO LIST] RELOAD GRUPO CONTATOS';
export const UNLOAD_GRUPO_CONTATOS = '[GRUPO CONTATO LIST] UNLOAD GRUPO CONTATOS';


export const DELETE_GRUPO_CONTATO = '[GRUPO CONTATO LIST] DELETE GRUPO CONTATO';
export const DELETE_GRUPO_CONTATO_SUCCESS = '[GRUPO CONTATO LIST] DELETE GRUPO CONTATO SUCCESS';
export const DELETE_GRUPO_CONTATO_FAILED = '[GRUPO CONTATO LIST] DELETE GRUPO CONTATO FAILED';

/**
 * Get GrupoContato
 */
export class GetGrupoContato implements Action
{
    readonly type = GET_GRUPO_CONTATOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get GrupoContato Success
 */
export class GetGrupoContatoSuccess implements Action
{
    readonly type = GET_GRUPO_CONTATOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get GrupoContato Failed
 */
export class GetGrupoContatoFailed implements Action
{
    readonly type = GET_GRUPO_CONTATOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload GrupoContato
 */
 export class UnloadGrupoContato implements Action
 {
     readonly type = UNLOAD_GRUPO_CONTATOS;

     constructor()
     {
     }
 }

/**
 * Reload GrupoContato
 */
export class ReloadGrupoContato implements Action
{
    readonly type = RELOAD_GRUPO_CONTATOS;

    constructor()
    {
    }
}

/**
 * Delete GrupoContato
 */
export class DeleteGrupoContato implements Action
{
    readonly type = DELETE_GRUPO_CONTATO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete GrupoContato Success
 */
export class DeleteGrupoContatoSuccess implements Action
{
    readonly type = DELETE_GRUPO_CONTATO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete GrupoContato Failed
 */
export class DeleteGrupoContatoFailed implements Action
{
    readonly type = DELETE_GRUPO_CONTATO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type GrupoContatoListActionsAll
    = GetGrupoContato
    | GetGrupoContatoSuccess
    | GetGrupoContatoFailed
    | UnloadGrupoContato
    | ReloadGrupoContato
    | DeleteGrupoContato
    | DeleteGrupoContatoSuccess
    | DeleteGrupoContatoFailed;

