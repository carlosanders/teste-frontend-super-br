import {Action} from '@ngrx/store';

export const CREATE_MUNICIPIO = '[ADMIN MUNICIPIO EDIT] CREATE MUNICIPIO';
export const CREATE_MUNICIPIO_SUCCESS = '[ADMIN MUNICIPIO EDIT] CREATE MUNICIPIO SUCCESS';

export const SAVE_MUNICIPIO = '[ADMIN MUNICIPIO EDIT] SAVE MUNICIPIO';
export const SAVE_MUNICIPIO_SUCCESS = '[ADMIN MUNICIPIO EDIT] SAVE MUNICIPIO SUCCESS';
export const SAVE_MUNICIPIO_FAILED = '[ADMIN MUNICIPIO EDIT] SAVE MUNICIPIO FAILED';

export const UPDATE_MUNICIPIO = '[ADMIN MUNICIPIO EDIT] UPDATE MUNICIPIO';
export const UPDATE_MUNICIPIO_SUCCESS = '[ADMIN MUNICIPIO EDIT] UPDATE MUNICIPIO SUCCESS';
export const UPDATE_MUNICIPIO_FAILED = '[ADMIN MUNICIPIO EDIT] UPDATE MUNICIPIO FAILED';

export const GET_MUNICIPIO = '[ADMIN MUNICIPIO EDIT] GET MUNICIPIO';
export const GET_MUNICIPIO_SUCCESS = '[ADMIN MUNICIPIO EDIT] GET MUNICIPIO SUCCESS';
export const GET_MUNICIPIO_FAILED = '[ADMIN MUNICIPIO EDIT] GET MUNICIPIO FAILED';

/**
 * Get Municipio
 */
export class GetMunicipio implements Action {
    readonly type = GET_MUNICIPIO;

    constructor(public payload: any) {
    }
}

/**
 * Get Municipio Success
 */
export class GetMunicipioSuccess implements Action {
    readonly type = GET_MUNICIPIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Municipio Failed
 */
export class GetMunicipioFailed implements Action {
    readonly type = GET_MUNICIPIO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Municipio
 */
export class SaveMunicipio implements Action {
    readonly type = SAVE_MUNICIPIO;

    constructor(public payload: any) {
    }
}

/**
 * Update Municipio
 */
export class UpdateMunicipio implements Action {
    readonly type = UPDATE_MUNICIPIO;

    constructor(public payload: any) {
    }
}

/**
 * Save Municipio Success
 */
export class SaveMunicipioSuccess implements Action {
    readonly type = SAVE_MUNICIPIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Municipio Failed
 */
export class SaveMunicipioFailed implements Action {
    readonly type = SAVE_MUNICIPIO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update Municipio Success
 */
export class UpdateMunicipioSuccess implements Action {
    readonly type = UPDATE_MUNICIPIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update Municipio Failed
 */
export class UpdateMunicipioFailed implements Action {
    readonly type = UPDATE_MUNICIPIO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Municipio
 */
export class CreateMunicipio implements Action {
    readonly type = CREATE_MUNICIPIO;

    constructor() {
    }
}

/**
 * Create Municipio Success
 */
export class CreateMunicipioSuccess implements Action {
    readonly type = CREATE_MUNICIPIO_SUCCESS;

    constructor(public payload: any) {
    }
}


export type MunicipioEditActionsAll
    = CreateMunicipio
    | CreateMunicipioSuccess
    | GetMunicipio
    | GetMunicipioSuccess
    | GetMunicipioFailed
    | SaveMunicipio
    | SaveMunicipioSuccess
    | SaveMunicipioFailed
    | UpdateMunicipio
    | UpdateMunicipioSuccess
    | UpdateMunicipioFailed;
