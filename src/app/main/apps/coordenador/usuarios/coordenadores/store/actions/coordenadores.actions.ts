import {Action} from '@ngrx/store';

export const GET_USUARIO = '[ADMIN COORDENADORES] GET USUARIO';
export const GET_USUARIO_SUCCESS = '[ADMIN COORDENADORES] GET USUARIO SUCCESS';
export const GET_USUARIO_FAILED = '[ADMIN COORDENADORES] GET USUARIO FAILED';

/**
 * Get Usuario
 */
export class GetUsuario implements Action {
    readonly type = GET_USUARIO;

    constructor(public payload: any) {
    }
}

/**
 * Get Usuario Success
 */
export class GetUsuarioSuccess implements Action {
    readonly type = GET_USUARIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Usuario Failed
 */
export class GetUsuarioFailed implements Action {
    readonly type = GET_USUARIO_FAILED;

    constructor(public payload: string) {
    }
}

export type CoordenadoresActionsAll
    = GetUsuario
    | GetUsuarioSuccess
    | GetUsuarioFailed;
