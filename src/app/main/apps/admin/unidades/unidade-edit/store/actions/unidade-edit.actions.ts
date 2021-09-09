import {Action} from '@ngrx/store';

export const CREATE_UNIDADE = '[ADMIN UNIDADE EDIT] CREATE UNIDADE';
export const CREATE_UNIDADE_SUCCESS = '[ADMIN UNIDADE EDIT] CREATE UNIDADE SUCCESS';

export const SAVE_UNIDADE = '[ADMIN UNIDADE EDIT] SAVE UNIDADE';
export const SAVE_UNIDADE_SUCCESS = '[ADMIN UNIDADE EDIT] SAVE UNIDADE SUCCESS';
export const SAVE_UNIDADE_FAILED = '[ADMIN UNIDADE EDIT] SAVE UNIDADE FAILED';

export const GET_UNIDADE = '[ADMIN UNIDADE EDIT] GET UNIDADE';
export const GET_UNIDADE_SUCCESS = '[ADMIN UNIDADE EDIT] GET UNIDADE SUCCESS';
export const GET_UNIDADE_FAILED = '[ADMIN UNIDADE EDIT] GET UNIDADE FAILED';

/**
 * Get Setor
 */
export class GetUnidade implements Action {
    readonly type = GET_UNIDADE;

    constructor(public payload: any) {
    }
}

/**
 * Get Setor Success
 */
export class GetUnidadeSuccess implements Action {
    readonly type = GET_UNIDADE_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Setor Failed
 */
export class GetUnidadeFailed implements Action {
    readonly type = GET_UNIDADE_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Setor
 */
export class SaveUnidade implements Action {
    readonly type = SAVE_UNIDADE;

    constructor(public payload: any) {
    }
}

/**
 * Save Setor Success
 */
export class SaveUnidadeSuccess implements Action {
    readonly type = SAVE_UNIDADE_SUCCESS;

    constructor() {
    }
}

/**
 * Save Setor Failed
 */
export class SaveUnidadeFailed implements Action {
    readonly type = SAVE_UNIDADE_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Setor
 */
export class CreateUnidade implements Action {
    readonly type = CREATE_UNIDADE;

    constructor() {
    }
}

/**
 * Create Setor Success
 */
export class CreateUnidadeSuccess implements Action {
    readonly type = CREATE_UNIDADE_SUCCESS;

    constructor(public payload: any) {
    }
}

export type UnidadeEditActionsAll
    = CreateUnidade
    | CreateUnidadeSuccess
    | GetUnidade
    | GetUnidadeSuccess
    | GetUnidadeFailed
    | SaveUnidade
    | SaveUnidadeSuccess
    | SaveUnidadeFailed;
