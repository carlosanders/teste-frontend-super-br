import {Action} from '@ngrx/store';

export const GET_CONTA_EMAIL = '[CAIXA EMAIL] GET CONTA E-MAIL';
export const GET_CONTA_EMAIL_SUCCESS = '[CAIXA EMAIL] GET CONTA E-MAIL SUCCESS';
export const GET_CONTA_EMAIL_FAILED = '[CAIXA EMAIL] GET CONTA E-MAIL FAILED';

export const SET_CONTA_EMAIL = '[CAIXA EMAIL] SET CONTA E-MAIL';
export const SET_ACTIVE_CARD = '[CAIXA EMAIL] SET ACTIVE CARD';

export const SAVE_EMAIL_PROCESSO_FORM = '[CAIXA EMAIL] SAVE E-MAIL PROCESSO FORM';
export const SAVE_EMAIL_PROCESSO_FORM_SUCCESS = '[CAIXA EMAIL] SAVE E-MAIL PROCESSO FORM SUCCESS';
export const SAVE_EMAIL_PROCESSO_FORM_FAILED = '[CAIXA EMAIL] SAVE E-MAIL PROCESSO FORM FAILED';

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

export class SaveEmailProcessoForm implements Action {
    readonly type = SAVE_EMAIL_PROCESSO_FORM;

    constructor(public payload: any) {
    }
}

export class SaveEmailProcessoFormSuccess implements Action {
    readonly type = SAVE_EMAIL_PROCESSO_FORM_SUCCESS;

    constructor(public payload: any) {
    }
}

export class SaveEmailProcessoFormFailed implements Action {
    readonly type = SAVE_EMAIL_PROCESSO_FORM_FAILED;

    constructor(public payload: any) {
    }
}

export class SetActiveCard implements Action {
    readonly type = SET_ACTIVE_CARD;

    constructor(public payload: any) {
    }
}

export type ContaEmailActionsAll
    = GetContaEmail
    | GetContaEmailSuccess
    | GetContaEmailFailed
    | SetContaEmail
    | SaveEmailProcessoForm
    | SaveEmailProcessoFormSuccess
    | SaveEmailProcessoFormFailed
    | SetActiveCard
    ;
