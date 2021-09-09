import {Action} from '@ngrx/store';

export const CREATE_USUARIO = '[COORDENADOR USUARIO EDIT] CREATE USUARIO';
export const CREATE_USUARIO_SUCCESS = '[COORDENADOR USUARIO EDIT] CREATE USUARIO SUCCESS';

export const SAVE_USUARIO = '[COORDENADOR USUARIO EDIT] SAVE USUARIO';
export const SAVE_USUARIO_SUCCESS = '[COORDENADOR USUARIO EDIT] SAVE USUARIO SUCCESS';
export const SAVE_USUARIO_FAILED = '[COORDENADOR USUARIO EDIT] SAVE USUARIO FAILED';

export const UPDATE_USUARIO = '[COORDENADOR USUARIO EDIT] UPDATE USUARIO';
export const UPDATE_USUARIO_SUCCESS = '[COORDENADOR USUARIO EDIT] UPDATE USUARIO SUCCESS';
export const UPDATE_USUARIO_FAILED = '[COORDENADOR USUARIO EDIT] UPDATE USUARIO FAILED';

export const GET_USUARIO = '[COORDENADOR USUARIO EDIT] GET USUARIO';
export const GET_USUARIO_SUCCESS = '[COORDENADOR USUARIO EDIT] GET USUARIO SUCCESS';
export const GET_USUARIO_FAILED = '[COORDENADOR USUARIO EDIT] GET USUARIO FAILED';

export const NEXT_STEP_COLABORADOR_SUCCESS = '[COORDENADOR USUARIO EDIT] NEXT_STEP COLABORADOR_SUCCESS';
export const SAVE_COLABORADOR = '[COORDENADOR USUARIO EDIT] SAVE COLABORADOR';
export const SAVE_COLABORADOR_SUCCESS = '[COORDENADOR USUARIO EDIT] SAVE COLABORADOR SUCCESS';
export const SAVE_COLABORADOR_FAILED = '[COORDENADOR USUARIO EDIT] SAVE COLABORADOR FAILED';

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
 * Save Usuario
 */
export class SaveUsuario implements Action {
    readonly type = SAVE_USUARIO;

    constructor(public payload: any) {
    }
}

/**
 * Update Usuario
 */
export class UpdateUsuario implements Action {
    readonly type = UPDATE_USUARIO;

    constructor(public payload: any) {
    }
}

/**
 * Save Usuario Success
 */
export class SaveUsuarioSuccess implements Action {
    readonly type = SAVE_USUARIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Usuario Failed
 */
export class SaveUsuarioFailed implements Action {
    readonly type = SAVE_USUARIO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update Usuario Success
 */
export class UpdateUsuarioSuccess implements Action {
    readonly type = UPDATE_USUARIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update Usuario Failed
 */
export class UpdateUsuarioFailed implements Action {
    readonly type = UPDATE_USUARIO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Usuario
 */
export class CreateUsuario implements Action {
    readonly type = CREATE_USUARIO;

    constructor() {
    }
}

/**
 * Create Usuario Success
 */
export class CreateUsuarioSuccess implements Action {
    readonly type = CREATE_USUARIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Next Step Colaborador
 */
export class NextStepColaboradorSuccess implements Action {
    readonly type = NEXT_STEP_COLABORADOR_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Colaborador
 */
export class SaveColaborador implements Action {
    readonly type = SAVE_COLABORADOR;

    constructor(public payload: any) {
    }
}

/**
 * Save Colaborador Success
 */
export class SaveColaboradorSuccess implements Action {
    readonly type = SAVE_COLABORADOR_SUCCESS;

    constructor() {
    }
}

/**
 * Save Colaborador Failed
 */
export class SaveColaboradorFailed implements Action {
    readonly type = SAVE_COLABORADOR_FAILED;

    constructor(public payload: any) {
    }
}

export type UsuarioEditActionsAll
    = CreateUsuario
    | CreateUsuarioSuccess
    | GetUsuario
    | GetUsuarioSuccess
    | GetUsuarioFailed
    | SaveUsuario
    | SaveUsuarioSuccess
    | SaveUsuarioFailed
    | UpdateUsuario
    | UpdateUsuarioSuccess
    | UpdateUsuarioFailed
    | NextStepColaboradorSuccess
    | SaveColaborador
    | SaveColaboradorSuccess
    | SaveColaboradorFailed;
