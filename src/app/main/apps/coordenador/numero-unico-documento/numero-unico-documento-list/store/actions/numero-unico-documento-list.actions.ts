import {Action} from '@ngrx/store';

export const GET_NUMEROS_UNICOS_DOCUMENTOS = '[COORDENADOR NUMEROS UNICOS DOCUMENTOS LIST] GET NUMEROS UNICOS DOCUMENTOS';
export const GET_NUMEROS_UNICOS_DOCUMENTOS_SUCCESS = '[COORDENADOR NUMEROS UNICOS DOCUMENTOS LIST] GET NUMEROS UNICOS DOCUMENTOS SUCCESS';
export const GET_NUMEROS_UNICOS_DOCUMENTOS_FAILED = '[COORDENADOR NUMEROS UNICOS DOCUMENTOS LIST] GET NUMEROS UNICOS DOCUMENTOS FAILED';

export const RELOAD_NUMEROS_UNICOS_DOCUMENTOS = '[COORDENADOR NUMEROS UNICOS DOCUMENTOS LIST] RELOAD NUMEROS UNICOS DOCUMENTOS';
export const UNLOAD_NUMEROS_UNICOS_DOCUMENTOS = '[COORDENADOR NUMEROS UNICOS DOCUMENTOS LIST] UNLOAD NUMEROS UNICOS DOCUMENTOS';


export const DELETE_NUMERO_UNICO_DOCUMENTO = '[COORDENADOR NUMEROS UNICOS DOCUMENTOS LIST] DELETE NUMERO UNICO DOCUMENTO';
export const DELETE_NUMERO_UNICO_DOCUMENTO_SUCCESS = '[COORDENADOR NUMEROS UNICOS DOCUMENTOS LIST] DELETE NUMERO UNICO DOCUMENTO SUCCESS';
export const DELETE_NUMERO_UNICO_DOCUMENTO_FAILED = '[COORDENADOR NUMEROS UNICOS DOCUMENTOS LIST] DELETE NUMERO UNICO DOCUMENTO FAILED';

/**
 * Get NumerosUnicosDocumentos
 */
export class GetNumerosUnicosDocumentos implements Action
{
    readonly type = GET_NUMEROS_UNICOS_DOCUMENTOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get NumerosUnicosDocumentos Success
 */
export class GetNumerosUnicosDocumentosSuccess implements Action
{
    readonly type = GET_NUMEROS_UNICOS_DOCUMENTOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get NumerosUnicosDocumentos Failed
 */
export class GetNumerosUnicosDocumentosFailed implements Action
{
    readonly type = GET_NUMEROS_UNICOS_DOCUMENTOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload NumerosUnicosDocumentos
 */
 export class UnloadNumerosUnicosDocumentos implements Action
 {
     readonly type = UNLOAD_NUMEROS_UNICOS_DOCUMENTOS;

     constructor()
     {
     }
 }

/**
 * Reload NumerosUnicosDocumentos
 */
export class ReloadNumerosUnicosDocumentos implements Action
{
    readonly type = RELOAD_NUMEROS_UNICOS_DOCUMENTOS;

    constructor()
    {
    }
}

/**
 * Delete NumeroUnicoDocumento
 */
export class DeleteNumeroUnicoDocumento implements Action
{
    readonly type = DELETE_NUMERO_UNICO_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete NumeroUnicoDocumento Success
 */
export class DeleteNumeroUnicoDocumentoSuccess implements Action
{
    readonly type = DELETE_NUMERO_UNICO_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete NumeroUnicoDocumento Failed
 */
export class DeleteNumeroUnicoDocumentoFailed implements Action
{
    readonly type = DELETE_NUMERO_UNICO_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type NumeroUnicoDocumentoListActionsAll
    = GetNumerosUnicosDocumentos
    | GetNumerosUnicosDocumentosSuccess
    | GetNumerosUnicosDocumentosFailed
    | UnloadNumerosUnicosDocumentos
    | ReloadNumerosUnicosDocumentos
    | DeleteNumeroUnicoDocumento
    | DeleteNumeroUnicoDocumentoSuccess
    | DeleteNumeroUnicoDocumentoFailed;

