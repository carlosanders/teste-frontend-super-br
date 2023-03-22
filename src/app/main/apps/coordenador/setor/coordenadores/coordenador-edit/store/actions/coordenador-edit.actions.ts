import {Action} from '@ngrx/store';

export const CREATE_COORDENADOR = '[ADMIN COORDENADOR EDIT] CREATE COORDENADOR';
export const CREATE_COORDENADOR_SUCCESS = '[ADMIN COORDENADOR EDIT] CREATE COORDENADOR SUCCESS';

export const SAVE_COORDENADOR = '[ADMIN COORDENADOR EDIT] SAVE COORDENADOR';
export const SAVE_COORDENADOR_SUCCESS = '[ADMIN COORDENADOR EDIT] SAVE COORDENADOR SUCCESS';
export const SAVE_COORDENADOR_FAILED = '[ADMIN COORDENADOR EDIT] SAVE COORDENADOR FAILED';

export const GET_COORDENADOR = '[ADMIN COORDENADOR EDIT] GET COORDENADOR';
export const GET_COORDENADOR_SUCCESS = '[ADMIN COORDENADOR EDIT] GET COORDENADOR SUCCESS';
export const GET_COORDENADOR_FAILED = '[ADMIN COORDENADOR EDIT] GET COORDENADOR FAILED';

/**
 * Get Coordenador
 */
export class GetCoordenador implements Action {
    readonly type = GET_COORDENADOR;

    constructor(public payload: any) {
    }
}

/**
 * Get Coordenador Success
 */
export class GetCoordenadorSuccess implements Action {
    readonly type = GET_COORDENADOR_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Coordenador Failed
 */
export class GetCoordenadorFailed implements Action {
    readonly type = GET_COORDENADOR_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Coordenador
 */
export class SaveCoordenador implements Action {
    readonly type = SAVE_COORDENADOR;

    constructor(public payload: any) {
    }
}

/**
 * Save Coordenador Success
 */
export class SaveCoordenadorSuccess implements Action {
    readonly type = SAVE_COORDENADOR_SUCCESS;

    constructor() {
    }
}

/**
 * Save Coordenador Failed
 */
export class SaveCoordenadorFailed implements Action {
    readonly type = SAVE_COORDENADOR_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Coordenador
 */
export class CreateCoordenador implements Action {
    readonly type = CREATE_COORDENADOR;

    constructor() {
    }
}

/**
 * Create Coordenador Success
 */
export class CreateCoordenadorSuccess implements Action {
    readonly type = CREATE_COORDENADOR_SUCCESS;

    constructor(public payload: any) {
    }
}

export type CoordenadorEditActionsAll
    = CreateCoordenador
    | CreateCoordenadorSuccess
    | GetCoordenador
    | GetCoordenadorSuccess
    | GetCoordenadorFailed
    | SaveCoordenador
    | SaveCoordenadorSuccess
    | SaveCoordenadorFailed;
