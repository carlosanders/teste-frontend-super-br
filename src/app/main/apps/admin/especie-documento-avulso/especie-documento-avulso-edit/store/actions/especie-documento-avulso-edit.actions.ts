import {Action} from '@ngrx/store';

export const CREATE_ESPECIE_DOCUMENTO_AVULSO = '[ADMIN ESPECIE DOCUMENTO AVULSO EDIT] CREATE ESPECIE DOCUMENTO AVULSO';
export const CREATE_ESPECIE_DOCUMENTO_AVULSO_SUCCESS = '[ADMIN ESPECIE DOCUMENTO AVULSO EDIT] CREATE ESPECIE_DOCUMENTO_AVULSO SUCCESS';

export const SAVE_ESPECIE_DOCUMENTO_AVULSO = '[ADMIN ESPECIE DOCUMENTO AVULSO EDIT] SAVE ESPECIE DOCUMENTO AVULSO';
export const SAVE_ESPECIE_DOCUMENTO_AVULSO_SUCCESS = '[ADMIN ESPECIE DOCUMENTO AVULSO EDIT] SAVE ESPECIE_DOCUMENTO_AVULSO SUCCESS';
export const SAVE_ESPECIE_DOCUMENTO_AVULSO_FAILED = '[ADMIN ESPECIE DOCUMENTO AVULSO EDIT] SAVE ESPECIE_DOCUMENTO_AVULSO FAILED';

export const UPDATE_ESPECIE_DOCUMENTO_AVULSO = '[ADMIN ESPECIE DOCUMENTO AVULSO EDIT] UPDATE ESPECIE DOCUMENTO AVULSO';
export const UPDATE_ESPECIE_DOCUMENTO_AVULSO_SUCCESS = '[ADMIN ESPECIE DOCUMENTO AVULSO EDIT] UPDATE ESPECIE_DOCUMENTO_AVULSO SUCCESS';
export const UPDATE_ESPECIE_DOCUMENTO_AVULSO_FAILED = '[ADMIN ESPECIE DOCUMENTO AVULSO EDIT] UPDATE ESPECIE_DOCUMENTO_AVULSO FAILED';

export const GET_ESPECIE_DOCUMENTO_AVULSO = '[ADMIN ESPECIE DOCUMENTO AVULSO EDIT] GET ESPECIE DOCUMENTO AVULSO';
export const GET_ESPECIE_DOCUMENTO_AVULSO_SUCCESS = '[ADMIN ESPECIE DOCUMENTO AVULSO EDIT] GET ESPECIE_DOCUMENTO_AVULSO SUCCESS';
export const GET_ESPECIE_DOCUMENTO_AVULSO_FAILED = '[ADMIN ESPECIE DOCUMENTO AVULSO EDIT] GET ESPECIE_DOCUMENTO_AVULSO FAILED';

export class GetEspecieDocumentoAvulso implements Action {
    readonly type = GET_ESPECIE_DOCUMENTO_AVULSO;

    constructor(public payload: any) {
    }
}

export class GetEspecieDocumentoAvulsoSuccess implements Action {
    readonly type = GET_ESPECIE_DOCUMENTO_AVULSO_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetEspecieDocumentoAvulsoFailed implements Action {
    readonly type = GET_ESPECIE_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: string) {
    }
}

export class SaveEspecieDocumentoAvulso implements Action {
    readonly type = SAVE_ESPECIE_DOCUMENTO_AVULSO;

    constructor(public payload: any) {
    }
}

export class UpdateEspecieDocumentoAvulso implements Action {
    readonly type = UPDATE_ESPECIE_DOCUMENTO_AVULSO;

    constructor(public payload: any) {
    }
}

export class SaveEspecieDocumentoAvulsoSuccess implements Action {
    readonly type = SAVE_ESPECIE_DOCUMENTO_AVULSO_SUCCESS;

    constructor(public payload: any) {
    }
}

export class SaveEspecieDocumentoAvulsoFailed implements Action {
    readonly type = SAVE_ESPECIE_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: any) {
    }
}

export class UpdateEspecieDocumentoAvulsoSuccess implements Action {
    readonly type = UPDATE_ESPECIE_DOCUMENTO_AVULSO_SUCCESS;

    constructor(public payload: any) {
    }
}

export class UpdateEspecieDocumentoAvulsoFailed implements Action {
    readonly type = UPDATE_ESPECIE_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: any) {
    }
}

export class CreateEspecieDocumentoAvulso implements Action {
    readonly type = CREATE_ESPECIE_DOCUMENTO_AVULSO;

    constructor() {
    }
}

export class CreateEspecieDocumentoAvulsoSuccess implements Action {
    readonly type = CREATE_ESPECIE_DOCUMENTO_AVULSO_SUCCESS;

    constructor(public payload: any) {
    }
}

export type EspecieDocumentoAvulsoEditActionsAll
    = CreateEspecieDocumentoAvulso
    | CreateEspecieDocumentoAvulsoSuccess
    | GetEspecieDocumentoAvulso
    | GetEspecieDocumentoAvulsoSuccess
    | GetEspecieDocumentoAvulsoFailed
    | SaveEspecieDocumentoAvulso
    | SaveEspecieDocumentoAvulsoSuccess
    | SaveEspecieDocumentoAvulsoFailed
    | UpdateEspecieDocumentoAvulso
    | UpdateEspecieDocumentoAvulsoSuccess
    | UpdateEspecieDocumentoAvulsoFailed;
