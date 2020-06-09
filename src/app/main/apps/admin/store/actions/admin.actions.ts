import { Action } from '@ngrx/store';
import {GET_SETOR} from '../../../coordenador/store/actions';

export const GET_ROLE = '[ADMIN] GET ROLE';

/**
 * Get Role
 */
export class GetRole implements Action
{
    readonly type = GET_ROLE;

    constructor(public payload: any)
    {
    }
}

export type AdminActionsAll = GetRole;
