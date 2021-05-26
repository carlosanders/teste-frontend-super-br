import { Action } from '@ngrx/store';

export const GET_USUARIOS_EXTERNOS_LIST = '[SUPERADMIN USUARIOS EXTERNOS_LIST LIST] GET USUARIOS_EXTERNOS_LIST';
export const GET_USUARIOS_EXTERNOS_LIST_SUCCESS = '[SUPERADMIN USUARIOS EXTERNOS_LIST LIST] GET USUARIOS_EXTERNOS_LIST SUCCESS';
export const GET_USUARIOS_EXTERNOS_LIST_FAILED = '[SUPERADMIN USUARIOS EXTERNOS_LIST LIST] GET USUARIOS_EXTERNOS_LIST FAILED';

export const RELOAD_USUARIOS_EXTERNOS_LIST = '[SUPERADMIN USUARIOS EXTERNOS_LIST LIST] RELOAD USUARIOS_EXTERNOS_LIST';
export const UNLOAD_USUARIOS_EXTERNOS = '[SUPERADMIN USUARIOS EXTERNOS LIST] UNLOAD USUARIOS EXTERNOS';

export const DELETE_USUARIO_EXTERNOS_LIST = '[SUPERADMIN USUARIO EXTERNOS LIST] DELETE USUARIOS_EXTERNOS_LIST';
export const DELETE_USUARIO_EXTERNOS_LIST_SUCCESS = '[SUPERADMIN USUARIO EXTERNOS LIST] DELETE USUARIOS_EXTERNOS_LIST SUCCESS';
export const DELETE_USUARIO_EXTERNOS_LIST_FAILED = '[SUPERADMIN USUARIO EXTERNOS LIST] DELETE USUARIOS_EXTERNOS_LIST FAILED';


/**
 * Get UsuariosExternosList
 */
export class GetUsuariosExternosList implements Action
{
    readonly type = GET_USUARIOS_EXTERNOS_LIST;

    constructor(public payload: any)
    {
    }
}

/**
 * Get UsuariosExternosList Success
 */
export class GetUsuariosExternosListSuccess implements Action
{
    readonly type = GET_USUARIOS_EXTERNOS_LIST_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get UsuariosExternosList Failed
 */
export class GetUsuariosExternosListFailed implements Action
{
    readonly type = GET_USUARIOS_EXTERNOS_LIST_FAILED;

    constructor(public payload: string)
    {
    }
}


/**
 * Unload UsuariosExternos
 */
 export class UnloadUsuariosExternos implements Action
 {
     readonly type = UNLOAD_USUARIOS_EXTERNOS;

     constructor()
     {
     }
 }

/**
 * Reload UsuariosExternosList
 */
export class ReloadUsuariosExternosList implements Action
{
    readonly type = RELOAD_USUARIOS_EXTERNOS_LIST;

    constructor()
    {
    }
}


/**
 * Delete UsuariosExternosList
 */
export class DeleteUsuariosExternosList implements Action
{
    readonly type = DELETE_USUARIO_EXTERNOS_LIST;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete UsuariosExternosList Success
 */
export class DeleteUsuariosExternosListSuccess implements Action
{
    readonly type = DELETE_USUARIO_EXTERNOS_LIST_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete UsuariosExternosList Failed
 */
export class DeleteUsuariosExternosListFailed implements Action
{
    readonly type = DELETE_USUARIO_EXTERNOS_LIST_FAILED;

    constructor(public payload: any)
    {
    }
}


export type UsuariosExternosListActionsAll
    = GetUsuariosExternosList
    | GetUsuariosExternosListSuccess
    | GetUsuariosExternosListFailed
    | UnloadUsuariosExternos
    | ReloadUsuariosExternosList
    | DeleteUsuariosExternosList
    | DeleteUsuariosExternosListSuccess
    | DeleteUsuariosExternosListFailed;


