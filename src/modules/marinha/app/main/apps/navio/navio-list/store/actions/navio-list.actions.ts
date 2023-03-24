import {Action} from '@ngrx/store';

export const GET_NAVIO = '[ADMIN NAVIO LIST] GET NAVIO';
export const GET_NAVIO_SUCCESS = '[ADMIN NAVIO LIST] GET NAVIO SUCCESS';
export const GET_NAVIO_FAILED = '[ADMIN NAVIO LIST] GET NAVIO FAILED';

export const RELOAD_NAVIO = '[ADMIN NAVIO LIST] RELOAD NAVIO';
export const UNLOAD_NAVIO = '[ADMIN NAVIO LIST] UNLOAD NAVIO';


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
 * Unload Navio
 */
export class UnloadNavio implements Action {
    readonly type = UNLOAD_NAVIO;

    constructor() {
    }
}

/**
 * Reload Navio
 */
export class ReloadNavio implements Action {
    readonly type = RELOAD_NAVIO;

    constructor() {
    }
}


export type NavioListActionsAll
    = GetNavio
    | GetNavioSuccess
    | GetNavioFailed
    | UnloadNavio
    | ReloadNavio;

