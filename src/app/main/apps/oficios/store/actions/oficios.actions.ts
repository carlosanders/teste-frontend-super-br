import { Action } from '@ngrx/store';

export const GET_DOCUMENTOS_AVULSO = '[OFICIO] GET DOCUMENTOS_AVULSO';
export const GET_DOCUMENTOS_AVULSO_SUCCESS = '[OFICIO] GET DOCUMENTOS_AVULSO SUCCESS';
export const GET_DOCUMENTOS_AVULSO_FAILED = '[OFICIO] GET DOCUMENTOS_AVULSO FAILED';

export const CHANGE_SELECTED_DOCUMENTOS_AVULSO = '[OFICIO] CHANGE SELECTED DOCUMENTOS AVULSO';

export const DELETE_VINCULACAO_ETIQUETA = '[OFICIO] DELETE VINCULACAO ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[OFICIO] DELETE VINCULACAO ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[OFICIO] DELETE VINCULACAO ETIQUETA FAILED';

export const SET_CURRENT_DOCUMENTOS_AVULSO = '[OFICIO] SET CURRENT DOCUMENTOS AVULSO';
export const SET_CURRENT_DOCUMENTOS_AVULSO_SUCCESS = '[OFICIO] SET CURRENT DOCUMENTOS AVULSO SUCCESS';

export const TOGGLE_MAXIMIZADO = '[OFICIO] TOGGLE MAXIMIZADO';

export const CREATE_VINCULACAO_ETIQUETA = '[OFICIO] CREATE VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[OFICIO] CREATE VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[OFICIO] CREATE VINCULACAO ETIQUETA FAILED';

/**
 *
 * Get DocumentosAvulso
 */
export class GetDocumentosAvulso implements Action {
    readonly type = GET_DOCUMENTOS_AVULSO;

    constructor(public payload: any) {
    }
}

/**
 * Get DocumentosAvulso Success
 */
export class GetDocumentosAvulsoSuccess implements Action {
    readonly type = GET_DOCUMENTOS_AVULSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get DocumentoAvulso Failed
 */
export class GetDocumentosAvulsoFailed implements Action {
    readonly type = GET_DOCUMENTOS_AVULSO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Select DocumantoAvulso
 */
export class SetCurrentDocumentoAvulso implements Action {
    readonly type = SET_CURRENT_DOCUMENTOS_AVULSO;

    constructor(public payload: any) {
    }
}

/**
 * Select DocumantoAvulso Success
 */
export class SetCurrentDocumantoAvulsoSuccess implements Action {
    readonly type = SET_CURRENT_DOCUMENTOS_AVULSO_SUCCESS;

    constructor() {
    }
}

/**
 * Change Selected DocumentosAvulso
 */
export class ChangeSelectedDocumentosAvulso implements Action {
    readonly type = CHANGE_SELECTED_DOCUMENTOS_AVULSO;

    constructor(public payload: any) {
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
 * Toggle Maximizado
 */
export class ToggleMaximizado implements Action
{
    readonly type = TOGGLE_MAXIMIZADO;

    constructor()
    {
    }
}

export type DocumentosAvulsoActionsAll
    = GetDocumentosAvulso
    | GetDocumentosAvulsoSuccess
    | GetDocumentosAvulsoFailed
    | ChangeSelectedDocumentosAvulso
    | SetCurrentDocumentoAvulso
    | SetCurrentDocumantoAvulsoSuccess
    | ToggleMaximizado
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed;