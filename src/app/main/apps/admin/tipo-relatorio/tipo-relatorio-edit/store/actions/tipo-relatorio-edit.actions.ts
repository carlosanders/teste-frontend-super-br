import {Action} from '@ngrx/store';

export const CREATE_TIPO_RELATORIO = '[ADMIN TIPO_RELATORIO EDIT] CREATE TIPO_RELATORIO';
export const CREATE_TIPO_RELATORIO_SUCCESS = '[ADMIN TIPO_RELATORIO EDIT] CREATE TIPO_RELATORIO SUCCESS';

export const SAVE_TIPO_RELATORIO = '[ADMIN TIPO_RELATORIO EDIT] SAVE TIPO_RELATORIO';
export const SAVE_TIPO_RELATORIO_SUCCESS = '[ADMIN TIPO_RELATORIO EDIT] SAVE TIPO_RELATORIO SUCCESS';
export const SAVE_TIPO_RELATORIO_FAILED = '[ADMIN TIPO_RELATORIO EDIT] SAVE TIPO_RELATORIO FAILED';

export const UPDATE_TIPO_RELATORIO = '[ADMIN TIPO_RELATORIO EDIT] UPDATE TIPO_RELATORIO';
export const UPDATE_TIPO_RELATORIO_SUCCESS = '[ADMIN TIPO_RELATORIO EDIT] UPDATE TIPO_RELATORIO SUCCESS';
export const UPDATE_TIPO_RELATORIO_FAILED = '[ADMIN TIPO_RELATORIO EDIT] UPDATE TIPO_RELATORIO FAILED';

export const GET_TIPO_RELATORIO = '[ADMIN TIPO_RELATORIO EDIT] GET TIPO_RELATORIO';
export const GET_TIPO_RELATORIO_SUCCESS = '[ADMIN TIPO_RELATORIO EDIT] GET TIPO_RELATORIO SUCCESS';
export const GET_TIPO_RELATORIO_FAILED = '[ADMIN TIPO_RELATORIO EDIT] GET TIPO_RELATORIO FAILED';

export const SAVE_COLABORADOR = '[ADMIN TIPO_RELATORIO EDIT] SAVE COLABORADOR';
export const SAVE_COLABORADOR_SUCCESS = '[ADMIN TIPO_RELATORIO EDIT] SAVE COLABORADOR SUCCESS';
export const SAVE_COLABORADOR_FAILED = '[ADMIN TIPO_RELATORIO EDIT] SAVE COLABORADOR FAILED';

/**
 * Get TipoRelatorio
 */
export class GetTipoRelatorio implements Action {
    readonly type = GET_TIPO_RELATORIO;

    constructor(public payload: any) {
    }
}

/**
 * Get TipoRelatorio Success
 */
export class GetTipoRelatorioSuccess implements Action {
    readonly type = GET_TIPO_RELATORIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get TipoRelatorio Failed
 */
export class GetTipoRelatorioFailed implements Action {
    readonly type = GET_TIPO_RELATORIO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save TipoRelatorio
 */
export class SaveTipoRelatorio implements Action {
    readonly type = SAVE_TIPO_RELATORIO;

    constructor(public payload: any) {
    }
}

/**
 * Update TipoRelatorio
 */
export class UpdateTipoRelatorio implements Action {
    readonly type = UPDATE_TIPO_RELATORIO;

    constructor(public payload: any) {
    }
}

/**
 * Save TipoRelatorio Success
 */
export class SaveTipoRelatorioSuccess implements Action {
    readonly type = SAVE_TIPO_RELATORIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save TipoRelatorio Failed
 */
export class SaveTipoRelatorioFailed implements Action {
    readonly type = SAVE_TIPO_RELATORIO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update TipoRelatorio Success
 */
export class UpdateTipoRelatorioSuccess implements Action {
    readonly type = UPDATE_TIPO_RELATORIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update TipoRelatorio Failed
 */
export class UpdateTipoRelatorioFailed implements Action {
    readonly type = UPDATE_TIPO_RELATORIO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create TipoRelatorio
 */
export class CreateTipoRelatorio implements Action {
    readonly type = CREATE_TIPO_RELATORIO;

    constructor() {
    }
}

/**
 * Create TipoRelatorio Success
 */
export class CreateTipoRelatorioSuccess implements Action {
    readonly type = CREATE_TIPO_RELATORIO_SUCCESS;

    constructor(public payload: any) {
    }
}


export type TipoRelatorioEditActionsAll
    = CreateTipoRelatorio
    | CreateTipoRelatorioSuccess
    | GetTipoRelatorio
    | GetTipoRelatorioSuccess
    | GetTipoRelatorioFailed
    | SaveTipoRelatorio
    | SaveTipoRelatorioSuccess
    | SaveTipoRelatorioFailed
    | UpdateTipoRelatorio
    | UpdateTipoRelatorioSuccess
    | UpdateTipoRelatorioFailed;
