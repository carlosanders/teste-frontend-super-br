import { Action } from '@ngrx/store';

export const GET_DOCUMENTO_AVULSO = '[OFCIO] GET DOCUMENTO AVULSO';
export const GET_DOCUMENTO_AVULSO_SUCCESS = '[OFCIO] GET DOCUMENTO AVULSO SUCCESS';
export const GET_DOCUMENTO_AVULSO_FAILED = '[OFCIO] GET DOCUMENTO AVULSO FAILED';

export const DAR_CIENCIA_TAREFA = '[OFCIO] DAR CIENCIA TAREFA';
export const DAR_CIENCIA_TAREFA_SUCCESS = '[OFCIO] DAR CIENCIA TAREFA SUCCESS';
export const DAR_CIENCIA_TAREFA_FAILED = '[OFCIO] DAR CIENCIA TAREFA FAILED';

export const CREATE_VINCULACAO_ETIQUETA = '[OFCIO] VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[OFCIO] VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[OFCIO] VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[OFCIO] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[OFCIO] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[OFCIO] DELETE VINCULACAO_ETIQUETA FAILED';

export const GET_DOCUMENTOS = '[OFCIO] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[OFCIO] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[OFCIO] GET DOCUMENTOS FAILED';


export const DESELECT_DOCUMENTO_AVULSO_ACTION = '[OFCIO] GET DOCUMENTOS FAILED';

/**
 * Get Tarefa
 */
export class GetDocumentoAvulso implements Action
{
    readonly type = GET_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tarefa Success
 */
export class GetDocumentoAvulsoSuccess implements Action
{
    readonly type = GET_DOCUMENTO_AVULSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tarefa Failed
 */
export class GetDocumentoAvulsoFailed implements Action
{
    readonly type = GET_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: string)
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
 * Deselect Tarefa Action
 */
export class DeselectDocumentoAvulsoAction implements Action
{
    readonly type = DESELECT_DOCUMENTO_AVULSO_ACTION;

    constructor()
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

export type OficioDetailActionsAll
    = GetDocumentoAvulso
    | GetDocumentoAvulsoSuccess
    | GetDocumentoAvulsoFailed
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed
    | DeselectDocumentoAvulsoAction
    | GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed;
