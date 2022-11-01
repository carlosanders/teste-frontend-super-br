import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS_VINCULADOS = '[DOCUMENTO AVULSO EDIT] GET DOCUMENTOS VINCULADOS';
export const GET_DOCUMENTOS_VINCULADOS_SUCCESS = '[DOCUMENTO AVULSO EDIT] GET DOCUMENTOS VINCULADOS SUCCESS';
export const GET_DOCUMENTOS_VINCULADOS_FAILED = '[DOCUMENTO AVULSO EDIT] GET DOCUMENTOS VINCULADOS FAILED';

export const DELETE_DOCUMENTO_VINCULADO = '[DOCUMENTO AVULSO EDIT] DELETE DOCUMENTO VINCULADO';
export const DELETE_DOCUMENTO_VINCULADO_SUCCESS = '[DOCUMENTO AVULSO EDIT] DELETE DOCUMENTO VINCULADO SUCCESS';
export const DELETE_DOCUMENTO_VINCULADO_FAILED = '[DOCUMENTO AVULSO EDIT] DELETE DOCUMENTO VINCULADO FAILED';

export const CLICKED_DOCUMENTO_VINCULADO = '[DOCUMENTO AVULSO EDIT] CLICKED DOCUMENTO VINCULADO';
export const COMPLETE_DOCUMENTO_VINCULADO = '[DOCUMENTO AVULSO EDIT] COMPLETE DOCUMENTO VINCULADO';

export const CHANGE_SELECTED_DOCUMENTOS_VINCULADOS = '[DOCUMENTO AVULSO EDIT] CHANGE SELECTED DOCUMENTOS VINCULADOS';

export const UPDATE_DOCUMENTO_VINCULADO = '[DOCUMENTO AVULSO EDIT] UPDATE DOCUMENTO VINCULADO';
export const UPDATE_DOCUMENTO_VINCULADO_SUCCESS = '[DOCUMENTO AVULSO EDIT] UPDATE DOCUMENTO VINCULADO SUCCESS';
export const UPDATE_DOCUMENTO_VINCULADO_FAILED = '[DOCUMENTO AVULSO EDIT] UPDATE DOCUMENTO VINCULADO FAILED';

export const DOWNLOAD_DOCUMENTO_VINCULADO_P7S = '[DOCUMENTO AVULSO EDIT] DOWNLOAD P7S DOCUMENTO VINCULADO';
export const DOWNLOAD_DOCUMENTO_VINCULADO_P7S_SUCCESS = '[DOCUMENTO AVULSO EDIT] DOWNLOAD P7S DOCUMENTO VINCULADO SUCCESS';
export const DOWNLOAD_DOCUMENTO_VINCULADO_P7S_FAILED = '[DOCUMENTO AVULSO EDIT] DOWNLOAD P7S DOCUMENTO VINCULADO FAILED';

export const SET_SAVING = '[DOCUMENTO AVULSO EDIT] SET SAVING COMPONENTES DIGITAIS';

export const REMOVE_VINCULACAO_DOCUMENTO = '[DOCUMENTO AVULSO EDIT] REMOVE VINCULACAO DOCUMENTO';
export const REMOVE_VINCULACAO_DOCUMENTO_SUCCESS = '[DOCUMENTO AVULSO EDIT] REMOVE VINCULACAO DOCUMENTO SUCCESS';
export const REMOVE_VINCULACAO_DOCUMENTO_FAILED = '[DOCUMENTO AVULSO EDIT] REMOVE VINCULACAO DOCUMENTO FAILED';

export const RELOAD_DOCUMENTOS_VINCULADOS = '[DOCUMENTO AVULSO EDIT ANEXOS] RELOAD DOCUMENTOS VINCULADOS';
export const FINISH_UPLOAD_ANEXOS = '[ANEXAR COPIA] FINISH UPLOAD ANEXOS';
export const FINISH_RELOADING = '[DOCUMENTO AVULSO EDIT ANEXOS] FINISH RELOADING DOCUMENTOS VINCULADOS';
export const UNLOAD_DOCUMENTOS_VINCULADOS = '[DOCUMENTO AVULSO EDIT ANEXOS] UNLOAD DOCUMENTOS VINCULADOS';

export const APPROVE_COMPONENTE_DIGITAL_VINCULADO_SUCCESS = '[DOCUMENTO AVULSO EDIT COMPONENTE DIGITAL] APPROVE COMPONENTE DIGITAL SUCCESS';

export const SAVE_COMPONENTE_DIGITAL_DOCUMENTO_SUCCESS = '[ANEXAR COPIA] SAVE COMPONENTE DIGITAL SUCCESS';

/**
 * Get Documentos Vinculados
 */
