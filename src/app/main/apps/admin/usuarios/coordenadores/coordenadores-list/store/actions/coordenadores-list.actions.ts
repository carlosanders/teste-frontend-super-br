import {Action} from '@ngrx/store';

export const GET_COORDENADORES = '[ADMIN COORDENADORES LIST] GET COORDENADORES';
export const GET_COORDENADORES_SUCCESS = '[ADMIN COORDENADORES LIST] GET COORDENADORES SUCCESS';
export const GET_COORDENADORES_FAILED = '[ADMIN COORDENADORES LIST] GET COORDENADORES FAILED';

export const RELOAD_COORDENADORES = '[ADMIN COORDENADORES LIST] RELOAD COORDENADORES';

export const DELETE_COORDENADOR = '[ADMIN COORDENADORES LIST] DELETE COORDENADOR';
export const DELETE_COORDENADOR_SUCCESS = '[ADMIN COORDENADORES LIST] DELETE COORDENADOR SUCCESS';
export const DELETE_COORDENADOR_FAILED = '[ADMIN COORDENADORES LIST] DELETE COORDENADOR FAILED';

/**
 * Get Coordenador
 */
export class GetCoordenadores implements Action {
    readonly type = GET_COORDENADORES;

    constructor(public payload: any) {
    }
}

/**
 * Get Coordenador Success
 */
export class GetCoordenadoresSuccess implements Action {
    readonly type = GET_COORDENADORES_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Coordenadores Failed
 */
export class GetCoordenadoresFailed implements Action {
    readonly type = GET_COORDENADORES_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload Coordenadores
 */
export class ReloadCoordenadores implements Action {
    readonly type = RELOAD_COORDENADORES;

    constructor() {
    }
}

/**
 * Delete Coordenador
 */
export class DeleteCoordenador implements Action {
    readonly type = DELETE_COORDENADOR;

    constructor(public payload: any) {
    }
}

/**
 * Delete Coordenador Success
 */
export class DeleteCoordenadorSuccess implements Action {
    readonly type = DELETE_COORDENADOR_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Coordenador Failed
 */
export class DeleteCoordenadorFailed implements Action {
    readonly type = DELETE_COORDENADOR_FAILED;

    constructor(public payload: any) {
    }
}

export type CoordenadoresListActionsAll
    = GetCoordenadores
    | GetCoordenadoresSuccess
    | GetCoordenadoresFailed
    | ReloadCoordenadores
    | DeleteCoordenador
    | DeleteCoordenadorSuccess
    | DeleteCoordenadorFailed;

