import { Action } from '@ngrx/store';

export const LOGIN = '[Login] Login Attempt';
export const LOGOUT = '[Login] Logout';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGIN_FAILURE = '[Login] Login Failure';
export const LOGIN_PROFILE = '[Login] Profile Attempt';
export const LOGIN_PROFILE_SUCCESS = '[Login] Profile Success';
export const LOGIN_PROFILE_FAILURE = '[Login] Profile Failure';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: any) {}
}

export class LoginFailure implements Action {
    readonly type = LOGIN_FAILURE;
    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginProfile implements Action {
    readonly type = LOGIN_PROFILE;
    constructor() {}
}

export class LoginProfileSuccess implements Action {
    readonly type = LOGIN_PROFILE_SUCCESS;
    constructor(public payload: any) {}
}

export class LoginProfileFailure implements Action {
    readonly type = LOGIN_PROFILE_FAILURE;
    constructor(public payload: any) {}
}

export type LoginActionsAll =
    | Login
    | Logout
    | LoginSuccess
    | LoginFailure
    | LoginProfile
    | LoginProfileSuccess
    | LoginProfileFailure;
