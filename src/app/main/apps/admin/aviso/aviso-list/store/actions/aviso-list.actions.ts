import {Action} from '@ngrx/store';

export const GET_AVISO = '[ADMIN AVISO LIST] GET AVISO';
export const GET_AVISO_SUCCESS = '[ADMIN AVISO LIST] GET AVISO SUCCESS';
export const GET_AVISO_FAILED = '[ADMIN AVISO LIST] GET AVISO FAILED';

export const DELETE_AVISO = '[ADMIN AVISO LIST] DELETE AVISO';
export const DELETE_AVISO_SUCCESS = '[ADMIN AVISO LIST] DELETE AVISO SUCCESS';
export const DELETE_AVISO_FAILED = '[ADMIN AVISO LIST] DELETE AVISO FAILED';

export const RELOAD_AVISO = '[ADMIN AVISO LIST] RELOAD AVISO';
export const UNLOAD_AVISO = '[ADMIN AVISO LIST] UNLOAD AVISO';


/**
 * Get Aviso
 */
export class GetAviso implements Action {
    readonly type = GET_AVISO;

    constructor(public payload: any) {
    }
}

/**
 * Get Aviso Success
 */
export class GetAvisoSuccess implements Action {
    readonly type = GET_AVISO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Aviso Failed
 */
export class GetAvisoFailed implements Action {
    readonly type = GET_AVISO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Unload Aviso
 */
export class UnloadAviso implements Action {
    readonly type = UNLOAD_AVISO;

    constructor() {
    }
}

/**
 * Reload Aviso
 */
export class ReloadAviso implements Action {
    readonly type = RELOAD_AVISO;

    constructor() {
    }
}


/**
 * Delete Aviso
 */
export class DeleteAviso implements Action {
    readonly type = DELETE_AVISO;

    constructor(public payload: any) {
    }
}

/**
 * Delete Aviso Success
 */
export class DeleteAvisoSuccess implements Action {
    readonly type = DELETE_AVISO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Aviso Failed
 */
export class DeleteAvisoFailed implements Action {
    readonly type = DELETE_AVISO_FAILED;

    constructor(public payload: any) {
    }
}

export type AvisoListActionsAll
    = GetAviso
    | GetAvisoSuccess
    | GetAvisoFailed
    | UnloadAviso
    | ReloadAviso
    | DeleteAviso
    | DeleteAvisoSuccess
    | DeleteAvisoFailed;
