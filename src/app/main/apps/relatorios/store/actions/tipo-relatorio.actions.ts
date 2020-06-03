import {Action} from '@ngrx/store';

export const UNLOAD_TIPO_RELATORIO = '[RELATORIOS] UNLOAD TIPO_RELATORIO';

export const GET_TIPO_RELATORIO = '[RELATORIOS] GET TIPO_RELATORIO';
export const GET_TIPO_RELATORIO_SUCCESS = '[RELATORIOS] GET TIPO_RELATORIO SUCCESS';
export const GET_TIPO_RELATORIO_FAILED = '[RELATORIOS] GET TIPO_RELATORIO FAILED';

export const CREATE_TIPO_RELATORIO = '[RELATORIOS] CREATE TIPO_RELATORIO';
export const CREATE_TIPO_RELATORIO_SUCCESS = '[RELATORIOS] CREATE TIPO_RELATORIO SUCCESS';

export const DELETE_TIPO_RELATORIO = '[RELATORIOS] DELETE TIPO_RELATORIO';
export const DELETE_TIPO_RELATORIO_SUCCESS = '[RELATORIOS] DELETE TIPO_RELATORIO SUCCESS';
export const DELETE_TIPO_RELATORIO_FAILED = '[RELATORIOS] DELETE TIPO_RELATORIO FAILED';

export const CHANGE_SELECTED_TIPO_RELATORIO = '[RELATORIOS] CHANGE SELECTED TIPO_RELATORIO';

export const SAVE_TIPO_RELATORIO = '[RELATORIO] SAVE TIPO_RELATORIO';
export const SAVE_TIPO_RELATORIO_SUCCESS = '[RELATORIO] SAVE TIPO_RELATORIO SUCCESS';
export const SAVE_TIPO_RELATORIO_FAILED = '[RELATORIO] SAVE TIPO_RELATORIO FAILED';

/**
 * Unload TipoRelatorios
 */
export class UnloadTipoRelatorios implements Action {
    readonly type = UNLOAD_TIPO_RELATORIO;

    constructor(public payload: any) {
    }
}

/**
 * Get TipoRelatorios
 */
export class GetTipoRelatorios implements Action {
    readonly type = GET_TIPO_RELATORIO;

    constructor(public payload: any) {
    }
}

/**
 * Get TipoRelatorios Success
 */
export class GetTipoRelatoriosSuccess implements Action {
    readonly type = GET_TIPO_RELATORIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get TipoRelatorios Failed
 */
export class GetTipoRelatoriosFailed implements Action {
    readonly type = GET_TIPO_RELATORIO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Creat TipoRelatorio
 */
export class CreateTipoRelatorio implements Action {
    readonly type = CREATE_TIPO_RELATORIO;

    constructor() {
    }
}

/**
 * Creat TipoRelatorio Success
 */
export class CreateTipoRelatorioSuccess implements Action {
    readonly type = CREATE_TIPO_RELATORIO_SUCCESS;

    constructor() {
    }
}

/**
 * Change Selected TipoRelatorios
 */
export class ChangeSelectedTipoRelatorios implements Action {
    readonly type = CHANGE_SELECTED_TIPO_RELATORIO;

    constructor(public payload: any) {
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

/**
 * Save TipoRelatorio
 */
export class SaveTipoRelatorio implements Action {
    readonly type = SAVE_TIPO_RELATORIO;

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

export type TipoRelatoriosActionsAll
    = UnloadTipoRelatorios
    | GetTipoRelatorios
    | GetTipoRelatoriosSuccess
    | GetTipoRelatoriosFailed
    | CreateTipoRelatorio
    | CreateTipoRelatorioSuccess
    | ChangeSelectedTipoRelatorios
    | DeleteTipoRelatorio
    | DeleteTipoRelatorioSuccess
    | DeleteTipoRelatorioFailed
    | SaveTipoRelatorio
    | SaveTipoRelatorioSuccess
    | SaveTipoRelatorioFailed;
