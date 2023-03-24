import {Action} from '@ngrx/store';

export const CREATE_NAVIO = '[ADMIN NAVIO EDIT] CREATE NAVIO';
export const CREATE_NAVIO_SUCCESS = '[ADMIN NAVIO EDIT] CREATE NAVIO SUCCESS';

export const SAVE_NAVIO = '[ADMIN NAVIO EDIT] SAVE NAVIO';
export const SAVE_NAVIO_SUCCESS = '[ADMIN NAVIO EDIT] SAVE NAVIO SUCCESS';
export const SAVE_NAVIO_FAILED = '[ADMIN NAVIO EDIT] SAVE NAVIO FAILED';

export const UPDATE_NAVIO = '[ADMIN NAVIO EDIT] UPDATE NAVIO';
export const UPDATE_NAVIO_SUCCESS = '[ADMIN NAVIO EDIT] UPDATE NAVIO SUCCESS';
export const UPDATE_NAVIO_FAILED = '[ADMIN NAVIO EDIT] UPDATE NAVIO FAILED';

export const GET_NAVIO = '[ADMIN NAVIO EDIT] GET NAVIO';
export const GET_NAVIO_SUCCESS = '[ADMIN NAVIO EDIT] GET NAVIO SUCCESS';
export const GET_NAVIO_FAILED = '[ADMIN NAVIO EDIT] GET NAVIO FAILED';

/**
 * Get Navio
 */
export class GetNavio implements Action {
    readonly type = GET_NAVIO;

    constructor(public payload: any) {
    }
}

/**
 * Get Navio Success
 */
export class GetNavioSuccess implements Action {
    readonly type = GET_NAVIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Navio Failed
 */
export class GetNavioFailed implements Action {
    readonly type = GET_NAVIO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Navio
 */
export class SaveNavio implements Action {
    readonly type = SAVE_NAVIO;

    constructor(public payload: any) {
    }
}

/**
 * Update Navio
 */
export class UpdateNavio implements Action {
    readonly type = UPDATE_NAVIO;

    constructor(public payload: any) {
    }
}

/**
 * Save Navio Success
 */
export class SaveNavioSuccess implements Action {
    readonly type = SAVE_NAVIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Navio Failed
 */
export class SaveNavioFailed implements Action {
    readonly type = SAVE_NAVIO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update Navio Success
 */
export class UpdateNavioSuccess implements Action {
    readonly type = UPDATE_NAVIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update Navio Failed
 */
export class UpdateNavioFailed implements Action {
    readonly type = UPDATE_NAVIO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Navio
 */
export class CreateNavio implements Action {
    readonly type = CREATE_NAVIO;

    constructor() {
    }
}

/**
 * Create Navio Success
 */
export class CreateNavioSuccess implements Action {
    readonly type = CREATE_NAVIO_SUCCESS;

    constructor(public payload: any) {
    }
}


export type NavioEditActionsAll
    = CreateNavio
    | CreateNavioSuccess
    | GetNavio
    | GetNavioSuccess
    | GetNavioFailed
    | SaveNavio
    | SaveNavioSuccess
    | SaveNavioFailed
    | UpdateNavio
    | UpdateNavioSuccess
    | UpdateNavioFailed;
