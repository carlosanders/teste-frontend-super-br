import {Action} from '@ngrx/store';

export const CREATE_ASSUNTO_ADMINISTRATIVO = '[ADMIN ASSUNTO_ADMINISTRATIVO EDIT] CREATE ASSUNTO_ADMINISTRATIVO';
export const CREATE_ASSUNTO_ADMINISTRATIVO_SUCCESS = '[ADMIN ASSUNTO_ADMINISTRATIVO EDIT] CREATE ASSUNTO_ADMINISTRATIVO SUCCESS';

export const SAVE_ASSUNTO_ADMINISTRATIVO = '[ADMIN ASSUNTO_ADMINISTRATIVO EDIT] SAVE ASSUNTO_ADMINISTRATIVO';
export const SAVE_ASSUNTO_ADMINISTRATIVO_SUCCESS = '[ADMIN ASSUNTO_ADMINISTRATIVO EDIT] SAVE ASSUNTO_ADMINISTRATIVO SUCCESS';
export const SAVE_ASSUNTO_ADMINISTRATIVO_FAILED = '[ADMIN ASSUNTO_ADMINISTRATIVO EDIT] SAVE ASSUNTO_ADMINISTRATIVO FAILED';

export const UPDATE_ASSUNTO_ADMINISTRATIVO = '[ADMIN ASSUNTO_ADMINISTRATIVO EDIT] UPDATE ASSUNTO_ADMINISTRATIVO';
export const UPDATE_ASSUNTO_ADMINISTRATIVO_SUCCESS = '[ADMIN ASSUNTO_ADMINISTRATIVO EDIT] UPDATE ASSUNTO_ADMINISTRATIVO SUCCESS';
export const UPDATE_ASSUNTO_ADMINISTRATIVO_FAILED = '[ADMIN ASSUNTO_ADMINISTRATIVO EDIT] UPDATE ASSUNTO_ADMINISTRATIVO FAILED';

export const GET_ASSUNTO_ADMINISTRATIVO = '[ADMIN ASSUNTO_ADMINISTRATIVO EDIT] GET ASSUNTO_ADMINISTRATIVO';
export const GET_ASSUNTO_ADMINISTRATIVO_SUCCESS = '[ADMIN ASSUNTO_ADMINISTRATIVO EDIT] GET ASSUNTO_ADMINISTRATIVO SUCCESS';
export const GET_ASSUNTO_ADMINISTRATIVO_FAILED = '[ADMIN ASSUNTO_ADMINISTRATIVO EDIT] GET ASSUNTO_ADMINISTRATIVO FAILED';


/**
 * Get AssuntoAdministrativo
 */
export class GetAssuntoAdministrativo implements Action {
    readonly type = GET_ASSUNTO_ADMINISTRATIVO;

    constructor(public payload: any) {
    }
}

/**
 * Get AssuntoAdministrativo Success
 */
export class GetAssuntoAdministrativoSuccess implements Action {
    readonly type = GET_ASSUNTO_ADMINISTRATIVO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get AssuntoAdministrativo Failed
 */
export class GetAssuntoAdministrativoFailed implements Action {
    readonly type = GET_ASSUNTO_ADMINISTRATIVO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save AssuntoAdministrativo
 */
export class SaveAssuntoAdministrativo implements Action {
    readonly type = SAVE_ASSUNTO_ADMINISTRATIVO;

    constructor(public payload: any) {
    }
}

/**
 * Update AssuntoAdministrativo
 */
export class UpdateAssuntoAdministrativo implements Action {
    readonly type = UPDATE_ASSUNTO_ADMINISTRATIVO;

    constructor(public payload: any) {
    }
}

/**
 * Save AssuntoAdministrativo Success
 */
export class SaveAssuntoAdministrativoSuccess implements Action {
    readonly type = SAVE_ASSUNTO_ADMINISTRATIVO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save AssuntoAdministrativo Failed
 */
export class SaveAssuntoAdministrativoFailed implements Action {
    readonly type = SAVE_ASSUNTO_ADMINISTRATIVO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update AssuntoAdministrativo Success
 */
export class UpdateAssuntoAdministrativoSuccess implements Action {
    readonly type = UPDATE_ASSUNTO_ADMINISTRATIVO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update AssuntoAdministrativo Failed
 */
export class UpdateAssuntoAdministrativoFailed implements Action {
    readonly type = UPDATE_ASSUNTO_ADMINISTRATIVO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create AssuntoAdministrativo
 */
export class CreateAssuntoAdministrativo implements Action {
    readonly type = CREATE_ASSUNTO_ADMINISTRATIVO;

    constructor() {
    }
}

/**
 * Create AssuntoAdministrativo Success
 */
export class CreateAssuntoAdministrativoSuccess implements Action {
    readonly type = CREATE_ASSUNTO_ADMINISTRATIVO_SUCCESS;

    constructor(public payload: any) {
    }
}

export type AssuntoAdministrativoEditActionsAll
    = CreateAssuntoAdministrativo
    | CreateAssuntoAdministrativoSuccess
    | GetAssuntoAdministrativo
    | GetAssuntoAdministrativoSuccess
    | GetAssuntoAdministrativoFailed
    | SaveAssuntoAdministrativo
    | SaveAssuntoAdministrativoSuccess
    | SaveAssuntoAdministrativoFailed
    | UpdateAssuntoAdministrativo
    | UpdateAssuntoAdministrativoSuccess
    | UpdateAssuntoAdministrativoFailed;
