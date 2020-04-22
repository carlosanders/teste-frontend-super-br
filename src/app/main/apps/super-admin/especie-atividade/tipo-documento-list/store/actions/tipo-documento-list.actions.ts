import {Action} from '@ngrx/store';
import {RELOAD_ESPECIE_ATIVIDADE} from '../../../especie-atividade-list/store/actions';

export const DELETE_TIPO_DOCUMENTO_LIST = '[SUPER-ADMIN TIPO_DOCUMENTO_LIST ADICIONAR] DELETE TIPO_DOCUMENTO_LIST';
export const DELETE_TIPO_DOCUMENTO_LIST_SUCCESS = '[SUPER-ADMIN TIPO_DOCUMENTO_LIST ADICIONAR] DELETE TIPO_DOCUMENTO_LIST SUCCESS';
export const DELETE_TIPO_DOCUMENTO_LIST_FAILED = '[SUPER-ADMIN TIPO_DOCUMENTO_LIST ADICIONAR] DELETE TIPO_DOCUMENTO_LIST FAILED';

export const GET_TIPO_DOCUMENTO_LIST = '[SUPER-ADMIN TIPO_DOCUMENTO_LIST ADICIONAR] GET TIPO_DOCUMENTO_LIST';
export const GET_TIPO_DOCUMENTO_LIST_SUCCESS = '[SUPER-ADMIN TIPO_DOCUMENTO_LIST ADICIONAR] GET TIPO_DOCUMENTO_LIST SUCCESS';
export const GET_TIPO_DOCUMENTO_LIST_FAILED = '[SUPER-ADMIN TIPO_DOCUMENTO_LIST ADICIONAR] GET TIPO_DOCUMENTO_LIST FAILED';

export const RELOAD_TIPO_DOCUMENTO_LIST = '[SUPERADMIN TIPO_DOCUMENTO LIST] RELOAD TIPO_DOCUMENTO_LIST';

/**
 * Deletar TipoDocumentoList
 */
export class DeletarTipoDocumentoList implements Action {
    readonly type = DELETE_TIPO_DOCUMENTO_LIST;

    constructor(public payload: any) {
    }
}


/**
 * Deletar TipoDocumentoList Success
 */
export class DeletarTipoDocumentoListSuccess implements Action {
    readonly type = DELETE_TIPO_DOCUMENTO_LIST_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Deletar TipoDocumentoList Failed
 */
export class DeletarTipoDocumentoListFailed implements Action {
    readonly type = DELETE_TIPO_DOCUMENTO_LIST_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Get TipoDocumentoList Failed
 */
export class GetTipoDocumentoListFailed implements Action {
    readonly type = GET_TIPO_DOCUMENTO_LIST_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Get TipoDocumentoList Success
 */
export class GetTipoDocumentoListSuccess implements Action {
    readonly type = GET_TIPO_DOCUMENTO_LIST_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get TipoDocumentoList
 */
export class GetTipoDocumentoList implements Action {
    readonly type = GET_TIPO_DOCUMENTO_LIST;

    constructor(public payload: any) {
    }
}

/**
 * Reload TipoDocumentoList
 */
export class ReloadTipoDocumentoList implements Action {
    readonly type = RELOAD_TIPO_DOCUMENTO_LIST;

    constructor() {
    }
}


export type TipoDocumentoListActionsAll
    = DeletarTipoDocumentoList
    | DeletarTipoDocumentoListSuccess
    | DeletarTipoDocumentoListFailed
    | GetTipoDocumentoList
    | GetTipoDocumentoListFailed
    | GetTipoDocumentoListSuccess
    | ReloadTipoDocumentoList;
