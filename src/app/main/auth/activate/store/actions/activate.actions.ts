import {Action} from '@ngrx/store';

export const ACTIVATE = '[Active] Activated';
export const ACTIVATE_SUCCESS = '[Active] Activated Success';
export const ACTIVATE_FAILED = '[Active] Activated Failed';

export class Activate implements Action {
    readonly type = ACTIVATE;
    constructor(public payload: any) {}
}

export class ActivateSuccess implements Action {
    readonly type = ACTIVATE_SUCCESS;
    constructor(public payload: any) {}
}

export class ActivateFailed implements Action {
    readonly type = ACTIVATE_FAILED;
    constructor(public payload: any) {}
}


export type ActivateActionsAll =
    | Activate
    | ActivateSuccess
    | ActivateFailed;
