import {Action} from '@ngrx/store';

export const CREATE_MODALIDADE_ORGAO_CENTRAL = '[ADMIN MODALIDADE_ORGAO_CENTRAL EDIT] CREATE MODALIDADE_ORGAO_CENTRAL';
export const CREATE_MODALIDADE_ORGAO_CENTRAL_SUCCESS = '[ADMIN MODALIDADE_ORGAO_CENTRAL EDIT] CREATE MODALIDADE_ORGAO_CENTRAL SUCCESS';

export const SAVE_MODALIDADE_ORGAO_CENTRAL = '[ADMIN MODALIDADE_ORGAO_CENTRAL EDIT] SAVE MODALIDADE_ORGAO_CENTRAL';
export const SAVE_MODALIDADE_ORGAO_CENTRAL_SUCCESS = '[ADMIN MODALIDADE_ORGAO_CENTRAL EDIT] SAVE MODALIDADE_ORGAO_CENTRAL SUCCESS';
export const SAVE_MODALIDADE_ORGAO_CENTRAL_FAILED = '[ADMIN MODALIDADE_ORGAO_CENTRAL EDIT] SAVE MODALIDADE_ORGAO_CENTRAL FAILED';

export const UPDATE_MODALIDADE_ORGAO_CENTRAL = '[ADMIN MODALIDADE_ORGAO_CENTRAL EDIT] UPDATE MODALIDADE_ORGAO_CENTRAL';
export const UPDATE_MODALIDADE_ORGAO_CENTRAL_SUCCESS = '[ADMIN MODALIDADE_ORGAO_CENTRAL EDIT] UPDATE MODALIDADE_ORGAO_CENTRAL SUCCESS';
export const UPDATE_MODALIDADE_ORGAO_CENTRAL_FAILED = '[ADMIN MODALIDADE_ORGAO_CENTRAL EDIT] UPDATE MODALIDADE_ORGAO_CENTRAL FAILED';

export const GET_MODALIDADE_ORGAO_CENTRAL = '[ADMIN MODALIDADE_ORGAO_CENTRAL EDIT] GET MODALIDADE_ORGAO_CENTRAL';
export const GET_MODALIDADE_ORGAO_CENTRAL_SUCCESS = '[ADMIN MODALIDADE_ORGAO_CENTRAL EDIT] GET MODALIDADE_ORGAO_CENTRAL SUCCESS';
export const GET_MODALIDADE_ORGAO_CENTRAL_FAILED = '[ADMIN MODALIDADE_ORGAO_CENTRAL EDIT] GET MODALIDADE_ORGAO_CENTRAL FAILED';

export const SAVE_COLABORADOR = '[ADMIN MODALIDADE_ORGAO_CENTRAL EDIT] SAVE COLABORADOR';
export const SAVE_COLABORADOR_SUCCESS = '[ADMIN MODALIDADE_ORGAO_CENTRAL EDIT] SAVE COLABORADOR SUCCESS';
export const SAVE_COLABORADOR_FAILED = '[ADMIN MODALIDADE_ORGAO_CENTRAL EDIT] SAVE COLABORADOR FAILED';

/**
 * Get ModalidadeOrgaoCentral
 */
export class GetModalidadeOrgaoCentral implements Action {
    readonly type = GET_MODALIDADE_ORGAO_CENTRAL;

    constructor(public payload: any) {
    }
}

/**
 * Get ModalidadeOrgaoCentral Success
 */
export class GetModalidadeOrgaoCentralSuccess implements Action {
    readonly type = GET_MODALIDADE_ORGAO_CENTRAL_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get ModalidadeOrgaoCentral Failed
 */
export class GetModalidadeOrgaoCentralFailed implements Action {
    readonly type = GET_MODALIDADE_ORGAO_CENTRAL_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save ModalidadeOrgaoCentral
 */
export class SaveModalidadeOrgaoCentral implements Action {
    readonly type = SAVE_MODALIDADE_ORGAO_CENTRAL;

    constructor(public payload: any) {
    }
}

/**
 * Update ModalidadeOrgaoCentral
 */
export class UpdateModalidadeOrgaoCentral implements Action {
    readonly type = UPDATE_MODALIDADE_ORGAO_CENTRAL;

    constructor(public payload: any) {
    }
}

/**
 * Save ModalidadeOrgaoCentral Success
 */
export class SaveModalidadeOrgaoCentralSuccess implements Action {
    readonly type = SAVE_MODALIDADE_ORGAO_CENTRAL_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save ModalidadeOrgaoCentral Failed
 */
export class SaveModalidadeOrgaoCentralFailed implements Action {
    readonly type = SAVE_MODALIDADE_ORGAO_CENTRAL_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update ModalidadeOrgaoCentral Success
 */
export class UpdateModalidadeOrgaoCentralSuccess implements Action {
    readonly type = UPDATE_MODALIDADE_ORGAO_CENTRAL_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update ModalidadeOrgaoCentral Failed
 */
export class UpdateModalidadeOrgaoCentralFailed implements Action {
    readonly type = UPDATE_MODALIDADE_ORGAO_CENTRAL_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create ModalidadeOrgaoCentral
 */
export class CreateModalidadeOrgaoCentral implements Action {
    readonly type = CREATE_MODALIDADE_ORGAO_CENTRAL;

    constructor() {
    }
}

/**
 * Create ModalidadeOrgaoCentral Success
 */
export class CreateModalidadeOrgaoCentralSuccess implements Action {
    readonly type = CREATE_MODALIDADE_ORGAO_CENTRAL_SUCCESS;

    constructor(public payload: any) {
    }
}


export type ModalidadeOrgaoCentralEditActionsAll
    = CreateModalidadeOrgaoCentral
    | CreateModalidadeOrgaoCentralSuccess
    | GetModalidadeOrgaoCentral
    | GetModalidadeOrgaoCentralSuccess
    | GetModalidadeOrgaoCentralFailed
    | SaveModalidadeOrgaoCentral
    | SaveModalidadeOrgaoCentralSuccess
    | SaveModalidadeOrgaoCentralFailed
    | UpdateModalidadeOrgaoCentral
    | UpdateModalidadeOrgaoCentralSuccess
    | UpdateModalidadeOrgaoCentralFailed;
