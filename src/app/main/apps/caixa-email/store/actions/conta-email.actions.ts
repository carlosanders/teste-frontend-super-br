import {Action} from '@ngrx/store';

export const GET_CONTA_EMAIL = '[CAIXA EMAIL] GET CONTA E-MAIL';
export const GET_CONTA_EMAIL_SUCCESS = '[CAIXA EMAIL] GET CONTA E-MAIL SUCCESS';
export const GET_CONTA_EMAIL_FAILED = '[CAIXA EMAIL] GET CONTA E-MAIL FAILED';

export const SET_CONTA_EMAIL = '[CAIXA EMAIL] SET CONTA E-MAIL';

export class GetContaEmail implements Action {
    readonly type = GET_CONTA_EMAIL;

    constructor(public payload: any) {
    }
}

export class GetContaEmailSuccess implements Action {
    readonly type = GET_CONTA_EMAIL_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetContaEmailFailed implements Action {
    readonly type = GET_CONTA_EMAIL_FAILED;

    constructor(public payload: any) {
    }
}

export class SetContaEmail implements Action {
    readonly type = SET_CONTA_EMAIL;

    constructor(public payload: any) {
    }
}

export type ContaEmailActionsAll
    = GetContaEmail
    | GetContaEmailSuccess
    | GetContaEmailFailed
    | SetContaEmail
    ;
