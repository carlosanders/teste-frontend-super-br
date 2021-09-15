import {Action} from '@ngrx/store';

export const CREATE_ESPECIE_ATIVIDADE = '[ADMIN ESPECIE_ATIVIDADE EDIT] CREATE ESPECIE_ATIVIDADE';
export const CREATE_ESPECIE_ATIVIDADE_SUCCESS = '[ADMIN ESPECIE_ATIVIDADE EDIT] CREATE ESPECIE_ATIVIDADE SUCCESS';

export const SAVE_ESPECIE_ATIVIDADE = '[ADMIN ESPECIE_ATIVIDADE EDIT] SAVE ESPECIE_ATIVIDADE';
export const SAVE_ESPECIE_ATIVIDADE_SUCCESS = '[ADMIN ESPECIE_ATIVIDADE EDIT] SAVE ESPECIE_ATIVIDADE SUCCESS';
export const SAVE_ESPECIE_ATIVIDADE_FAILED = '[ADMIN ESPECIE_ATIVIDADE EDIT] SAVE ESPECIE_ATIVIDADE FAILED';

export const UPDATE_ESPECIE_ATIVIDADE = '[ADMIN ESPECIE_ATIVIDADE EDIT] UPDATE ESPECIE_ATIVIDADE';
export const UPDATE_ESPECIE_ATIVIDADE_SUCCESS = '[ADMIN ESPECIE_ATIVIDADE EDIT] UPDATE ESPECIE_ATIVIDADE SUCCESS';
export const UPDATE_ESPECIE_ATIVIDADE_FAILED = '[ADMIN ESPECIE_ATIVIDADE EDIT] UPDATE ESPECIE_ATIVIDADE FAILED';

export const GET_ESPECIE_ATIVIDADE = '[ADMIN ESPECIE_ATIVIDADE EDIT] GET ESPECIE_ATIVIDADE';
export const GET_ESPECIE_ATIVIDADE_SUCCESS = '[ADMIN ESPECIE_ATIVIDADE EDIT] GET ESPECIE_ATIVIDADE SUCCESS';
export const GET_ESPECIE_ATIVIDADE_FAILED = '[ADMIN ESPECIE_ATIVIDADE EDIT] GET ESPECIE_ATIVIDADE FAILED';

export const SAVE_COLABORADOR = '[ADMIN ESPECIE_ATIVIDADE EDIT] SAVE COLABORADOR';
export const SAVE_COLABORADOR_SUCCESS = '[ADMIN ESPECIE_ATIVIDADE EDIT] SAVE COLABORADOR SUCCESS';
export const SAVE_COLABORADOR_FAILED = '[ADMIN ESPECIE_ATIVIDADE EDIT] SAVE COLABORADOR FAILED';

/**
 * Get EspecieAtividade
 */
export class GetEspecieAtividade implements Action {
    readonly type = GET_ESPECIE_ATIVIDADE;

    constructor(public payload: any) {
    }
}

/**
 * Get EspecieAtividade Success
 */
export class GetEspecieAtividadeSuccess implements Action {
    readonly type = GET_ESPECIE_ATIVIDADE_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get EspecieAtividade Failed
 */
export class GetEspecieAtividadeFailed implements Action {
    readonly type = GET_ESPECIE_ATIVIDADE_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save EspecieAtividade
 */
export class SaveEspecieAtividade implements Action {
    readonly type = SAVE_ESPECIE_ATIVIDADE;

    constructor(public payload: any) {
    }
}

/**
 * Update EspecieAtividade
 */
export class UpdateEspecieAtividade implements Action {
    readonly type = UPDATE_ESPECIE_ATIVIDADE;

    constructor(public payload: any) {
    }
}

/**
 * Save EspecieAtividade Success
 */
export class SaveEspecieAtividadeSuccess implements Action {
    readonly type = SAVE_ESPECIE_ATIVIDADE_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save EspecieAtividade Failed
 */
export class SaveEspecieAtividadeFailed implements Action {
    readonly type = SAVE_ESPECIE_ATIVIDADE_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update EspecieAtividade Success
 */
export class UpdateEspecieAtividadeSuccess implements Action {
    readonly type = UPDATE_ESPECIE_ATIVIDADE_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update EspecieAtividade Failed
 */
export class UpdateEspecieAtividadeFailed implements Action {
    readonly type = UPDATE_ESPECIE_ATIVIDADE_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create EspecieAtividade
 */
export class CreateEspecieAtividade implements Action {
    readonly type = CREATE_ESPECIE_ATIVIDADE;

    constructor() {
    }
}

/**
 * Create EspecieAtividade Success
 */
export class CreateEspecieAtividadeSuccess implements Action {
    readonly type = CREATE_ESPECIE_ATIVIDADE_SUCCESS;

    constructor(public payload: any) {
    }
}


export type EspecieAtividadeEditActionsAll
    = CreateEspecieAtividade
    | CreateEspecieAtividadeSuccess
    | GetEspecieAtividade
    | GetEspecieAtividadeSuccess
    | GetEspecieAtividadeFailed
    | SaveEspecieAtividade
    | SaveEspecieAtividadeSuccess
    | SaveEspecieAtividadeFailed
    | UpdateEspecieAtividade
    | UpdateEspecieAtividadeSuccess
    | UpdateEspecieAtividadeFailed;
