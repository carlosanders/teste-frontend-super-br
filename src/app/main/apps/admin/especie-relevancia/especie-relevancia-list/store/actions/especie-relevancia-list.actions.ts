import {Action} from '@ngrx/store';

export const GET_ESPECIE_RELEVANCIA = '[SUPERADMIN ESPECIE RELEVANCIA LIST] GET ESPECIE_RELEVANCIA';
export const GET_ESPECIE_RELEVANCIA_SUCCESS = '[SUPERADMIN ESPECIE RELEVANCIA LIST] GET ESPECIE_RELEVANCIA SUCCESS';
export const GET_ESPECIE_RELEVANCIA_FAILED = '[SUPERADMIN ESPECIE RELEVANCIA LIST] GET ESPECIE_RELEVANCIA FAILED';

export const RELOAD_ESPECIE_RELEVANCIA = '[SUPERADMIN ESPECIE RELEVANCIA LIST] RELOAD ESPECIE_RELEVANCIA';
export const UNLOAD_ESPECIE_RELEVANCIA = '[SUPERADMIN ESPECIE RELEVANCIA LIST] UNLOAD ESPECIE_RELEVANCIA';


/**
 * Get EspecieRelevancia
 */
export class GetEspecieRelevancia implements Action {
    readonly type = GET_ESPECIE_RELEVANCIA;

    constructor(public payload: any) {
    }
}

/**
 * Get EspecieRelevancia Success
 */
export class GetEspecieRelevanciaSuccess implements Action {
    readonly type = GET_ESPECIE_RELEVANCIA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get EspecieRelevancia Failed
 */
export class GetEspecieRelevanciaFailed implements Action {
    readonly type = GET_ESPECIE_RELEVANCIA_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload EspecieRelevancia
 */
export class UnloadEspecieRelevancia implements Action {
    readonly type = UNLOAD_ESPECIE_RELEVANCIA;

    constructor() {
    }
}

/**
 * Reload EspecieRelevancia
 */
export class ReloadEspecieRelevancia implements Action {
    readonly type = RELOAD_ESPECIE_RELEVANCIA;

    constructor() {
    }
}


export type EspecieRelevanciaListActionsAll
    = GetEspecieRelevancia
    | GetEspecieRelevanciaSuccess
    | GetEspecieRelevanciaFailed
    | UnloadEspecieRelevancia
    | ReloadEspecieRelevancia;

