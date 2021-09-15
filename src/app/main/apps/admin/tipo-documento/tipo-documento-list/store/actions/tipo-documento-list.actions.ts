import {Action} from '@ngrx/store';

export const GET_TIPO_DOCUMENTO = '[SUPERADMIN TIPO DOCUMENTO LIST] GET TIPO_DOCUMENTO';
export const GET_TIPO_DOCUMENTO_SUCCESS = '[SUPERADMIN TIPO DOCUMENTO LIST] GET TIPO_DOCUMENTO SUCCESS';
export const GET_TIPO_DOCUMENTO_FAILED = '[SUPERADMIN TIPO DOCUMENTO LIST] GET TIPO_DOCUMENTO FAILED';

export const RELOAD_TIPO_DOCUMENTO = '[SUPERADMIN TIPO DOCUMENTO LIST] RELOAD TIPO_DOCUMENTO';
export const UNLOAD_TIPO_DOCUMENTO = '[SUPERADMIN TIPO DOCUMENTO LIST] UNLOAD TIPO_DOCUMENTO';


export const DELETE_TIPO_DOCUMENTO = '[SUPERADMIN TIPO DOCUMENTO LIST] DELETE TIPO_DOCUMENTO';
export const DELETE_TIPO_DOCUMENTO_SUCCESS = '[SUPERADMIN TIPO DOCUMENTO LIST] DELETE TIPO_DOCUMENTO SUCCESS';
export const DELETE_TIPO_DOCUMENTO_FAILED = '[SUPERADMIN TIPO DOCUMENTO LIST] DELETE TIPO_DOCUMENTO FAILED';

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
 * Unload TipoDocumento
 */
export class UnloadTipoDocumento implements Action {
    readonly type = UNLOAD_TIPO_DOCUMENTO;

    constructor() {
    }
}

/**
 * Reload TipoDocumento
 */
export class ReloadTipoDocumento implements Action {
    readonly type = RELOAD_TIPO_DOCUMENTO;

    constructor() {
    }
}

/**
 * Delete TipoDocumento
 */
export class DeleteTipoDocumento implements Action {
    readonly type = DELETE_TIPO_DOCUMENTO;

    constructor(public payload: any) {
    }
}

/**
 * Delete TipoDocumento Success
 */
export class DeleteTipoDocumentoSuccess implements Action {
    readonly type = DELETE_TIPO_DOCUMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete TipoDocumento Failed
 */
export class DeleteTipoDocumentoFailed implements Action {
    readonly type = DELETE_TIPO_DOCUMENTO_FAILED;

    constructor(public payload: any) {
    }
}

export type TipoDocumentoListActionsAll
    = GetTipoDocumento
    | GetTipoDocumentoSuccess
    | GetTipoDocumentoFailed
    | UnloadTipoDocumento
    | ReloadTipoDocumento
    | DeleteTipoDocumento
    | DeleteTipoDocumentoSuccess
    | DeleteTipoDocumentoFailed;

