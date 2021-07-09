import {Action} from '@ngrx/store';

export const MESSAGE = '[MERCURE] MESSAGE';

export const LIMPA_MERCURE = '[MERCURE] LIMPA MERCURE';

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

/**
 * Limpa Mercure
 */
export class LimpaMercure implements Action
{
    readonly type = LIMPA_MERCURE;

    constructor()
    {
    }
}

export type MercureActionsAll
    = Message
    | LimpaMercure;
