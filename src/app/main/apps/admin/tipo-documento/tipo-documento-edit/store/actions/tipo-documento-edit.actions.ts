import {Action} from '@ngrx/store';

export const CREATE_TIPO_DOCUMENTO = '[ADMIN TIPO_DOCUMENTO EDIT] CREATE TIPO_DOCUMENTO';
export const CREATE_TIPO_DOCUMENTO_SUCCESS = '[ADMIN TIPO_DOCUMENTO EDIT] CREATE TIPO_DOCUMENTO SUCCESS';

export const SAVE_TIPO_DOCUMENTO = '[ADMIN TIPO_DOCUMENTO EDIT] SAVE TIPO_DOCUMENTO';
export const SAVE_TIPO_DOCUMENTO_SUCCESS = '[ADMIN TIPO_DOCUMENTO EDIT] SAVE TIPO_DOCUMENTO SUCCESS';
export const SAVE_TIPO_DOCUMENTO_FAILED = '[ADMIN TIPO_DOCUMENTO EDIT] SAVE TIPO_DOCUMENTO FAILED';

export const UPDATE_TIPO_DOCUMENTO = '[ADMIN TIPO_DOCUMENTO EDIT] UPDATE TIPO_DOCUMENTO';
export const UPDATE_TIPO_DOCUMENTO_SUCCESS = '[ADMIN TIPO_DOCUMENTO EDIT] UPDATE TIPO_DOCUMENTO SUCCESS';
export const UPDATE_TIPO_DOCUMENTO_FAILED = '[ADMIN TIPO_DOCUMENTO EDIT] UPDATE TIPO_DOCUMENTO FAILED';

export const GET_TIPO_DOCUMENTO = '[ADMIN TIPO_DOCUMENTO EDIT] GET TIPO_DOCUMENTO';
export const GET_TIPO_DOCUMENTO_SUCCESS = '[ADMIN TIPO_DOCUMENTO EDIT] GET TIPO_DOCUMENTO SUCCESS';
export const GET_TIPO_DOCUMENTO_FAILED = '[ADMIN TIPO_DOCUMENTO EDIT] GET TIPO_DOCUMENTO FAILED';

export const SAVE_COLABORADOR = '[ADMIN TIPO_DOCUMENTO EDIT] SAVE COLABORADOR';
export const SAVE_COLABORADOR_SUCCESS = '[ADMIN TIPO_DOCUMENTO EDIT] SAVE COLABORADOR SUCCESS';
export const SAVE_COLABORADOR_FAILED = '[ADMIN TIPO_DOCUMENTO EDIT] SAVE COLABORADOR FAILED';

/**
 * Get TipoDocumento
 */
export class GetTipoDocumento implements Action {
    readonly type = GET_TIPO_DOCUMENTO;

    constructor(public payload: any) {
    }
}

/**
 * Get TipoDocumento Success
 */
export class GetTipoDocumentoSuccess implements Action {
    readonly type = GET_TIPO_DOCUMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get TipoDocumento Failed
 */
export class GetTipoDocumentoFailed implements Action {
    readonly type = GET_TIPO_DOCUMENTO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save TipoDocumento
 */
export class SaveTipoDocumento implements Action {
    readonly type = SAVE_TIPO_DOCUMENTO;

    constructor(public payload: any) {
    }
}

/**
 * Update TipoDocumento
 */
export class UpdateTipoDocumento implements Action {
    readonly type = UPDATE_TIPO_DOCUMENTO;

    constructor(public payload: any) {
    }
}

/**
 * Save TipoDocumento Success
 */
export class SaveTipoDocumentoSuccess implements Action {
    readonly type = SAVE_TIPO_DOCUMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save TipoDocumento Failed
 */
export class SaveTipoDocumentoFailed implements Action {
    readonly type = SAVE_TIPO_DOCUMENTO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update TipoDocumento Success
 */
export class UpdateTipoDocumentoSuccess implements Action {
    readonly type = UPDATE_TIPO_DOCUMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update TipoDocumento Failed
 */
export class UpdateTipoDocumentoFailed implements Action {
    readonly type = UPDATE_TIPO_DOCUMENTO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create TipoDocumento
 */
export class CreateTipoDocumento implements Action {
    readonly type = CREATE_TIPO_DOCUMENTO;

    constructor() {
    }
}

/**
 * Create TipoDocumento Success
 */
export class CreateTipoDocumentoSuccess implements Action {
    readonly type = CREATE_TIPO_DOCUMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}


export type TipoDocumentoEditActionsAll
    = CreateTipoDocumento
    | CreateTipoDocumentoSuccess
    | GetTipoDocumento
    | GetTipoDocumentoSuccess
    | GetTipoDocumentoFailed
    | SaveTipoDocumento
    | SaveTipoDocumentoSuccess
    | SaveTipoDocumentoFailed
    | UpdateTipoDocumento
    | UpdateTipoDocumentoSuccess
    | UpdateTipoDocumentoFailed;
