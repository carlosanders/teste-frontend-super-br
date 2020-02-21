import {Action} from '@ngrx/store';

export const GET_DOCUMENTO_AVULSO = '[DOCUMENTO_AVULSO] GET DOCUMENTO_AVULSO';
export const GET_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO_AVULSO] GET DOCUMENTO_AVULSO SUCCESS';
export const GET_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO_AVULSO] GET DOCUMENTO_AVULSO FAILED';

export const EDIT_DOCUMENTO_AVULSO = '[DOCUMENTO_AVULSO] EDIT DOCUMENTO_AVULSO';
export const EDIT_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO_AVULSO] EDIT DOCUMENTO_AVULSO SUCCESS';

export const CREATE_DOCUMENTO_AVULSO = '[DOCUMENTO_AVULSO] CREATE DOCUMENTO_AVULSO';
export const CREATE_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO_AVULSO] CREATE DOCUMENTO_AVULSO SUCCESS';

export const SAVE_DOCUMENTO_AVULSO = '[DOCUMENTO_AVULSO] SAVE DOCUMENTO_AVULSO';
export const SAVE_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO_AVULSO] SAVE DOCUMENTO_AVULSO SUCCESS';
export const SAVE_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO_AVULSO] SAVE DOCUMENTO_AVULSO FAILED';

export const DAR_CIENCIA_DOCUMENTO_AVULSO = '[DOCUMENTO_AVULSO] DAR CIENCIA DOCUMENTO_AVULSO';
export const DAR_CIENCIA_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO_AVULSO] DAR CIENCIA DOCUMENTO_AVULSO SUCCESS';
export const DAR_CIENCIA_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO_AVULSO] DAR CIENCIA DOCUMENTO_AVULSO FAILED';

export const DELETE_DOCUMENTO_AVULSO = '[DOCUMENTO_AVULSO] DELETE DOCUMENTO_AVULSO';
export const DELETE_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO_AVULSO] DELETE DOCUMENTO_AVULSO SUCCESS';
export const DELETE_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO_AVULSO] DELETE DOCUMENTO_AVULSO FAILED';

export const CREATE_VINCULACAO_ETIQUETA = '[DOCUMENTO_AVULSO] VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[DOCUMENTO_AVULSO] VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[DOCUMENTO_AVULSO] VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[DOCUMENTO_AVULSO] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[DOCUMENTO_AVULSO] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[DOCUMENTO_AVULSO] DELETE VINCULACAO_ETIQUETA FAILED';

export const GET_DOCUMENTOS = '[DOCUMENTO_AVULSO] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[DOCUMENTO_AVULSO] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[DOCUMENTO_AVULSO] GET DOCUMENTOS FAILED';

export const DESELECT_DOCUMENTO_AVULSO_ACTION = '[DOCUMENTO_AVULSO] DESELECT DOCUMENTO_AVULSO ACTION';

/**
 * Get DocumentoAvulso
 */
export class GetDocumentoAvulso implements Action
{
    readonly type = GET_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get DocumentoAvulso Success
 */
export class GetDocumentoAvulsoSuccess implements Action
{
    readonly type = GET_DOCUMENTO_AVULSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get DocumentoAvulso Failed
 */
export class GetDocumentoAvulsoFailed implements Action
{
    readonly type = GET_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Set Current DocumentoAvulso
 */
export class EditDocumentoAvulso implements Action
{
    readonly type = EDIT_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Set Current DocumentoAvulso Success
 */
export class EditDocumentoAvulsoSuccess implements Action
{
    readonly type = EDIT_DOCUMENTO_AVULSO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save DocumentoAvulso
 */
export class SaveDocumentoAvulso implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DocumentoAvulso Success
 */
export class SaveDocumentoAvulsoSuccess implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save DocumentoAvulso Failed
 */
export class SaveDocumentoAvulsoFailed implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Dar Ciencia DocumentoAvulso
 */
export class DarCienciaDocumentoAvulso implements Action
{
    readonly type = DAR_CIENCIA_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Dar Ciencia DocumentoAvulso Success
 */
export class DarCienciaDocumentoAvulsoSuccess implements Action
{
    readonly type = DAR_CIENCIA_DOCUMENTO_AVULSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Dar Ciencia DocumentoAvulso Failed
 */
export class DarCienciaDocumentoAvulsoFailed implements Action
{
    readonly type = DAR_CIENCIA_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Vinculacao Etiqueta
 */
export class DeleteVinculacaoEtiqueta implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Vinculacao Etiqueta Success
 */
export class DeleteVinculacaoEtiquetaSuccess implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Vinculacao Etiqueta Failed
 */
export class DeleteVinculacaoEtiquetaFailed implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta
 */
export class CreateVinculacaoEtiqueta implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta Success
 */
export class CreateVinculacaoEtiquetaSuccess implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta Failed
 */
export class CreateVinculacaoEtiquetaFailed implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Get Documentos
 */
export class GetDocumentos implements Action
{
    readonly type = GET_DOCUMENTOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Success
 */
export class GetDocumentosSuccess implements Action
{
    readonly type = GET_DOCUMENTOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Failed
 */
export class GetDocumentosFailed implements Action
{
    readonly type = GET_DOCUMENTOS_FAILED;

    constructor(public payload: string)
    {
    }
}


/**
 * Creat DocumentoAvulso
 */
export class CreateDocumentoAvulso implements Action
{
    readonly type = CREATE_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Creat DocumentoAvulso Success
 */
export class CreateDocumentoAvulsoSuccess implements Action
{
    readonly type = CREATE_DOCUMENTO_AVULSO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Deselect DocumentoAvulso Action
 */
export class DeselectDocumentoAvulsoAction implements Action
{
    readonly type = DESELECT_DOCUMENTO_AVULSO_ACTION;

    constructor()
    {
    }
}

export type DocumentoAvulsoDetailActionsAll
    = GetDocumentoAvulso
    | GetDocumentoAvulsoSuccess
    | GetDocumentoAvulsoFailed
    | CreateDocumentoAvulso
    | CreateDocumentoAvulsoSuccess
    | EditDocumentoAvulso
    | EditDocumentoAvulsoSuccess
    | SaveDocumentoAvulso
    | SaveDocumentoAvulsoSuccess
    | SaveDocumentoAvulsoFailed
    | DarCienciaDocumentoAvulso
    | DarCienciaDocumentoAvulsoSuccess
    | DarCienciaDocumentoAvulsoFailed
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed
    | GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed;
