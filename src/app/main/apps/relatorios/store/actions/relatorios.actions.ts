import {Action} from '@ngrx/store';

export const UNLOAD_RELATORIOS = '[RELATORIOS] UNLOAD RELATORIOS';

export const GET_RELATORIOS = '[RELATORIOS] GET RELATORIOS';
export const GET_RELATORIOS_SUCCESS = '[RELATORIOS] GET RELATORIOS SUCCESS';
export const GET_RELATORIOS_FAILED = '[RELATORIOS] GET RELATORIOS FAILED';

export const SET_CURRENT_RELATORIO = '[RELATORIOS] SET CURRENT RELATORIO';
export const SET_CURRENT_RELATORIO_SUCCESS = '[RELATORIOS] SET CURRENT RELATORIO SUCCESS';

export const CREATE_RELATORIO = '[RELATORIOS] CREATE RELATORIO';
export const CREATE_RELATORIO_SUCCESS = '[RELATORIOS] CREATE RELATORIO SUCCESS';

export const DELETE_RELATORIO = '[RELATORIOS] DELETE RELATORIO';
export const DELETE_RELATORIO_SUCCESS = '[RELATORIOS] DELETE RELATORIO SUCCESS';
export const DELETE_RELATORIO_FAILED = '[RELATORIOS] DELETE RELATORIO FAILED';

export const CHANGE_SELECTED_RELATORIOS = '[RELATORIOS] CHANGE SELECTED RELATORIOS';

export const TOGGLE_MAXIMIZADO = '[RELATORIOS] TOGGLE MAXIMIZADO';

export const SET_FOLDER_ON_SELECTED_RELATORIOS = '[RELATORIOS] SET FOLDER ON SELECTED RELATORIOS';
export const SET_FOLDER_ON_SELECTED_RELATORIOS_SUCCESS = '[RELATORIOS] SET FOLDER ON SELECTED RELATORIOS SUCCESS';
export const SET_FOLDER_ON_SELECTED_RELATORIOS_FAILED = '[RELATORIOS] SET FOLDER ON SELECTED RELATORIOS FAILED';

export const SAVE_RELATORIO = '[RELATORIO] SAVE RELATORIO';
export const SAVE_RELATORIO_SUCCESS = '[RELATORIO] SAVE RELATORIO SUCCESS';
export const SAVE_RELATORIO_FAILED = '[RELATORIO] SAVE RELATORIO FAILED';

export const CREATE_VINCULACAO_ETIQUETA = '[RELATORIO] CREATE VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[RELATORIO] CREATE VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[RELATORIO] CREATE VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[RELATORIO] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[RELATORIO] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[RELATORIO] DELETE VINCULACAO_ETIQUETA FAILED';

/**
 * Unload Relatorios
 */
export class UnloadRelatorios implements Action {
    readonly type = UNLOAD_RELATORIOS;

    constructor(public payload: any) {
    }
}

/**
 * Get Relatorios
 */
export class GetRelatorios implements Action {
    readonly type = GET_RELATORIOS;

    constructor(public payload: any) {
    }
}

/**
 * Get Relatorios Success
 */
export class GetRelatoriosSuccess implements Action {
    readonly type = GET_RELATORIOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Relatorios Failed
 */
export class GetRelatoriosFailed implements Action {
    readonly type = GET_RELATORIOS_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Select Relatorio
 */
export class SetCurrentRelatorio implements Action {
    readonly type = SET_CURRENT_RELATORIO;

    constructor(public payload: any) {
    }
}

/**
 * Select Relatorio Success
 */
export class SetCurrentRelatorioSuccess implements Action {
    readonly type = SET_CURRENT_RELATORIO_SUCCESS;

    constructor() {
    }
}

/**
 * Creat Relatorio
 */
export class CreateRelatorio implements Action {
    readonly type = CREATE_RELATORIO;

