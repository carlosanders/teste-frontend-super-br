import {Action} from '@ngrx/store';

export const GET_ASSUNTO_ADMINISTRATIVO = '[SUPERADMIN ASSUNTO ADMINISTRATIVO TREE LIST] GET ASSUNTO_ADMINISTRATIVO';
export const GET_ASSUNTO_ADMINISTRATIVO_SUCCESS = '[SUPERADMIN ASSUNTO ADMINISTRATIVO TREE LIST] GET ASSUNTO_ADMINISTRATIVO SUCCESS';
export const GET_ASSUNTO_ADMINISTRATIVO_FAILED = '[SUPERADMIN ASSUNTO ADMINISTRATIVO TREE LIST] GET ASSUNTO_ADMINISTRATIVO FAILED';

export const RELOAD_ASSUNTO_ADMINISTRATIVO = '[SUPERADMIN ASSUNTO ADMINISTRATIVO TREE LIST] RELOAD ASSUNTO_ADMINISTRATIVO';

export const SAVE_ASSUNTO_ADMINISTRATIVO = '[SUPERADMIN ASSUNTO ADMINISTRATIVO TREE LIST] SAVE ASSUNTO_ADMINISTRATIVO';
export const SAVE_ASSUNTO_ADMINISTRATIVO_SUCCESS = '[SUPERADMIN ASSUNTO ADMINISTRATIVO TREE LIST] SAVE ASSUNTO_ADMINISTRATIVO SUCCESS';
export const SAVE_ASSUNTO_ADMINISTRATIVO_FAILED = '[SUPERADMIN ASSUNTO ADMINISTRATIVO TREE LIST] SAVE ASSUNTO_ADMINISTRATIVO FAILED';

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
 * Reload AssuntoAdministrativo
 */
export class ReloadAssuntoAdministrativo implements Action {
    readonly type = RELOAD_ASSUNTO_ADMINISTRATIVO;

    constructor() {
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


export type AssuntoAdministrativoTreeListActionsAll
    = GetAssuntoAdministrativo
    | GetAssuntoAdministrativoSuccess
    | GetAssuntoAdministrativoFailed
    | ReloadAssuntoAdministrativo
    | SaveAssuntoAdministrativo
    | SaveAssuntoAdministrativoSuccess
    | SaveAssuntoAdministrativoFailed;
