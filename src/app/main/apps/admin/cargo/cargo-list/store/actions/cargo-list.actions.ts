import {Action} from '@ngrx/store';

export const GET_CARGO = '[ADMIN CARGO LIST] GET CARGO';
export const GET_CARGO_SUCCESS = '[ADMIN CARGO LIST] GET CARGO SUCCESS';
export const GET_CARGO_FAILED = '[ADMIN CARGO LIST] GET CARGO FAILED';

export const RELOAD_CARGO = '[ADMIN CARGO LIST] RELOAD CARGO';
export const UNLOAD_CARGO = '[ADMIN CARGO LIST] UNLOAD CARGO';


/**
 * Get Cargo
 */
export class GetCargo implements Action {
    readonly type = GET_CARGO;

    constructor(public payload: any) {
    }
}

/**
 * Get Cargo Success
 */
export class GetCargoSuccess implements Action {
    readonly type = GET_CARGO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Cargo Failed
 */
export class GetCargoFailed implements Action {
    readonly type = GET_CARGO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Unload Cargo
 */
export class UnloadCargo implements Action {
    readonly type = UNLOAD_CARGO;

    constructor() {
    }
}

/**
 * Reload Cargo
 */
export class ReloadCargo implements Action {
    readonly type = RELOAD_CARGO;

    constructor() {
    }
}


export type CargoListActionsAll
    = GetCargo
    | GetCargoSuccess
    | GetCargoFailed
    | UnloadCargo
    | ReloadCargo;

