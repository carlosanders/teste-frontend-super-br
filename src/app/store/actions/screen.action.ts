import {Action} from '@ngrx/store';

export const SET_SCREEN = '[SCREEN] SET SCREEN';

/**
 * SetScreen
 */
export class SetScreen implements Action
{
    readonly type = SET_SCREEN;

    constructor(public payload: any)
    {
    }
}

export type ScreenActionsAll
    = SetScreen;
