import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS_VINCULADOS = '[DOCUMENTO EDIT MODELO] GET DOCUMENTOS VINCULADOS';
export const GET_DOCUMENTOS_VINCULADOS_SUCCESS = '[DOCUMENTO EDIT MODELO] GET DOCUMENTOS VINCULADOS SUCCESS';
export const GET_DOCUMENTOS_VINCULADOS_FAILED = '[DOCUMENTO EDIT MODELO] GET DOCUMENTOS VINCULADOS FAILED';

export const DELETE_DOCUMENTO_VINCULADO = '[DOCUMENTO EDIT MODELO] DELETE DOCUMENTO VINCULADO';
export const DELETE_DOCUMENTO_VINCULADO_SUCCESS = '[DOCUMENTO EDIT MODELO] DELETE DOCUMENTO VINCULADO SUCCESS';
export const DELETE_DOCUMENTO_VINCULADO_FAILED = '[DOCUMENTO EDIT MODELO] DELETE DOCUMENTO VINCULADO FAILED';

export const ASSINA_DOCUMENTO_VINCULADO = '[DOCUMENTO EDIT MODELO] ASSINA DOCUMENTO VINCULADO';
export const ASSINA_DOCUMENTO_VINCULADO_SUCCESS = '[DOCUMENTO EDIT MODELO] ASSINA DOCUMENTO VINCULADO SUCCESS';
export const ASSINA_DOCUMENTO_VINCULADO_FAILED = '[DOCUMENTO EDIT MODELO] ASSINA DOCUMENTO VINCULADO FAILED';

export const ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE = '[DOCUMENTO EDIT MODELO] ASSINA DOCUMENTO VINCULADO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE_SUCCESS = '[DOCUMENTO EDIT MODELO] ASSINA DOCUMENTO VINCULADO  ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE_FAILED = '[DOCUMENTO EDIT MODELO] ASSINA DOCUMENTO VINCULADO ELETRONICAMENTE FAILED';

export const CLICKED_DOCUMENTO_VINCULADO = '[DOCUMENTO EDIT MODELO] CLICKED DOCUMENTO VINCULADO';
export const COMPLETE_DOCUMENTO_VINCULADO = '[DOCUMENTO EDIT MODELO] COMPLETE DOCUMENTO VINCULADO';

export const CHANGE_SELECTED_DOCUMENTOS_VINCULADOS = '[DOCUMENTO EDIT MODELO] CHANGE SELECTED DOCUMENTOS VINCULADOS';

export const SET_SAVING = '[DOCUMENTO EDIT MODELO] SET SAVING COMPONENTES DIGITAIS';

export const RELOAD_DOCUMENTOS_VINCULADOS = '[DOCUMENTO EDIT MODELO ANEXOS] RELOAD DOCUMENTOS VINCULADOS';
export const UNLOAD_DOCUMENTOS_VINCULADOS = '[DOCUMENTO EDIT MODELO ANEXOS] UNLOAD DOCUMENTOS VINCULADOS';

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
 * Assina Documento Vinculado
 */
export class AssinaDocumentoVinculado implements Action
{
    readonly type = ASSINA_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Vinculado Success
 */
export class AssinaDocumentoVinculadoSuccess implements Action
{
    readonly type = ASSINA_DOCUMENTO_VINCULADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Vinculado Failed
 */
export class AssinaDocumentoVinculadoFailed implements Action
{
    readonly type = ASSINA_DOCUMENTO_VINCULADO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Vinculado Eletronicamente
 */
export class AssinaDocumentoVinculadoEletronicamente implements Action
{
    readonly type = ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Vinculado Eletronicamente Success
 */
export class AssinaDocumentoVinculadoEletronicamenteSuccess implements Action
{
    readonly type = ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Vinculado Eletronicamente Failed
 */
export class AssinaDocumentoVinculadoEletronicamenteFailed implements Action
{
    readonly type = ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE_FAILED;

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

export class SetSavingComponentesDigitais implements Action
{
    readonly type = SET_SAVING;

    constructor()
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

export class UnloadDocumentosVinculados implements Action
{
    readonly type = UNLOAD_DOCUMENTOS_VINCULADOS;

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
    | AssinaDocumentoVinculado
    | AssinaDocumentoVinculadoSuccess
    | AssinaDocumentoVinculadoFailed
    | AssinaDocumentoVinculadoEletronicamente
    | AssinaDocumentoVinculadoEletronicamenteSuccess
    | AssinaDocumentoVinculadoEletronicamenteFailed
    | DeleteDocumentoVinculado
    | DeleteDocumentoVinculadoSuccess
    | DeleteDocumentoVinculadoFailed
    | ChangeSelectedDocumentosVinculados
    | SetSavingComponentesDigitais
    | ReloadDocumentosVinculados
    | UnloadDocumentosVinculados;
