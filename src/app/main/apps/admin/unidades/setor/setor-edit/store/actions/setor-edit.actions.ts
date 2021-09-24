import {Action} from '@ngrx/store';

export const CREATE_SETOR = '[ADMIN SETOR EDIT] CREATE SETOR';
export const CREATE_SETOR_SUCCESS = '[ADMIN SETOR EDIT] CREATE SETOR SUCCESS';

export const SAVE_SETOR = '[ADMIN SETOR EDIT] SAVE SETOR';
export const SAVE_SETOR_SUCCESS = '[ADMIN SETOR EDIT] SAVE SETOR SUCCESS';
export const SAVE_SETOR_FAILED = '[ADMIN SETOR EDIT] SAVE SETOR FAILED';

export const GET_SETOR = '[ADMIN SETOR EDIT] GET SETOR';
export const GET_SETOR_SUCCESS = '[ADMIN SETOR EDIT] GET SETOR SUCCESS';
export const GET_SETOR_FAILED = '[ADMIN SETOR EDIT] GET SETOR FAILED';

/**
 * Get Setor
 */
export class GetSetor implements Action {
    readonly type = GET_SETOR;

    constructor(public payload: any) {
    }
}

/**
 * Get Setor Success
 */
export class GetSetorSuccess implements Action {
    readonly type = GET_SETOR_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Setor Failed
 */
export class GetSetorFailed implements Action {
    readonly type = GET_SETOR_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Setor
 */
export class SaveSetor implements Action {
    readonly type = SAVE_SETOR;

    constructor(public payload: any) {
    }
}

/**
 * Save Setor Success
 */
export class SaveSetorSuccess implements Action {
    readonly type = SAVE_SETOR_SUCCESS;

    constructor() {
    }
}

/**
 * Save Setor Failed
 */
export class SaveSetorFailed implements Action {
    readonly type = SAVE_SETOR_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Setor
 */
export class CreateSetor implements Action {
    readonly type = CREATE_SETOR;

    constructor() {
    }
}

/**
 * Create Setor Success
 */
export class CreateSetorSuccess implements Action {
    readonly type = CREATE_SETOR_SUCCESS;

    constructor(public payload: any) {
    }
}

export type SetorEditActionsAll
    = CreateSetor
    | CreateSetorSuccess
    | GetSetor
    | GetSetorSuccess
    | GetSetorFailed
    | SaveSetor
    | SaveSetorSuccess
    | SaveSetorFailed;
