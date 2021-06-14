import {Action} from '@ngrx/store';

export const ADD_TOPICO = '[AJUDA] ADD TOPICO';

/**
 * Add Topico
 */
export class AddTopico implements Action
{
    readonly type = ADD_TOPICO;

    constructor(public payload: any)
    {
    }
}

export type AjudaActionsAll
    = AddTopico;
