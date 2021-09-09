import {Action} from '@ngrx/store';

export const GET_ESPECIE_SETOR = '[SUPERADMIN ESPECIE SETOR LIST] GET ESPECIE_SETOR';
export const GET_ESPECIE_SETOR_SUCCESS = '[SUPERADMIN ESPECIE SETOR LIST] GET ESPECIE_SETOR SUCCESS';
export const GET_ESPECIE_SETOR_FAILED = '[SUPERADMIN ESPECIE SETOR LIST] GET ESPECIE_SETOR FAILED';

export const RELOAD_ESPECIE_SETOR = '[SUPERADMIN ESPECIE SETOR LIST] RELOAD ESPECIE_SETOR';
export const UNLOAD_ESPECIE_SETOR = '[SUPERADMIN ESPECIE SETOR LIST] UNLOAD ESPECIE_SETOR';


export const DELETE_ESPECIE_SETOR = '[SUPERADMIN ESPECIE SETOR LIST] DELETE ESPECIE_SETOR';
export const DELETE_ESPECIE_SETOR_SUCCESS = '[SUPERADMIN ESPECIE SETOR LIST] DELETE ESPECIE_SETOR SUCCESS';
export const DELETE_ESPECIE_SETOR_FAILED = '[SUPERADMIN ESPECIE SETOR LIST] DELETE ESPECIE_SETOR FAILED';

/**
 * Get EspecieSetor
 */
export class GetEspecieSetor implements Action {
    readonly type = GET_ESPECIE_SETOR;

    constructor(public payload: any) {
    }
}

/**
 * Get EspecieSetor Success
 */
export class GetEspecieSetorSuccess implements Action {
    readonly type = GET_ESPECIE_SETOR_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get EspecieSetor Failed
 */
export class GetEspecieSetorFailed implements Action {
    readonly type = GET_ESPECIE_SETOR_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Unload EspecieSetor
 */
export class UnloadEspecieSetor implements Action {
    readonly type = UNLOAD_ESPECIE_SETOR;

    constructor() {
    }
}

/**
 * Reload EspecieSetor
 */
export class ReloadEspecieSetor implements Action {
    readonly type = RELOAD_ESPECIE_SETOR;

    constructor() {
    }
}

/**
 * Delete EspecieSetor
 */
export class DeleteEspecieSetor implements Action {
    readonly type = DELETE_ESPECIE_SETOR;

    constructor(public payload: any) {
    }
}

/**
 * Delete EspecieSetor Success
 */
export class DeleteEspecieSetorSuccess implements Action {
    readonly type = DELETE_ESPECIE_SETOR_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete EspecieSetor Failed
 */
export class DeleteEspecieSetorFailed implements Action {
    readonly type = DELETE_ESPECIE_SETOR_FAILED;

    constructor(public payload: any) {
    }
}

export type EspecieSetorListActionsAll
    = GetEspecieSetor
    | GetEspecieSetorSuccess
    | GetEspecieSetorFailed
    | ReloadEspecieSetor
    | UnloadEspecieSetor
    | DeleteEspecieSetor
    | DeleteEspecieSetorSuccess
    | DeleteEspecieSetorFailed;

