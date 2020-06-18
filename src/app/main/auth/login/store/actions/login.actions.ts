import { Action } from '@ngrx/store';

export const LOGIN = '[Login] Login Attempt';
export const LOGIN_REFRESH_TOKEN = '[Login] LoginRefreshToken Attempt';
export const LOGOUT = '[Login] Logout';
export const UNLOAD = '[Login] Unload';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGIN_REFRESH_TOKEN_SUCCESS = '[Login] LoginRefreshToken Success';
export const LOGIN_REFRESH_TOKEN_FAILURE = '[Login] LoginRefreshToken Failure';
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

export class LoginRefreshToken implements Action {
    readonly type = LOGIN_REFRESH_TOKEN;
    constructor() {}
}

export class LoginRefreshTokenSuccess implements Action {
    readonly type = LOGIN_REFRESH_TOKEN_SUCCESS;
    constructor(public payload: any) {}
}

export class LoginRefreshTokenFailure implements Action {
    readonly type = LOGIN_REFRESH_TOKEN_FAILURE;
    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
    constructor(public payload: any) {}
}

export class Unload implements Action {
    readonly type = UNLOAD;
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
    | Unload
    | LoginSuccess
    | LoginFailure
    | LoginProfile
    | LoginProfileSuccess
    | LoginProfileFailure
    | LoginRefreshToken
    | LoginRefreshTokenSuccess
    | LoginRefreshTokenFailure;
