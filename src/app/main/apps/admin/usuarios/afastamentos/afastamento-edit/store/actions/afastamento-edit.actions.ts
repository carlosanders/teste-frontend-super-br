import {Action} from '@ngrx/store';

export const CREATE_AFASTAMENTO = '[ADMIN AFASTAMENTO EDIT] CREATE AFASTAMENTO';
export const CREATE_AFASTAMENTO_SUCCESS = '[ADMIN AFASTAMENTO EDIT] CREATE AFASTAMENTO SUCCESS';

export const SAVE_AFASTAMENTO = '[ADMIN AFASTAMENTO EDIT] SAVE AFASTAMENTO';
export const SAVE_AFASTAMENTO_SUCCESS = '[ADMIN AFASTAMENTO EDIT] SAVE AFASTAMENTO SUCCESS';
export const SAVE_AFASTAMENTO_FAILED = '[ADMIN AFASTAMENTO EDIT] SAVE AFASTAMENTO FAILED';

export const GET_AFASTAMENTO = '[ADMIN AFASTAMENTO EDIT] GET AFASTAMENTO';
export const GET_AFASTAMENTO_SUCCESS = '[ADMIN AFASTAMENTO EDIT] GET AFASTAMENTO SUCCESS';
export const GET_AFASTAMENTO_FAILED = '[ADMIN AFASTAMENTO EDIT] GET AFASTAMENTO FAILED';

/**
 * Get Afastamento
 */
export class GetAfastamento implements Action {
    readonly type = GET_AFASTAMENTO;

    constructor(public payload: any) {
    }
}

/**
 * Get Afastamento Success
 */
export class GetAfastamentoSuccess implements Action {
    readonly type = GET_AFASTAMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Afastamento Failed
 */
export class GetAfastamentoFailed implements Action {
    readonly type = GET_AFASTAMENTO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Afastamento
 */
export class SaveAfastamento implements Action {
    readonly type = SAVE_AFASTAMENTO;

    constructor(public payload: any) {
    }
}

/**
 * Save Afastamento Success
 */
export class SaveAfastamentoSuccess implements Action {
    readonly type = SAVE_AFASTAMENTO_SUCCESS;

    constructor() {
    }
}

/**
 * Save Afastamento Failed
 */
export class SaveAfastamentoFailed implements Action {
    readonly type = SAVE_AFASTAMENTO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Afastamento
 */
export class CreateAfastamento implements Action {
    readonly type = CREATE_AFASTAMENTO;

    constructor() {
    }
}

/**
 * Create Afastamento Success
 */
export class CreateAfastamentoSuccess implements Action {
    readonly type = CREATE_AFASTAMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

export type AfastamentoEditActionsAll
    = CreateAfastamento
    | CreateAfastamentoSuccess
    | GetAfastamento
    | GetAfastamentoSuccess
    | GetAfastamentoFailed
    | SaveAfastamento
    | SaveAfastamentoSuccess
    | SaveAfastamentoFailed;
