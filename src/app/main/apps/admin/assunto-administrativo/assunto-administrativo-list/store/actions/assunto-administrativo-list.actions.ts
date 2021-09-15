import {Action} from '@ngrx/store';

export const GET_ASSUNTO_ADMINISTRATIVO = '[SUPERADMIN ASSUNTO ADMINISTRATIVO LIST] GET ASSUNTO_ADMINISTRATIVO';
export const GET_ASSUNTO_ADMINISTRATIVO_SUCCESS = '[SUPERADMIN ASSUNTO ADMINISTRATIVO LIST] GET ASSUNTO_ADMINISTRATIVO SUCCESS';
export const GET_ASSUNTO_ADMINISTRATIVO_FAILED = '[SUPERADMIN ASSUNTO ADMINISTRATIVO LIST] GET ASSUNTO_ADMINISTRATIVO FAILED';

export const RELOAD_ASSUNTO_ADMINISTRATIVO = '[SUPERADMIN ASSUNTO ADMINISTRATIVO LIST] RELOAD ASSUNTO_ADMINISTRATIVO';
export const UNLOAD_ASSUNTO_ADMINISTRATIVO = '[SUPERADMIN ASSUNTO ADMINISTRATIVO LIST] UNLOAD ASSUNTO_ADMINISTRATIVO';


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
 * Unload AssuntoAdministrativo
 */
export class UnloadAssuntoAdministrativo implements Action {
    readonly type = UNLOAD_ASSUNTO_ADMINISTRATIVO;

    constructor() {
    }
}

/**
 * Reload AssuntoAdministrativo
 */
export class ReloadAssuntoAdministrativo implements Action {
    readonly type = RELOAD_ASSUNTO_ADMINISTRATIVO;

    constructor() {
    }
}

export type AssuntoAdministrativoListActionsAll
    = GetAssuntoAdministrativo
    | GetAssuntoAdministrativoSuccess
    | GetAssuntoAdministrativoFailed
    | UnloadAssuntoAdministrativo
    | ReloadAssuntoAdministrativo;
