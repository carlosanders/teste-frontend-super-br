import {Action} from '@ngrx/store';

export const SET_COUNT = '[COUNTER] SET COUNT';

/**
 * Set Count
 */
export class SetCount implements Action
{
    readonly type = SET_COUNT;

    constructor(public payload: any)
    {
    }
}

export type CounterActionsAll
    = SetCount;
