import {Action} from '@ngrx/store';

export const GET_MUNICIPIO = '[ADMIN MUNICIPIO LIST] GET MUNICIPIO';
export const GET_MUNICIPIO_SUCCESS = '[ADMIN MUNICIPIO LIST] GET MUNICIPIO SUCCESS';
export const GET_MUNICIPIO_FAILED = '[ADMIN MUNICIPIO LIST] GET MUNICIPIO FAILED';

export const RELOAD_MUNICIPIO = '[ADMIN MUNICIPIO LIST] RELOAD MUNICIPIO';
export const UNLOAD_MUNICIPIO = '[ADMIN MUNICIPIO LIST] UNLOAD MUNICIPIO';


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
 * Unload Municipio
 */
export class UnloadMunicipio implements Action {
    readonly type = UNLOAD_MUNICIPIO;

    constructor() {
    }
}

/**
 * Reload Municipio
 */
export class ReloadMunicipio implements Action {
    readonly type = RELOAD_MUNICIPIO;

    constructor() {
    }
}


export type MunicipioListActionsAll
    = GetMunicipio
    | GetMunicipioSuccess
    | GetMunicipioFailed
    | UnloadMunicipio
    | ReloadMunicipio;

