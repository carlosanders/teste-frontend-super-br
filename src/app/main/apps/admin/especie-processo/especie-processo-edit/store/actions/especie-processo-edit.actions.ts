import {Action} from '@ngrx/store';

export const CREATE_ESPECIE_PROCESSO = '[ADMIN ESPECIE_PROCESSO EDIT] CREATE ESPECIE_PROCESSO';
export const CREATE_ESPECIE_PROCESSO_SUCCESS = '[ADMIN ESPECIE_PROCESSO EDIT] CREATE ESPECIE_PROCESSO SUCCESS';

export const SAVE_ESPECIE_PROCESSO = '[ADMIN ESPECIE_PROCESSO EDIT] SAVE ESPECIE_PROCESSO';
export const SAVE_ESPECIE_PROCESSO_SUCCESS = '[ADMIN ESPECIE_PROCESSO EDIT] SAVE ESPECIE_PROCESSO SUCCESS';
export const SAVE_ESPECIE_PROCESSO_FAILED = '[ADMIN ESPECIE_PROCESSO EDIT] SAVE ESPECIE_PROCESSO FAILED';

export const UPDATE_ESPECIE_PROCESSO = '[ADMIN ESPECIE_PROCESSO EDIT] UPDATE ESPECIE_PROCESSO';
export const UPDATE_ESPECIE_PROCESSO_SUCCESS = '[ADMIN ESPECIE_PROCESSO EDIT] UPDATE ESPECIE_PROCESSO SUCCESS';
export const UPDATE_ESPECIE_PROCESSO_FAILED = '[ADMIN ESPECIE_PROCESSO EDIT] UPDATE ESPECIE_PROCESSO FAILED';

export const GET_ESPECIE_PROCESSO = '[ADMIN ESPECIE_PROCESSO EDIT] GET ESPECIE_PROCESSO';
export const GET_ESPECIE_PROCESSO_SUCCESS = '[ADMIN ESPECIE_PROCESSO EDIT] GET ESPECIE_PROCESSO SUCCESS';
export const GET_ESPECIE_PROCESSO_FAILED = '[ADMIN ESPECIE_PROCESSO EDIT] GET ESPECIE_PROCESSO FAILED';

export const SAVE_COLABORADOR = '[ADMIN ESPECIE_PROCESSO EDIT] SAVE COLABORADOR';
export const SAVE_COLABORADOR_SUCCESS = '[ADMIN ESPECIE_PROCESSO EDIT] SAVE COLABORADOR SUCCESS';
export const SAVE_COLABORADOR_FAILED = '[ADMIN ESPECIE_PROCESSO EDIT] SAVE COLABORADOR FAILED';

/**
 * Get EspecieProcesso
 */
export class GetEspecieProcesso implements Action {
    readonly type = GET_ESPECIE_PROCESSO;

    constructor(public payload: any) {
    }
}

/**
 * Get EspecieProcesso Success
 */
export class GetEspecieProcessoSuccess implements Action {
    readonly type = GET_ESPECIE_PROCESSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get EspecieProcesso Failed
 */
export class GetEspecieProcessoFailed implements Action {
    readonly type = GET_ESPECIE_PROCESSO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save EspecieProcesso
 */
export class SaveEspecieProcesso implements Action {
    readonly type = SAVE_ESPECIE_PROCESSO;

    constructor(public payload: any) {
    }
}

/**
 * Update EspecieProcesso
 */
export class UpdateEspecieProcesso implements Action {
    readonly type = UPDATE_ESPECIE_PROCESSO;

    constructor(public payload: any) {
    }
}

/**
 * Save EspecieProcesso Success
 */
export class SaveEspecieProcessoSuccess implements Action {
    readonly type = SAVE_ESPECIE_PROCESSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save EspecieProcesso Failed
 */
export class SaveEspecieProcessoFailed implements Action {
    readonly type = SAVE_ESPECIE_PROCESSO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update EspecieProcesso Success
 */
export class UpdateEspecieProcessoSuccess implements Action {
    readonly type = UPDATE_ESPECIE_PROCESSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update EspecieProcesso Failed
 */
export class UpdateEspecieProcessoFailed implements Action {
    readonly type = UPDATE_ESPECIE_PROCESSO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create EspecieProcesso
 */
export class CreateEspecieProcesso implements Action {
    readonly type = CREATE_ESPECIE_PROCESSO;

    constructor() {
    }
}

/**
 * Create EspecieProcesso Success
 */
export class CreateEspecieProcessoSuccess implements Action {
    readonly type = CREATE_ESPECIE_PROCESSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Colaborador
 */
export class SaveColaborador implements Action {
    readonly type = SAVE_COLABORADOR;

    constructor(public payload: any) {
    }
}

/**
 * Save Colaborador Success
 */
export class SaveColaboradorSuccess implements Action {
    readonly type = SAVE_COLABORADOR_SUCCESS;

    constructor() {
    }
}

/**
 * Save Colaborador Failed
 */
export class SaveColaboradorFailed implements Action {
    readonly type = SAVE_COLABORADOR_FAILED;

    constructor(public payload: any) {
    }
}

export type EspecieProcessoEditActionsAll
    = CreateEspecieProcesso
    | CreateEspecieProcessoSuccess
    | GetEspecieProcesso
    | GetEspecieProcessoSuccess
    | GetEspecieProcessoFailed
    | SaveEspecieProcesso
    | SaveEspecieProcessoSuccess
    | SaveEspecieProcessoFailed
    | UpdateEspecieProcesso
    | UpdateEspecieProcessoSuccess
    | UpdateEspecieProcessoFailed
    | SaveColaborador
    | SaveColaboradorSuccess
    | SaveColaboradorFailed;
