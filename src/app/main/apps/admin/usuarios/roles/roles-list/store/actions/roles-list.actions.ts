import {Action} from '@ngrx/store';

export const GET_ROLES = '[ADMIN ROLES LIST] GET ROLES';
export const GET_ROLES_SUCCESS = '[ADMIN ROLES LIST] GET ROLES SUCCESS';
export const GET_ROLES_FAILED = '[ADMIN ROLES LIST] GET ROLES FAILED';

export const RELOAD_ROLES = '[ADMIN ROLES LIST] RELOAD ROLES';

export const DELETE_ROLE = '[ADMIN ROLES LIST] DELETE ROLE';
export const DELETE_ROLE_SUCCESS = '[ADMIN ROLES LIST] DELETE ROLE SUCCESS';
export const DELETE_ROLE_FAILED = '[ADMIN ROLES LIST] DELETE ROLE FAILED';

/**
 * Get VinculacaoRole
 */
export class GetVinculacaoRoles implements Action {
    readonly type = GET_ROLES;

    constructor(public payload: any) {
    }
}

/**
 * Get VinculacaoRole Success
 */
export class GetVinculacaoRolesSuccess implements Action {
    readonly type = GET_ROLES_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get VinculacaoRoles Failed
 */
export class GetVinculacaoRolesFailed implements Action {
    readonly type = GET_ROLES_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload VinculacaoRoles
 */
export class ReloadVinculacaoRoles implements Action {
    readonly type = RELOAD_ROLES;

    constructor() {
    }
}

/**
 * Delete VinculacaoRole
 */
export class DeleteVinculacaoRole implements Action {
    readonly type = DELETE_ROLE;

    constructor(public payload: any) {
    }
}

/**
 * Delete VinculacaoRole Success
 */
export class DeleteVinculacaoRoleSuccess implements Action {
    readonly type = DELETE_ROLE_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete VinculacaoRole Failed
 */
export class DeleteVinculacaoRoleFailed implements Action {
    readonly type = DELETE_ROLE_FAILED;

    constructor(public payload: any) {
    }
}

export type VinculacaoRolesListActionsAll
    = GetVinculacaoRoles
    | GetVinculacaoRolesSuccess
    | GetVinculacaoRolesFailed
    | ReloadVinculacaoRoles
    | DeleteVinculacaoRole
    | DeleteVinculacaoRoleSuccess
    | DeleteVinculacaoRoleFailed;

