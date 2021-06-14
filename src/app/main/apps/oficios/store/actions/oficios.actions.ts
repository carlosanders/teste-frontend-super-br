import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS_AVULSO = '[OFICIO] GET DOCUMENTOS AVULSO';
export const GET_DOCUMENTOS_AVULSO_SUCCESS = '[OFICIO] GET DOCUMENTOS AVULSO SUCCESS';
export const GET_DOCUMENTOS_AVULSO_FAILED = '[OFICIO] GET DOCUMENTOS AVULSO FAILED';

export const RELOAD_DOCUMENTOS_AVULSO = '[OFICIO] RELOAD DOCUMENTOS AVULSO';

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

export const SET_FOLDER_ON_SELECTED_DOCUMENTOS_AVULSO = '[OFICIO] SET FOLDER ON SELECTED DOCUMENTOS AVULSO';
export const SET_FOLDER_ON_SELECTED_DOCUMENTOS_AVULSO_SUCCESS = '[OFICIO] SET FOLDER ON SELECTED DOCUMENTOS AVULSO SUCCESS';
export const SET_FOLDER_ON_SELECTED_DOCUMENTOS_AVULSO_FAILED = '[OFICIO] SET FOLDER ON SELECTED DOCUMENTOS AVULSO FAILED';

export const UNLOAD_DOCUMENTOS_AVULSO = '[OFICIO] UNLOAD DOCUMENTOS AVULSO FAILED';

export const TOGGLE_LIDA_DOCUMENTOS_AVULSO = '[OFICIO] TOGGLE LIDA DOCUMENTO AVULSO';
export const TOGGLE_LIDA_DOCUMENTOS_AVULSO_SUCCESS = '[OFICIO] TOGGLE LIDA DOCUMENTO AVULSO SUCCESS';
export const TOGGLE_LIDA_DOCUMENTOS_AVULSO_FAILED = '[OFICIO] TOGGLE LIDA DOCUMENTO AVULSO FAILED';

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
 *
 * Reload DocumentosAvulso
 */
export class ReloadDocumentosAvulso implements Action {
    readonly type = RELOAD_DOCUMENTOS_AVULSO;

    constructor() {
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

/**
 * Set Folder on Selected DocumantoAvulso
 */
export class SetFolderOnSelectedDocumentosAvulso implements Action {
    readonly type = SET_FOLDER_ON_SELECTED_DOCUMENTOS_AVULSO;

    constructor(public payload: any) {
    }
}

/**
 * Set Folder on Selected DocumantoAvulso Success
 */
export class SetFolderOnSelectedDocumentosAvulsoSuccess implements Action {
    readonly type = SET_FOLDER_ON_SELECTED_DOCUMENTOS_AVULSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Set Folder on Selected DocumantoAvulso Failed
 */
export class SetFolderOnSelectedDocumentosAvulsoFailed implements Action {
    readonly type = SET_FOLDER_ON_SELECTED_DOCUMENTOS_AVULSO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Unload DocumantoAvulso
 */
export class UnloadDocumentosAvulso implements Action {
    readonly type = UNLOAD_DOCUMENTOS_AVULSO;

    constructor(public payload: any) {
    }
}

/**
 * Toggle Lida DocumentosAvulso
 */
export class ToggleLidaDocumentosAvulso implements Action {
    readonly type = TOGGLE_LIDA_DOCUMENTOS_AVULSO;

    constructor(public payload: any) {
    }
}

/**
 * Toggle Lida DocumentosAvulso Success
 */
export class ToggleLidaDocumentosAvulsoSuccess implements Action {
    readonly type = TOGGLE_LIDA_DOCUMENTOS_AVULSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Toggle Lida DocumentosAvulso Failed
 */
export class ToggleLidaDocumentosAvulsoFailed implements Action {
    readonly type = TOGGLE_LIDA_DOCUMENTOS_AVULSO_FAILED;

    constructor(public payload: any) {
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
    | DeleteVinculacaoEtiquetaFailed
    | SetFolderOnSelectedDocumentosAvulso
    | SetFolderOnSelectedDocumentosAvulsoSuccess
    | SetFolderOnSelectedDocumentosAvulsoFailed
    | UnloadDocumentosAvulso
    | ToggleLidaDocumentosAvulso
    | ToggleLidaDocumentosAvulsoSuccess
    | ToggleLidaDocumentosAvulsoFailed;