    constructor() {
    }
}

/**
 * Creat Relatorio Success
 */
export class CreateRelatorioSuccess implements Action {
    readonly type = CREATE_RELATORIO_SUCCESS;

    constructor() {
    }
}

/**
 * Change Selected Relatorios
 */
export class ChangeSelectedRelatorios implements Action {
    readonly type = CHANGE_SELECTED_RELATORIOS;

    constructor(public payload: any) {
    }
}

/**
 * Set Folder on Selected Relatorios
 */
export class SetFolderOnSelectedRelatorios implements Action {
    readonly type = SET_FOLDER_ON_SELECTED_RELATORIOS;

    constructor(public payload: any) {
    }
}

/**
 * Set Folder on Selected Relatorios Success
 */
export class SetFolderOnSelectedRelatoriosSuccess implements Action {
    readonly type = SET_FOLDER_ON_SELECTED_RELATORIOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Set Folder on Selected Relatorios Failed
 */
export class SetFolderOnSelectedRelatoriosFailed implements Action {
    readonly type = SET_FOLDER_ON_SELECTED_RELATORIOS_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Delete Relatorio
 */
export class DeleteRelatorio implements Action {
    readonly type = DELETE_RELATORIO;

    constructor(public payload: any) {
    }
}

/**
 * Delete Relatorio Success
 */
export class DeleteRelatorioSuccess implements Action {
    readonly type = DELETE_RELATORIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Relatorio Failed
 */
export class DeleteRelatorioFailed implements Action {
    readonly type = DELETE_RELATORIO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Save Relatorio
 */
export class SaveRelatorio implements Action {
    readonly type = SAVE_RELATORIO;

    constructor(public payload: any) {
    }
}

/**
 * Save Relatorio Success
 */
export class SaveRelatorioSuccess implements Action {
    readonly type = SAVE_RELATORIO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Relatorio Failed
 */
export class SaveRelatorioFailed implements Action {
    readonly type = SAVE_RELATORIO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Delete Vinculacao Etiqueta
 */
export class DeleteVinculacaoEtiqueta implements Action {
    readonly type = DELETE_VINCULACAO_ETIQUETA;

    constructor(public payload: any) {
    }
}

/**
 * Delete Vinculacao Etiqueta Success
 */
export class DeleteVinculacaoEtiquetaSuccess implements Action {
    readonly type = DELETE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Vinculacao Etiqueta Failed
 */
export class DeleteVinculacaoEtiquetaFailed implements Action {
    readonly type = DELETE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Vinculacao Etiqueta
 */
export class CreateVinculacaoEtiqueta implements Action {
    readonly type = CREATE_VINCULACAO_ETIQUETA;

    constructor(public payload: any) {
    }
}

/**
 * Create Vinculacao Etiqueta Success
 */
export class CreateVinculacaoEtiquetaSuccess implements Action {
    readonly type = CREATE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Create Vinculacao Etiqueta Failed
 */
export class CreateVinculacaoEtiquetaFailed implements Action {
    readonly type = CREATE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Toggle Maximizado
 */
export class ToggleMaximizado implements Action {
    readonly type = TOGGLE_MAXIMIZADO;

    constructor() {
    }
}

export type RelatoriosActionsAll
    = UnloadRelatorios
    | GetRelatorios
    | GetRelatoriosSuccess
    | GetRelatoriosFailed
    | CreateRelatorio
    | CreateRelatorioSuccess
    | SetCurrentRelatorio
    | SetCurrentRelatorioSuccess
    | ChangeSelectedRelatorios
    | SetFolderOnSelectedRelatorios
    | SetFolderOnSelectedRelatoriosSuccess
    | SetFolderOnSelectedRelatoriosFailed
    | DeleteRelatorio
    | DeleteRelatorioSuccess
    | DeleteRelatorioFailed
    | SaveRelatorio
    | SaveRelatorioSuccess
    | SaveRelatorioFailed
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed
    | ToggleMaximizado;
