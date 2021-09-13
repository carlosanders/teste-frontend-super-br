import {Action} from '@ngrx/store';

export const GET_AFASTAMENTOS = '[ADMIN AFASTAMENTOS LIST] GET AFASTAMENTOS';
export const GET_AFASTAMENTOS_SUCCESS = '[ADMIN AFASTAMENTOS LIST] GET AFASTAMENTOS SUCCESS';
export const GET_AFASTAMENTOS_FAILED = '[ADMIN AFASTAMENTOS LIST] GET AFASTAMENTOS FAILED';

export const RELOAD_AFASTAMENTOS = '[ADMIN AFASTAMENTOS LIST] RELOAD AFASTAMENTOS';

export const DELETE_AFASTAMENTO = '[ADMIN AFASTAMENTOS LIST] DELETE AFASTAMENTO';
export const DELETE_AFASTAMENTO_SUCCESS = '[ADMIN AFASTAMENTOS LIST] DELETE AFASTAMENTO SUCCESS';
export const DELETE_AFASTAMENTO_FAILED = '[ADMIN AFASTAMENTOS LIST] DELETE AFASTAMENTO FAILED';

/**
 * Get Afastamento
 */
export class GetAfastamentos implements Action {
    readonly type = GET_AFASTAMENTOS;

    constructor(public payload: any) {
    }
}

/**
 * Get Afastamento Success
 */
export class GetAfastamentosSuccess implements Action {
    readonly type = GET_AFASTAMENTOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Afastamentos Failed
 */
export class GetAfastamentosFailed implements Action {
    readonly type = GET_AFASTAMENTOS_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload Afastamentos
 */
export class ReloadAfastamentos implements Action {
    readonly type = RELOAD_AFASTAMENTOS;

    constructor() {
    }
}

/**
 * Delete Afastamento
 */
export class DeleteAfastamento implements Action {
    readonly type = DELETE_AFASTAMENTO;

    constructor(public payload: any) {
    }
}

/**
 * Delete Afastamento Success
 */
export class DeleteAfastamentoSuccess implements Action {
    readonly type = DELETE_AFASTAMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Afastamento Failed
 */
export class DeleteAfastamentoFailed implements Action {
    readonly type = DELETE_AFASTAMENTO_FAILED;

    constructor(public payload: any) {
    }
}

export type AfastamentosListActionsAll
    = GetAfastamentos
    | GetAfastamentosSuccess
    | GetAfastamentosFailed
    | ReloadAfastamentos
    | DeleteAfastamento
    | DeleteAfastamentoSuccess
    | DeleteAfastamentoFailed;

