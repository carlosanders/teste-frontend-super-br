import {Action} from '@ngrx/store';

export const SAVE_USUARIOS_EXTERNOS = '[ADMIN USUARIOS_EXTERNOS EDIT] SAVE USUARIOS_EXTERNOS';
export const SAVE_USUARIOS_EXTERNOS_SUCCESS = '[ADMIN USUARIOS_EXTERNOS EDIT] SAVE USUARIOS_EXTERNOS SUCCESS';
export const SAVE_USUARIOS_EXTERNOS_FAILED = '[ADMIN USUARIOS_EXTERNOS EDIT] SAVE USUARIOS_EXTERNOS FAILED';

export const UPDATE_USUARIOS_EXTERNOS = '[ADMIN USUARIOS_EXTERNOS EDIT] UPDATE USUARIOS_EXTERNOS';
export const UPDATE_USUARIOS_EXTERNOS_SUCCESS = '[ADMIN USUARIOS_EXTERNOS EDIT] UPDATE USUARIOS_EXTERNOS SUCCESS';
export const UPDATE_USUARIOS_EXTERNOS_FAILED = '[ADMIN USUARIOS_EXTERNOS EDIT] UPDATE USUARIOS_EXTERNOS FAILED';

export const GET_USUARIOS_EXTERNOS = '[ADMIN USUARIOS_EXTERNOS EDIT] GET USUARIOS_EXTERNOS';
export const GET_USUARIOS_EXTERNOS_SUCCESS = '[ADMIN USUARIOS_EXTERNOS EDIT] GET USUARIOS_EXTERNOS SUCCESS';
export const GET_USUARIOS_EXTERNOS_FAILED = '[ADMIN USUARIOS_EXTERNOS EDIT] GET USUARIOS_EXTERNOS FAILED';

/**
 * Get UsuarioExternos
 */
export class GetUsuarioExternos implements Action {
    readonly type = GET_USUARIOS_EXTERNOS;

    constructor(public payload: any) {
    }
}

/**
 * Get UsuarioExternos Success
 */
export class GetUsuarioExternosSuccess implements Action {
    readonly type = GET_USUARIOS_EXTERNOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get UsuarioExternos Failed
 */
export class GetUsuarioExternosFailed implements Action {
    readonly type = GET_USUARIOS_EXTERNOS_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save UsuarioExternos
 */
export class SaveUsuarioExternos implements Action {
    readonly type = SAVE_USUARIOS_EXTERNOS;

    constructor(public payload: any) {
    }
}

/**
 * Update UsuarioExternos
 */
export class UpdateUsuarioExternos implements Action {
    readonly type = UPDATE_USUARIOS_EXTERNOS;

    constructor(public payload: any) {
    }
}

/**
 * Save UsuarioExternos Success
 */
export class SaveUsuarioExternosSuccess implements Action {
    readonly type = SAVE_USUARIOS_EXTERNOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save UsuarioExternos Failed
 */
export class SaveUsuarioExternosFailed implements Action {
    readonly type = SAVE_USUARIOS_EXTERNOS_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update UsuarioExternos Success
 */
export class UpdateUsuarioExternosSuccess implements Action {
    readonly type = UPDATE_USUARIOS_EXTERNOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update UsuarioExternos Failed
 */
export class UpdateUsuarioExternosFailed implements Action {
    readonly type = UPDATE_USUARIOS_EXTERNOS_FAILED;

    constructor(public payload: any) {
    }
}

export type UsuarioExternosEditActionsAll
    = GetUsuarioExternos
    | GetUsuarioExternosSuccess
    | GetUsuarioExternosFailed
    | SaveUsuarioExternos
    | SaveUsuarioExternosSuccess
    | SaveUsuarioExternosFailed
    | UpdateUsuarioExternos
    | UpdateUsuarioExternosSuccess
    | UpdateUsuarioExternosFailed;
