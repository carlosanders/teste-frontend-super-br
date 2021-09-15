import {Action} from '@ngrx/store';

export const CREATE_ESPECIE_RELEVANCIA = '[ADMIN ESPECIE_RELEVANCIA EDIT] CREATE ESPECIE_RELEVANCIA';
export const CREATE_ESPECIE_RELEVANCIA_SUCCESS = '[ADMIN ESPECIE_RELEVANCIA EDIT] CREATE ESPECIE_RELEVANCIA SUCCESS';

export const SAVE_ESPECIE_RELEVANCIA = '[ADMIN ESPECIE_RELEVANCIA EDIT] SAVE ESPECIE_RELEVANCIA';
export const SAVE_ESPECIE_RELEVANCIA_SUCCESS = '[ADMIN ESPECIE_RELEVANCIA EDIT] SAVE ESPECIE_RELEVANCIA SUCCESS';
export const SAVE_ESPECIE_RELEVANCIA_FAILED = '[ADMIN ESPECIE_RELEVANCIA EDIT] SAVE ESPECIE_RELEVANCIA FAILED';

export const UPDATE_ESPECIE_RELEVANCIA = '[ADMIN ESPECIE_RELEVANCIA EDIT] UPDATE ESPECIE_RELEVANCIA';
export const UPDATE_ESPECIE_RELEVANCIA_SUCCESS = '[ADMIN ESPECIE_RELEVANCIA EDIT] UPDATE ESPECIE_RELEVANCIA SUCCESS';
export const UPDATE_ESPECIE_RELEVANCIA_FAILED = '[ADMIN ESPECIE_RELEVANCIA EDIT] UPDATE ESPECIE_RELEVANCIA FAILED';

export const GET_ESPECIE_RELEVANCIA = '[ADMIN ESPECIE_RELEVANCIA EDIT] GET ESPECIE_RELEVANCIA';
export const GET_ESPECIE_RELEVANCIA_SUCCESS = '[ADMIN ESPECIE_RELEVANCIA EDIT] GET ESPECIE_RELEVANCIA SUCCESS';
export const GET_ESPECIE_RELEVANCIA_FAILED = '[ADMIN ESPECIE_RELEVANCIA EDIT] GET ESPECIE_RELEVANCIA FAILED';


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
 * Save EspecieRelevancia
 */
export class SaveEspecieRelevancia implements Action {
    readonly type = SAVE_ESPECIE_RELEVANCIA;

    constructor(public payload: any) {
    }
}

/**
 * Update EspecieRelevancia
 */
export class UpdateEspecieRelevancia implements Action {
    readonly type = UPDATE_ESPECIE_RELEVANCIA;

    constructor(public payload: any) {
    }
}

/**
 * Save EspecieRelevancia Success
 */
export class SaveEspecieRelevanciaSuccess implements Action {
    readonly type = SAVE_ESPECIE_RELEVANCIA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save EspecieRelevancia Failed
 */
export class SaveEspecieRelevanciaFailed implements Action {
    readonly type = SAVE_ESPECIE_RELEVANCIA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update EspecieRelevancia Success
 */
export class UpdateEspecieRelevanciaSuccess implements Action {
    readonly type = UPDATE_ESPECIE_RELEVANCIA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update EspecieRelevancia Failed
 */
export class UpdateEspecieRelevanciaFailed implements Action {
    readonly type = UPDATE_ESPECIE_RELEVANCIA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create EspecieRelevancia
 */
export class CreateEspecieRelevancia implements Action {
    readonly type = CREATE_ESPECIE_RELEVANCIA;

    constructor() {
    }
}

/**
 * Create EspecieRelevancia Success
 */
export class CreateEspecieRelevanciaSuccess implements Action {
    readonly type = CREATE_ESPECIE_RELEVANCIA_SUCCESS;

    constructor(public payload: any) {
    }
}


export type EspecieRelevanciaEditActionsAll
    = CreateEspecieRelevancia
    | CreateEspecieRelevanciaSuccess
    | GetEspecieRelevancia
    | GetEspecieRelevanciaSuccess
    | GetEspecieRelevanciaFailed
    | SaveEspecieRelevancia
    | SaveEspecieRelevanciaSuccess
    | SaveEspecieRelevanciaFailed
    | UpdateEspecieRelevancia
    | UpdateEspecieRelevanciaSuccess
    | UpdateEspecieRelevanciaFailed;
