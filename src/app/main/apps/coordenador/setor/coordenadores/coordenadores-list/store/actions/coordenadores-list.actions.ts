import {Action} from '@ngrx/store';

export const GET_COORDENADORES_SETOR = '[COORDENADOR COORDENADORES SETOR LIST] GET COORDENADORES SETOR';
export const GET_COORDENADORES_SETOR_SUCCESS = '[COORDENADOR COORDENADORES SETOR LIST] GET COORDENADORES SETOR SUCCESS';
export const GET_COORDENADORES_SETOR_FAILED = '[COORDENADOR COORDENADORES SETOR LIST] GET COORDENADORES SETOR FAILED';

export const RELOAD_COORDENADORES = '[COORDENADOR COORDENADORES LIST] RELOAD COORDENADORES';

/**
 * Get Coordenador
 */
export class GetCoordenadores implements Action {
    readonly type = GET_COORDENADORES_SETOR;

    constructor(public payload: any) {
    }
}

/**
 * Get Coordenador Success
 */
export class GetCoordenadoresSuccess implements Action {
    readonly type = GET_COORDENADORES_SETOR_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Coordenadores Failed
 */
export class GetCoordenadoresFailed implements Action {
    readonly type = GET_COORDENADORES_SETOR_FAILED;

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







export type CoordenadoresListActionsAll
    = GetCoordenadores
    | GetCoordenadoresSuccess
    | GetCoordenadoresFailed
    | ReloadCoordenadores;

