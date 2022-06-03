import {Action} from '@ngrx/store';

export const UPDATE_PASSWORD = '[LOGIN UPDATE PASSWORD] UPDATE PASSWORD';
export const UPDATE_PASSWORD_SUCCESS = '[LOGIN UPDATE PASSWORD] UPDATE PASSWORD SUCCESS';
export const UPDATE_PASSWORD_FAILED = '[LOGIN UPDATE PASSWORD] UPDATE PASSWORD FAILED';
export const UNLOAD = '[LOGIN UPDATE PASSWORD] NULOAD';


export class UpdatePassword implements Action {
    readonly type = UPDATE_PASSWORD;
    constructor(public payload: any) {}
}

export class UpdatePasswordSuccess implements Action {
    readonly type = UPDATE_PASSWORD_SUCCESS;
    constructor(public payload: any) {}
}

export class UpdatePasswordFailed implements Action {
    readonly type = UPDATE_PASSWORD_FAILED;
    constructor(public payload: any) {}
}

export class Unload implements Action {
    readonly type = UNLOAD;
    constructor() {}
}

export type UpdatePasswordActionsAll =
    | UpdatePassword
    | UpdatePasswordSuccess
    | UpdatePasswordFailed
    | Unload
    ;
