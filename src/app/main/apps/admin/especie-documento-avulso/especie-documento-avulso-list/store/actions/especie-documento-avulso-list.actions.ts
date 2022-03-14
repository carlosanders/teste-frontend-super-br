import {Action} from '@ngrx/store';

export const GET_ESPECIE_DOCUMENTO_AVULSO = '[ADMIN ESPECIE DOCUMENTO AVULSO LIST] GET ESPECIE DOCUMENTO AVULSO';
export const GET_ESPECIE_DOCUMENTO_AVULSO_SUCCESS = '[ADMIN ESPECIE DOCUMENTO AVULSO LIST] GET ESPECIE DOCUMENTO AVULSO SUCCESS';
export const GET_ESPECIE_DOCUMENTO_AVULSO_FAILED = '[ADMIN ESPECIE DOCUMENTO AVULSO LIST] GET ESPECIE DOCUMENTO AVULSO FAILED';

export const RELOAD_ESPECIE_DOCUMENTO_AVULSO = '[ADMIN ESPECIE DOCUMENTO AVULSO LIST] RELOAD ESPECIE DOCUMENTO AVULSO';
export const UNLOAD_ESPECIE_DOCUMENTO_AVULSO = '[ADMIN ESPECIE DOCUMENTO AVULSO LIST] UNLOAD ESPECIE DOCUMENTO AVULSO';

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

export class UnloadEspecieDocumentoAvulso implements Action {
    readonly type = UNLOAD_ESPECIE_DOCUMENTO_AVULSO;

    constructor() {
    }
}

export class ReloadEspecieDocumentoAvulso implements Action {
    readonly type = RELOAD_ESPECIE_DOCUMENTO_AVULSO;

    constructor() {
    }
}


export type EspecieDocumentoAvulsoListActionsAll
    = GetEspecieDocumentoAvulso
    | GetEspecieDocumentoAvulsoSuccess
    | GetEspecieDocumentoAvulsoFailed
    | UnloadEspecieDocumentoAvulso
    | ReloadEspecieDocumentoAvulso;

