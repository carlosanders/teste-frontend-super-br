import { Action } from '@ngrx/store';

export const GET_USUARIOS_EXTERNOS = '[SUPERADMIN USUARIOS EXTERNOS LIST] GET USUARIOS_EXTERNOS';
export const GET_USUARIOS_EXTERNOS_SUCCESS = '[SUPERADMIN USUARIOS EXTERNOS LIST] GET USUARIOS_EXTERNOS SUCCESS';
export const GET_USUARIOS_EXTERNOS_FAILED = '[SUPERADMIN USUARIOS EXTERNOS LIST] GET USUARIOS_EXTERNOS FAILED';

export const RELOAD_USUARIOS_EXTERNOS = '[SUPERADMIN USUARIOS EXTERNOS LIST] RELOAD USUARIOS_EXTERNOS';


/**
 * Get UsuariosExternos
 */
export class GetUsuariosExternos implements Action
{
    readonly type = GET_USUARIOS_EXTERNOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get UsuariosExternos Success
 */
export class GetUsuariosExternosSuccess implements Action
{
    readonly type = GET_USUARIOS_EXTERNOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get UsuariosExternos Failed
 */
export class GetUsuariosExternosFailed implements Action
{
    readonly type = GET_USUARIOS_EXTERNOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload UsuariosExternos
 */
export class ReloadUsuariosExternos implements Action
{
    readonly type = RELOAD_USUARIOS_EXTERNOS;

    constructor()
    {
    }
}


export type UsuariosExternosListActionsAll
    = GetUsuariosExternos
    | GetUsuariosExternosSuccess
    | GetUsuariosExternosFailed
    | ReloadUsuariosExternos;

