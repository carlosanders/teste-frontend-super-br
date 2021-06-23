import {Action} from '@ngrx/store';

export const REGISTER = '[Register] Register save';
export const REGISTER_SUCCESS = '[Register] Register Success';
export const REGISTER_FAILED = '[Register] Register Failed';

export class Register implements Action {
    readonly type = REGISTER;
    constructor(public payload: any) {}
}

export class RegisterSuccess implements Action {
    readonly type = REGISTER_SUCCESS;
    constructor(public payload: any) {}
}

export class RegisterFailed implements Action {
    readonly type = REGISTER_FAILED;
    constructor(public payload: any) {}
}


export type RegisterActionsAll =
    | Register
    | RegisterSuccess
    | RegisterFailed;
