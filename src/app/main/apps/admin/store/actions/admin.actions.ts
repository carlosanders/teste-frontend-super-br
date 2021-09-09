import {Action} from '@ngrx/store';

export const GET_ROLE = '[ADMIN] GET ROLE';

/**
 * Get Role
 */
export class GetRole implements Action {
    readonly type = GET_ROLE;

    constructor(public payload: any) {
    }
}

export type AdminActionsAll = GetRole;
