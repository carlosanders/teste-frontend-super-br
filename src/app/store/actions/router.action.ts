import {Action} from '@ngrx/store';
import {NavigationExtras} from '@angular/router';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const BACK_SUCCESS = '[Router] Back Success';
export const FORWARD = '[Router] Forward';

export class Go implements Action
{
    readonly type = GO;

    /**
     * Constructor
     *
     * @param payload
     */
    constructor(
        public payload: {
            path: any[];
            query?: object;
            extras?: NavigationExtras;
        }
    )
    {
    }
}

export class Back implements Action
{
    readonly type = BACK;
}

export class BackSuccess implements Action
{
    readonly type = BACK_SUCCESS;
}

export class Forward implements Action
{
    readonly type = FORWARD;
}

export type Actions = Go | Back | Forward | BackSuccess;
