import {Action} from '@ngrx/store';

export const CREATE_CRONJOB = '[ADMIN CRONJOB EDIT] CREATE CRONJOB';
export const CREATE_CRONJOB_SUCCESS = '[ADMIN CRONJOB EDIT] CREATE CRONJOB SUCCESS';

export const SAVE_CRONJOB = '[ADMIN CRONJOB EDIT] SAVE CRONJOB';
export const SAVE_CRONJOB_SUCCESS = '[ADMIN CRONJOB EDIT] SAVE CRONJOB SUCCESS';
export const SAVE_CRONJOB_FAILED = '[ADMIN CRONJOB EDIT] SAVE CRONJOB FAILED';

export const UPDATE_CRONJOB = '[ADMIN CRONJOB EDIT] UPDATE CRONJOB';
export const UPDATE_CRONJOB_SUCCESS = '[ADMIN CRONJOB EDIT] UPDATE CRONJOB SUCCESS';
export const UPDATE_CRONJOB_FAILED = '[ADMIN CRONJOB EDIT] UPDATE CRONJOB FAILED';

export const GET_CRONJOB = '[ADMIN CRONJOB EDIT] GET CRONJOB';
export const GET_CRONJOB_SUCCESS = '[ADMIN CRONJOB EDIT] GET CRONJOB SUCCESS';
export const GET_CRONJOB_FAILED = '[ADMIN CRONJOB EDIT] GET CRONJOB FAILED';


/**
 * Get Cronjob
 */
export class GetCronjob implements Action {
    readonly type = GET_CRONJOB;

    constructor(public payload: any) {
    }
}

/**
 * Get Cronjob Success
 */
export class GetCronjobSuccess implements Action {
    readonly type = GET_CRONJOB_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Cronjob Failed
 */
export class GetCronjobFailed implements Action {
    readonly type = GET_CRONJOB_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Cronjob
 */
export class SaveCronjob implements Action {
    readonly type = SAVE_CRONJOB;

    constructor(public payload: any) {
    }
}

/**
 * Update Cronjob
 */
export class UpdateCronjob implements Action {
    readonly type = UPDATE_CRONJOB;

    constructor(public payload: any) {
    }
}

/**
 * Save Cronjob Success
 */
export class SaveCronjobSuccess implements Action {
    readonly type = SAVE_CRONJOB_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Cronjob Failed
 */
export class SaveCronjobFailed implements Action {
    readonly type = SAVE_CRONJOB_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update Cronjob Success
 */
export class UpdateCronjobSuccess implements Action {
    readonly type = UPDATE_CRONJOB_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update Cronjob Failed
 */
export class UpdateCronjobFailed implements Action {
    readonly type = UPDATE_CRONJOB_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Cronjob
 */
export class CreateCronjob implements Action {
    readonly type = CREATE_CRONJOB;

    constructor() {
    }
}

/**
 * Create Cronjob Success
 */
export class CreateCronjobSuccess implements Action {
    readonly type = CREATE_CRONJOB_SUCCESS;

    constructor(public payload: any) {
    }
}

export type CronjobEditActionsAll
    = CreateCronjob
    | CreateCronjobSuccess
    | GetCronjob
    | GetCronjobSuccess
    | GetCronjobFailed
    | SaveCronjob
    | SaveCronjobSuccess
    | SaveCronjobFailed
    | UpdateCronjob
    | UpdateCronjobSuccess
    | UpdateCronjobFailed;
