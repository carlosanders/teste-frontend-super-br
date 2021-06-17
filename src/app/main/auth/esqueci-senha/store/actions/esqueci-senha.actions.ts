import {Action} from '@ngrx/store';

export const ESQUECI_SENHA = '[ESQUECI-SENHA] Esqueci Senha Attempt';
export const ESQUECI_SENHA_SUCCESS = '[ESQUECI-SENHA] Esqueci Senha Success';
export const ESQUECI_SENHA_FAILURE = '[ESQUECI-SENHA] Esqueci Senha Failure';

export const UNLOAD = '[ESQUECI-SENHA] Unload';

export class EsqueciSenha implements Action {
    readonly type = ESQUECI_SENHA;
    constructor(public payload: any) {}
}

export class EsqueciSenhaSuccess implements Action {
    readonly type = ESQUECI_SENHA_SUCCESS;
    constructor(public payload: any) {}
}

export class EsqueciSenhaFailure implements Action {
    readonly type = ESQUECI_SENHA_FAILURE;
    constructor(public payload: any) {}
}

export class Unload implements Action {
    readonly type = UNLOAD;
}

export type EsqueciSenhaActionsAll =
    | EsqueciSenha
    | EsqueciSenhaSuccess
    | EsqueciSenhaFailure
    | Unload;
