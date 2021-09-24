import {Action} from '@ngrx/store';

export const CREATE_CARGO = '[ADMIN CARGO EDIT] CREATE CARGO';
export const CREATE_CARGO_SUCCESS = '[ADMIN CARGO EDIT] CREATE CARGO SUCCESS';

export const SAVE_CARGO = '[ADMIN CARGO EDIT] SAVE CARGO';
export const SAVE_CARGO_SUCCESS = '[ADMIN CARGO EDIT] SAVE CARGO SUCCESS';
export const SAVE_CARGO_FAILED = '[ADMIN CARGO EDIT] SAVE CARGO FAILED';

export const UPDATE_CARGO = '[ADMIN CARGO EDIT] UPDATE CARGO';
export const UPDATE_CARGO_SUCCESS = '[ADMIN CARGO EDIT] UPDATE CARGO SUCCESS';
export const UPDATE_CARGO_FAILED = '[ADMIN CARGO EDIT] UPDATE CARGO FAILED';

export const GET_CARGO = '[ADMIN CARGO EDIT] GET CARGO';
export const GET_CARGO_SUCCESS = '[ADMIN CARGO EDIT] GET CARGO SUCCESS';
export const GET_CARGO_FAILED = '[ADMIN CARGO EDIT] GET CARGO FAILED';

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
 * Save Cargo
 */
export class SaveCargo implements Action {
    readonly type = SAVE_CARGO;

    constructor(public payload: any) {
    }
}

/**
 * Update Cargo
 */
export class UpdateCargo implements Action {
    readonly type = UPDATE_CARGO;

    constructor(public payload: any) {
    }
}

/**
 * Save Cargo Success
 */
export class SaveCargoSuccess implements Action {
    readonly type = SAVE_CARGO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Cargo Failed
 */
export class SaveCargoFailed implements Action {
    readonly type = SAVE_CARGO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update Cargo Success
 */
export class UpdateCargoSuccess implements Action {
    readonly type = UPDATE_CARGO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update Cargo Failed
 */
export class UpdateCargoFailed implements Action {
    readonly type = UPDATE_CARGO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Cargo
 */
export class CreateCargo implements Action {
    readonly type = CREATE_CARGO;

    constructor() {
    }
}

/**
 * Create Cargo Success
 */
export class CreateCargoSuccess implements Action {
    readonly type = CREATE_CARGO_SUCCESS;

    constructor(public payload: any) {
    }
}


export type CargoEditActionsAll
    = CreateCargo
    | CreateCargoSuccess
    | GetCargo
    | GetCargoSuccess
    | GetCargoFailed
    | SaveCargo
    | SaveCargoSuccess
    | SaveCargoFailed
    | UpdateCargo
    | UpdateCargoSuccess
    | UpdateCargoFailed;
