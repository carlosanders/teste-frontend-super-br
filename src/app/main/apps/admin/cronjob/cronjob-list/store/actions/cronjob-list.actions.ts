import {Action} from '@ngrx/store';

export const GET_CRONJOB = '[ADMIN CRONJOB LIST] GET CRONJOB';
export const GET_CRONJOB_SUCCESS = '[ADMIN CRONJOB LIST] GET CRONJOB SUCCESS';
export const GET_CRONJOB_FAILED = '[ADMIN CRONJOB LIST] GET CRONJOB FAILED';

export const RELOAD_CRONJOB = '[ADMIN CRONJOB LIST] RELOAD CRONJOB';
export const UNLOAD_CRONJOB = '[ADMIN CRONJOB LIST] UNLOAD CRONJOB';

export const DELETE_CRONJOB = '[ADMIN CRONJOB LIST] DELETE CRONJOB';
export const DELETE_CRONJOB_SUCCESS = '[ADMIN CRONJOB LIST] DELETE CRONJOB SUCCESS';
export const DELETE_CRONJOB_FAILED = '[ADMIN CRONJOB LIST] DELETE CRONJOB FAILED';

export const EXECUTE_CRONJOB = '[ADMIN CRONJOB LIST] EXECUTE CRONJOB';
export const EXECUTE_CRONJOB_SUCCESS = '[ADMIN CRONJOB LIST] EXECUTE CRONJOB SUCCESS';
export const EXECUTE_CRONJOB_FAILED = '[ADMIN CRONJOB LIST] EXECUTE CRONJOB FAILED';


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
 * Unload Cronjob
 */
export class UnloadCronjob implements Action {
    readonly type = UNLOAD_CRONJOB;

    constructor() {
    }
}

/**
 * Reload Cronjob
 */
export class ReloadCronjob implements Action {
    readonly type = RELOAD_CRONJOB;

    constructor() {
    }
}

/**
 * Delete Cronjob
 */
export class DeleteCronjob implements Action
{
    readonly type = DELETE_CRONJOB;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Cronjob Success
 */
export class DeleteCronjobSuccess implements Action
{
    readonly type = DELETE_CRONJOB_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Cronjob Failed
 */
export class DeleteCronjobFailed implements Action
{
    readonly type = DELETE_CRONJOB_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * ExecuteCronjob Cronjob
 */
export class ExecuteCronjob implements Action {
    readonly type = EXECUTE_CRONJOB;

    constructor(public payload: any) {
    }
}

/**
 * ExecuteCronjobSuccess Cronjob
 */
export class ExecuteCronjobSuccess implements Action {
    readonly type = EXECUTE_CRONJOB_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * ExecuteCronjobFailed Cronjob
 */
export class ExecuteCronjobFailed implements Action {
    readonly type = EXECUTE_CRONJOB_FAILED;

    constructor(public payload: any) {
    }
}

export type CronjobListActionsAll
    = GetCronjob
    | GetCronjobSuccess
    | GetCronjobFailed
    | UnloadCronjob
    | ReloadCronjob
    | DeleteCronjob
    | DeleteCronjobSuccess
    | DeleteCronjobFailed
    | ExecuteCronjob
    | ExecuteCronjobSuccess
    | ExecuteCronjobFailed;

