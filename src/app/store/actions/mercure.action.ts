import {Action} from '@ngrx/store';

export const MESSAGE = '[MERCURE] MESSAGE';

/**
 * Message
 */
export class Message implements Action
{
    readonly type = MESSAGE;

    constructor(public payload: any)
    {
    }
}

export type MercureActionsAll
    = Message;
