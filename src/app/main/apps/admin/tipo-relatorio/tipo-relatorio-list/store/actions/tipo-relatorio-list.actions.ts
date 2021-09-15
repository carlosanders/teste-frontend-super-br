import {Action} from '@ngrx/store';

export const GET_TIPO_RELATORIO = '[SUPERADMIN TIPO RELATORIO LIST] GET TIPO_RELATORIO';
export const GET_TIPO_RELATORIO_SUCCESS = '[SUPERADMIN TIPO RELATORIO LIST] GET TIPO_RELATORIO SUCCESS';
export const GET_TIPO_RELATORIO_FAILED = '[SUPERADMIN TIPO RELATORIO LIST] GET TIPO_RELATORIO FAILED';

export const RELOAD_TIPO_RELATORIO = '[SUPERADMIN TIPO RELATORIO LIST] RELOAD TIPO_RELATORIO';
export const UNLOAD_TIPO_RELATORIO = '[SUPERADMIN TIPO RELATORIO LIST] UNLOAD TIPO_RELATORIO';

export const DELETE_TIPO_RELATORIO = '[SUPERADMIN TIPO RELATORIO LIST] DELETE TIPO_RELATORIO';
export const DELETE_TIPO_RELATORIO_SUCCESS = '[SUPERADMIN TIPO RELATORIO LIST] DELETE TIPO_RELATORIO SUCCESS';
export const DELETE_TIPO_RELATORIO_FAILED = '[SUPERADMIN TIPO RELATORIO LIST] DELETE TIPO_RELATORIO FAILED';

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
 * Unload TipoRelatorio
 */
export class UnloadTipoRelatorio implements Action {
    readonly type = UNLOAD_TIPO_RELATORIO;

    constructor() {
    }
}

/**
 * Reload TipoRelatorio
 */
export class ReloadTipoRelatorio implements Action {
    readonly type = RELOAD_TIPO_RELATORIO;

    constructor() {
    }
}

/**
 * Delete TipoRelatorio
 */
export class DeleteTipoRelatorio implements Action {
    readonly type = DELETE_TIPO_RELATORIO;

    constructor(public payload: any) {
    }
}

/**
 * Delete TipoRelatorio Success
 */
export class DeleteTipoRelatorioSuccess implements Action {
    readonly type = DELETE_TIPO_RELATORIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete TipoRelatorio Failed
 */
export class DeleteTipoRelatorioFailed implements Action {
    readonly type = DELETE_TIPO_RELATORIO_FAILED;

    constructor(public payload: any) {
    }
}

export type TipoRelatorioListActionsAll
    = GetTipoRelatorio
    | GetTipoRelatorioSuccess
    | GetTipoRelatorioFailed
    | UnloadTipoRelatorio
    | ReloadTipoRelatorio
    | DeleteTipoRelatorio
    | DeleteTipoRelatorioSuccess
    | DeleteTipoRelatorioFailed;

