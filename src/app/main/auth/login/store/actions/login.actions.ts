import {Action} from '@ngrx/store';

export const LOGIN = '[Login] Login Attempt';
export const LOGIN_LDAP = '[Login] Login LDAP Attempt';
export const LOGIN_GOV_BR = '[Login] Login GovBR Attempt';
export const LOGIN_REFRESH_TOKEN = '[Login] LoginRefreshToken Attempt';
export const LOGOUT = '[Login] Logout';
export const UNLOAD = '[Login] Unload';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGIN_REFRESH_TOKEN_SUCCESS = '[Login] LoginRefreshToken Success';
export const LOGIN_REFRESH_TOKEN_FAILURE = '[Login] LoginRefreshToken Failure';
export const LOGIN_FAILURE = '[Login] Login Failure';
export const LOGIN_GOV_BR_FAILURE = '[Login] Login Gov Br Failure';
export const LOGIN_PROFILE = '[Login] Profile Attempt';
export const LOGIN_PROFILE_SUCCESS = '[Login] Profile Success';
export const LOGIN_PROFILE_FAILURE = '[Login] Profile Failure';
export const GET_CONFIG = '[Login] Get Config';
export const GET_CONFIG_SUCCESS = '[Login] Get Config Success';
export const GET_CONFIG_FAILURE = '[Login] Get Config Failure';
export const VERSION_CHANGED = '[Login] Version Changed';

export const PASSWORD_EXPIRED = '[Login] Password Expired';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: any) {}
}

export class LoginGovBR implements Action {
    readonly type = LOGIN_GOV_BR;
    constructor(public payload: any) {}
}

export class LoginLdap implements Action {
    readonly type = LOGIN_LDAP;
    constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: any) {}
}

export class LoginGovBrFailure implements Action {
    readonly type = LOGIN_GOV_BR_FAILURE;
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
    constructor(public payload: any) {}
}

export class LoginProfileSuccess implements Action {
    readonly type = LOGIN_PROFILE_SUCCESS;
    constructor(public payload: any) {}
}

export class LoginProfileFailure implements Action {
    readonly type = LOGIN_PROFILE_FAILURE;
    constructor(public payload: any) {}
}

export class GetConfig implements Action {
    readonly type = GET_CONFIG;
    constructor() {}
}

export class GetConfigSuccess implements Action {
    readonly type = GET_CONFIG_SUCCESS;
    constructor(public payload: any) {}
}

export class GetConfigFailure implements Action {
    readonly type = GET_CONFIG_FAILURE;
    constructor(public payload: any) {}
}

export class VersionChanged implements Action {
    readonly type = VERSION_CHANGED;
    constructor(public payload: any) {}
}

export class PasswordExpired implements Action {
    readonly type = PASSWORD_EXPIRED;
    constructor(public payload: any) {}
}

export type LoginActionsAll =
    Login
    | LoginLdap
    | LoginGovBR
    | Logout
    | Unload
    | LoginSuccess
    | LoginFailure
    | LoginGovBrFailure
    | LoginProfile
    | LoginProfileSuccess
    | LoginProfileFailure
    | LoginRefreshToken
    | LoginRefreshTokenSuccess
    | LoginRefreshTokenFailure
    | GetConfig
    | GetConfigSuccess
    | GetConfigFailure
    | VersionChanged
    | PasswordExpired
    ;
