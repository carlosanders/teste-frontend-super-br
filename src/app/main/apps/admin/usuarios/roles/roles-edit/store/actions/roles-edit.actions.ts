import {Action} from '@ngrx/store';

export const CREATE_ROLE = '[ADMIN ROLE EDIT] CREATE ROLE';
export const CREATE_ROLE_SUCCESS = '[ADMIN ROLE EDIT] CREATE ROLE SUCCESS';

export const SAVE_ROLE = '[ADMIN ROLE EDIT] SAVE ROLE';
export const SAVE_ROLE_SUCCESS = '[ADMIN ROLE EDIT] SAVE ROLE SUCCESS';
export const SAVE_ROLE_FAILED = '[ADMIN ROLE EDIT] SAVE ROLE FAILED';

export const GET_ROLE = '[ADMIN ROLE EDIT] GET ROLE';
export const GET_ROLE_SUCCESS = '[ADMIN ROLE EDIT] GET ROLE SUCCESS';
export const GET_ROLE_FAILED = '[ADMIN ROLE EDIT] GET ROLE FAILED';

/**
 * Get Role
 */
export class GetRole implements Action {
    readonly type = GET_ROLE;

    constructor(public payload: any) {
    }
}

/**
 * Get Role Success
 */
export class GetRoleSuccess implements Action {
    readonly type = GET_ROLE_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Role Failed
 */
export class GetRoleFailed implements Action {
    readonly type = GET_ROLE_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Role
 */
export class SaveRole implements Action {
    readonly type = SAVE_ROLE;

    constructor(public payload: any) {
    }
}

/**
 * Save Role Success
 */
export class SaveRoleSuccess implements Action {
    readonly type = SAVE_ROLE_SUCCESS;

    constructor() {
    }
}

/**
 * Save Role Failed
 */
export class SaveRoleFailed implements Action {
    readonly type = SAVE_ROLE_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Role
 */
export class CreateRole implements Action {
    readonly type = CREATE_ROLE;

    constructor() {
    }
}

/**
 * Create Role Success
 */
export class CreateRoleSuccess implements Action {
    readonly type = CREATE_ROLE_SUCCESS;

    constructor(public payload: any) {
    }
}

export type RoleEditActionsAll
    = CreateRole
    | CreateRoleSuccess
    | GetRole
    | GetRoleSuccess
    | GetRoleFailed
    | SaveRole
    | SaveRoleSuccess
    | SaveRoleFailed;
