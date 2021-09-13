import {Action} from '@ngrx/store';

export const GET_SETOR = '[ADMIN LOTACOES] GET SETOR';
export const GET_SETOR_SUCCESS = '[ADMIN LOTACOES] GET SETOR SUCCESS';
export const GET_SETOR_FAILED = '[ADMIN LOTACOES] GET SETOR FAILED';

export const GET_USUARIO = '[ADMIN LOTACOES] GET USUARIO';
export const GET_USUARIO_SUCCESS = '[ADMIN LOTACOES] GET USUARIO SUCCESS';
export const GET_USUARIO_FAILED = '[ADMIN LOTACOES] GET USUARIO FAILED';

export const UNLOAD_USUARIO = '[ADMIN LOTACOES] UNLOAD USUARIO';
export const UNLOAD_SETOR = '[ADMIN LOTACOES] UNLOAD SETOR';

/**
 * Get Setor
 */
export class GetSetor implements Action {
    readonly type = GET_SETOR;

    constructor(public payload: any) {
    }
}

/**
 * Get Setor Success
 */
export class GetSetorSuccess implements Action {
    readonly type = GET_SETOR_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Setor Failed
 */
export class GetSetorFailed implements Action {
    readonly type = GET_SETOR_FAILED;

    constructor(public payload: string) {
    }
}

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

/**
 * Unload Usuario
 */
export class UnloadUsuario implements Action {
    readonly type = UNLOAD_USUARIO;

    constructor() {
    }
}

/**
 * Unload Setor
 */
export class UnloadSetor implements Action {
    readonly type = UNLOAD_SETOR;

    constructor() {
    }
}

export type RootLotacoesActionsAll
    = GetSetor
    | GetSetorSuccess
    | GetSetorFailed
    | GetUsuario
    | GetUsuarioSuccess
    | GetUsuarioFailed
    | UnloadUsuario
    | UnloadSetor;
