import {Action} from '@ngrx/store';

export const GET_ESPECIE_PROCESSO = '[SUPERADMIN ESPECIE PROCESSO LIST] GET ESPECIE_PROCESSO';
export const GET_ESPECIE_PROCESSO_SUCCESS = '[SUPERADMIN ESPECIE PROCESSO LIST] GET ESPECIE_PROCESSO SUCCESS';
export const GET_ESPECIE_PROCESSO_FAILED = '[SUPERADMIN ESPECIE PROCESSO LIST] GET ESPECIE_PROCESSO FAILED';

export const RELOAD_ESPECIE_PROCESSO = '[SUPERADMIN ESPECIE PROCESSO LIST] RELOAD ESPECIE_PROCESSO';
export const UNLOAD_ESPECIE_PROCESSO = '[SUPERADMIN ESPECIE PROCESSO LIST] UNLOAD ESPECIE_PROCESSO';


export const DELETE_ESPECIE_PROCESSO = '[SUPERADMIN ESPECIE PROCESSO LIST] DELETE ESPECIE_PROCESSO';
export const DELETE_ESPECIE_PROCESSO_SUCCESS = '[SUPERADMIN ESPECIE PROCESSO LIST] DELETE ESPECIE_PROCESSO SUCCESS';
export const DELETE_ESPECIE_PROCESSO_FAILED = '[SUPERADMIN ESPECIE PROCESSO LIST] DELETE ESPECIE_PROCESSO FAILED';

/**
 * Get EspecieProcesso
 */
export class GetEspecieProcesso implements Action {
    readonly type = GET_ESPECIE_PROCESSO;

    constructor(public payload: any) {
    }
}

/**
 * Get EspecieProcesso Success
 */
export class GetEspecieProcessoSuccess implements Action {
    readonly type = GET_ESPECIE_PROCESSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get EspecieProcesso Failed
 */
export class GetEspecieProcessoFailed implements Action {
    readonly type = GET_ESPECIE_PROCESSO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Unload EspecieProcesso
 */
export class UnloadEspecieProcesso implements Action {
    readonly type = UNLOAD_ESPECIE_PROCESSO;

    constructor() {
    }
}

/**
 * Reload EspecieProcesso
 */
export class ReloadEspecieProcesso implements Action {
    readonly type = RELOAD_ESPECIE_PROCESSO;

    constructor() {
    }
}

/**
 * Delete EspecieProcesso
 */
export class DeleteEspecieProcesso implements Action {
    readonly type = DELETE_ESPECIE_PROCESSO;

    constructor(public payload: any) {
    }
}

/**
 * Delete EspecieProcesso Success
 */
export class DeleteEspecieProcessoSuccess implements Action {
    readonly type = DELETE_ESPECIE_PROCESSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete EspecieProcesso Failed
 */
export class DeleteEspecieProcessoFailed implements Action {
    readonly type = DELETE_ESPECIE_PROCESSO_FAILED;

    constructor(public payload: any) {
    }
}

export type EspecieProcessoListActionsAll
    = GetEspecieProcesso
    | GetEspecieProcessoSuccess
    | GetEspecieProcessoFailed
    | UnloadEspecieProcesso
    | ReloadEspecieProcesso
    | DeleteEspecieProcesso
    | DeleteEspecieProcessoSuccess
    | DeleteEspecieProcessoFailed;

