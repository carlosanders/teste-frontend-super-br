import {Action} from '@ngrx/store';

export const CREATE_AVISO = '[ADMIN AVISO EDIT] CREATE AVISO';
export const CREATE_AVISO_SUCCESS = '[ADMIN AVISO EDIT] CREATE AVISO SUCCESS';

export const SAVE_AVISO = '[ADMIN AVISO EDIT] SAVE AVISO';
export const SAVE_AVISO_SUCCESS = '[ADMIN AVISO EDIT] SAVE AVISO SUCCESS';
export const SAVE_AVISO_FAILED = '[ADMIN AVISO EDIT] SAVE AVISO FAILED';

export const UPDATE_AVISO = '[ADMIN AVISO EDIT] UPDATE AVISO';
export const UPDATE_AVISO_SUCCESS = '[ADMIN AVISO EDIT] UPDATE AVISO SUCCESS';
export const UPDATE_AVISO_FAILED = '[ADMIN AVISO EDIT] UPDATE AVISO FAILED';

export const GET_AVISO = '[ADMIN AVISO EDIT] GET AVISO';
export const GET_AVISO_SUCCESS = '[ADMIN AVISO EDIT] GET AVISO SUCCESS';
export const GET_AVISO_FAILED = '[ADMIN AVISO EDIT] GET AVISO FAILED';

export const RELOAD_AVISO = '[ADMIN AVISO EDIT] RELOAD AVISO';

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
 * Save Aviso
 */
export class SaveAviso implements Action {
    readonly type = SAVE_AVISO;

    constructor(public payload: any) {
    }
}

/**
 * Update Aviso
 */
export class UpdateAviso implements Action {
    readonly type = UPDATE_AVISO;

    constructor(public payload: any) {
    }
}

/**
 * Save Aviso Success
 */
export class SaveAvisoSuccess implements Action {
    readonly type = SAVE_AVISO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Aviso Failed
 */
export class SaveAvisoFailed implements Action {
    readonly type = SAVE_AVISO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update Aviso Success
 */
export class UpdateAvisoSuccess implements Action {
    readonly type = UPDATE_AVISO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update Aviso Failed
 */
export class UpdateAvisoFailed implements Action {
    readonly type = UPDATE_AVISO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Aviso
 */
export class CreateAviso implements Action {
    readonly type = CREATE_AVISO;

    constructor() {
    }
}

/**
 * Create Aviso Success
 */
export class CreateAvisoSuccess implements Action {
    readonly type = CREATE_AVISO_SUCCESS;

    constructor(public payload: any) {
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
export type AvisoEditActionsAll
    = CreateAviso
    | CreateAvisoSuccess
    | GetAviso
    | GetAvisoSuccess
    | GetAvisoFailed
    | SaveAviso
    | SaveAvisoSuccess
    | SaveAvisoFailed
    | UpdateAviso
    | UpdateAvisoSuccess
    | UpdateAvisoFailed
    | ReloadAviso;
