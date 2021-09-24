import {Action} from '@ngrx/store';

export const GET_LOCALIZADORES = '[ADMIN LOCALIZADORES LIST] GET LOCALIZADORES';
export const GET_LOCALIZADORES_SUCCESS = '[ADMIN LOCALIZADORES LIST] GET LOCALIZADORES SUCCESS';
export const GET_LOCALIZADORES_FAILED = '[ADMIN LOCALIZADORES LIST] GET LOCALIZADORES FAILED';

export const RELOAD_LOCALIZADORES = '[ADMIN LOCALIZADORES LIST] RELOAD LOCALIZADORES';

export const DELETE_LOCALIZADOR = '[ADMIN LOCALIZADORES LIST] DELETE LOCALIZADOR';
export const DELETE_LOCALIZADOR_SUCCESS = '[ADMIN LOCALIZADORES LIST] DELETE LOCALIZADOR SUCCESS';
export const DELETE_LOCALIZADOR_FAILED = '[ADMIN LOCALIZADORES LIST] DELETE LOCALIZADOR FAILED';

/**
 * Get Localizadores
 */
export class GetLocalizadores implements Action {
    readonly type = GET_LOCALIZADORES;

    constructor(public payload: any) {
    }
}

/**
 * Get Localizadores Success
 */
export class GetLocalizadoresSuccess implements Action {
    readonly type = GET_LOCALIZADORES_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Localizadores Failed
 */
export class GetLocalizadoresFailed implements Action {
    readonly type = GET_LOCALIZADORES_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload Localizadores
 */
export class ReloadLocalizadores implements Action {
    readonly type = RELOAD_LOCALIZADORES;

    constructor() {
    }
}

/**
 * Delete Localizador
 */
export class DeleteLocalizador implements Action {
    readonly type = DELETE_LOCALIZADOR;

    constructor(public payload: any) {
    }
}

/**
 * Delete Localizador Success
 */
export class DeleteLocalizadorSuccess implements Action {
    readonly type = DELETE_LOCALIZADOR_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Localizador Failed
 */
export class DeleteLocalizadorFailed implements Action {
    readonly type = DELETE_LOCALIZADOR_FAILED;

    constructor(public payload: any) {
    }
}

export type RootLocalizadoresListActionsAll
    = GetLocalizadores
    | GetLocalizadoresSuccess
    | GetLocalizadoresFailed
    | ReloadLocalizadores
    | DeleteLocalizador
    | DeleteLocalizadorSuccess
    | DeleteLocalizadorFailed;