export class GetDocumentosVinculados implements Action
{
    readonly type = GET_DOCUMENTOS_VINCULADOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Vinculados Success
 */
export class GetDocumentosVinculadosSuccess implements Action
{
    readonly type = GET_DOCUMENTOS_VINCULADOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Vinculados Failed
 */
export class GetDocumentosVinculadosFailed implements Action
{
    readonly type = GET_DOCUMENTOS_VINCULADOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Delete Documento Vinculado
 */
export class DeleteDocumentoVinculado implements Action
{
    readonly type = DELETE_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Documento Vinculado Success
 */
export class DeleteDocumentoVinculadoSuccess implements Action
{
    readonly type = DELETE_DOCUMENTO_VINCULADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Documento Vinculado Failed
 */
export class DeleteDocumentoVinculadoFailed implements Action
{
    readonly type = DELETE_DOCUMENTO_VINCULADO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Change Selected Documentos Vinculados
 */
export class ChangeSelectedDocumentosVinculados implements Action {
    readonly type = CHANGE_SELECTED_DOCUMENTOS_VINCULADOS;

    constructor(public payload: any) {
    }
}

/**
 * Clicked Documento Vinculado
 */
export class ClickedDocumentoVinculado implements Action
{
    readonly type = CLICKED_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Complete Documento Vinculado
 */
export class CompleteDocumentoVinculado implements Action
{
    readonly type = COMPLETE_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Documento Vinculado
 */
export class UpdateDocumentoVinculado implements Action
{
    readonly type = UPDATE_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Documento Vinculado Success
 */
export class UpdateDocumentoVinculadoSuccess implements Action
{
    readonly type = UPDATE_DOCUMENTO_VINCULADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Documento Vinculado Failed
 */
export class UpdateDocumentoVinculadoFailed implements Action
{
    readonly type = UPDATE_DOCUMENTO_VINCULADO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Download Documento Vinculado P7S
 */
export class DownloadP7SVinculado implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_VINCULADO_P7S;

    constructor(public payload: any)
    {
    }
}

export class DownloadP7SVinculadoSuccess implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_VINCULADO_P7S_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class DownloadP7SVinculadoFailed implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_VINCULADO_P7S_FAILED;

    constructor(public payload: any)
    {
    }
}

export class SetSavingComponentesDigitais implements Action
{
    readonly type = SET_SAVING;

    constructor()
    {
    }
}

export class RemoveVinculacaoDocumento implements Action
{
    readonly type = REMOVE_VINCULACAO_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

export class RemoveVinculacaoDocumentoSuccess implements Action
{
    readonly type = REMOVE_VINCULACAO_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class RemoveVinculacaoDocumentoFailed implements Action
{
    readonly type = REMOVE_VINCULACAO_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export class ReloadDocumentosVinculados implements Action
{
    readonly type = RELOAD_DOCUMENTOS_VINCULADOS;

    constructor()
    {
    }
}

/**
 * Finish Upload Anexos
 */
export class FinishUploadAnexos implements Action
{
    readonly type = FINISH_UPLOAD_ANEXOS;

    constructor(public payload: any)
    {
    }
}

export class FinishReloading implements Action
{
    readonly type = FINISH_RELOADING;

    constructor()
    {
    }
}

export class UnloadDocumentosVinculados implements Action
{
    readonly type = UNLOAD_DOCUMENTOS_VINCULADOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Approve Componente Digital Success
 */
export class ApproveComponenteDigitalVinculadoSuccess implements Action
{
    readonly type = APPROVE_COMPONENTE_DIGITAL_VINCULADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * SaveComponenteDigitalSuccess do Documento
 */
export class SaveComponenteDigitalDocumentoSuccess implements Action
{
    readonly type = SAVE_COMPONENTE_DIGITAL_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type DocumentosVinculadosActionsAll
    = GetDocumentosVinculados
    | GetDocumentosVinculadosSuccess
    | GetDocumentosVinculadosFailed
    | ClickedDocumentoVinculado
    | CompleteDocumentoVinculado
    | DeleteDocumentoVinculado
    | DeleteDocumentoVinculadoSuccess
    | DeleteDocumentoVinculadoFailed
    | ChangeSelectedDocumentosVinculados
    | UpdateDocumentoVinculado
    | UpdateDocumentoVinculadoSuccess
    | UpdateDocumentoVinculadoFailed
    | DownloadP7SVinculado
    | DownloadP7SVinculadoFailed
    | DownloadP7SVinculadoSuccess
    | SetSavingComponentesDigitais
    | RemoveVinculacaoDocumento
    | RemoveVinculacaoDocumentoSuccess
    | RemoveVinculacaoDocumentoFailed
    | ReloadDocumentosVinculados
    | FinishUploadAnexos
    | FinishReloading
    | UnloadDocumentosVinculados
    | ApproveComponenteDigitalVinculadoSuccess
    | SaveComponenteDigitalDocumentoSuccess;
