import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS = '[ATIVIDADE DOCUMENTO] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[ATIVIDADE DOCUMENTO] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[ATIVIDADE DOCUMENTO] GET DOCUMENTOS FAILED';

export const CHANGE_SELECTED_DOCUMENTOS = '[ATIVIDADE DOCUMENTO] CHANGE SELECTED DOCUMENTOS';

export const UNLOAD_DOCUMENTOS = '[ATIVIDADE DOCUMENTO] UNLOAD DOCUMENTOS';

export const UPDATE_DOCUMENTO = '[ATIVIDADE DOCUMENTO] UPDATE DOCUMENTO';
export const UPDATE_DOCUMENTO_SUCCESS = '[ATIVIDADE DOCUMENTO] UPDATE DOCUMENTO SUCCESS';
export const UPDATE_DOCUMENTO_FAILED = '[ATIVIDADE DOCUMENTO] UPDATE DOCUMENTO FAILED';

export const REMOVE_MINUTAS_TAREFA = '[ATIVIDADE DOCUMENTO] REMOVE MINUTAS TAREFA';

export const CONVERTE_MINUTA_EM_ANEXO = '[ATIVIDADE DOCUMENTO] CONVERTE MINUTA EM ANEXO';
export const CONVERTE_MINUTA_EM_ANEXO_SUCCESS = '[ATIVIDADE DOCUMENTO] CONVERTE MINUTA EM ANEXO SUCCESS';
export const CONVERTE_MINUTA_EM_ANEXO_FAILED = '[ATIVIDADE DOCUMENTO] CONVERTE MINUTA EM ANEXO FAILED';

export const ADD_DOCUMENTO_ID = '[ATIVIDADE DOCUMENTO] ADD DOCUMENTO ID';

export const CREATE_COMPONENTE_DIGITAL = '[ATIVIDADE DOCUMENTO] CREATE COMPONENTE DIGITAL';
export const CREATE_COMPONENTE_DIGITAL_SUCCESS = '[ATIVIDADE DOCUMENTO] CREATE COMPONENTE DIGITAL SUCCESS';

export const SAVE_COMPONENTE_DIGITAL_MINUTA = '[ATIVIDADE DOCUMENTO] SAVE COMPONENTE DIGITAL';
export const SAVE_COMPONENTE_DIGITAL_MINUTA_SUCCESS = '[ATIVIDADE DOCUMENTO] SAVE COMPONENTE DIGITAL SUCCESS';
export const SAVE_COMPONENTE_DIGITAL_MINUTA_FAILED = '[ATIVIDADE DOCUMENTO] SAVE COMPONENTE DIGITAL FAILED';

export const GET_DOCUMENTO = '[ATIVIDADE DOCUMENTO] GET DOCUMENTO';
export const GET_DOCUMENTO_SUCCESS = '[ATIVIDADE DOCUMENTO] GET DOCUMENTO SUCCESS';
export const GET_DOCUMENTO_FAILED = '[ATIVIDADE DOCUMENTO] GET DOCUMENTO FAILED';

export const VISUALIZAR_MODELO = '[ATIVIDADE DOCUMENTO] VISUALIZAR MODELO';
export const VISUALIZAR_MODELO_FAILED = '[ATIVIDADE DOCUMENTO] VISUALIZAR MODELO FAILED';

export const SET_SAVING_MINUTAS = '[ATIVIDADE DOCUMENTO] SET SAVING MINUTAS';

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

    constructor(public payload: any)
    {
    }
}

/**
 * Change Selected Documentos
 */
export class ChangeSelectedDocumentos implements Action
{
    readonly type = CHANGE_SELECTED_DOCUMENTOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Documentos
 */
export class UnloadDocumentos implements Action
{
    readonly type = UNLOAD_DOCUMENTOS;

    constructor()
    {
    }
}

/**
 * Remove Minutas Tarefa
 */
export class RemoveMinutasTarefa implements Action
{
    readonly type = REMOVE_MINUTAS_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Documento
 */
export class UpdateDocumento implements Action
{
    readonly type = UPDATE_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Documento Success
 */
export class UpdateDocumentoSuccess implements Action
{
    readonly type = UPDATE_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Documento Failed
 */
export class UpdateDocumentoFailed implements Action
{
    readonly type = UPDATE_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export class ConverteMinutaEmAnexo implements Action
{
    readonly type = CONVERTE_MINUTA_EM_ANEXO;

    constructor(public payload: any)
    {
    }
}

export class ConverteMinutaEmAnexoSuccess implements Action
{
    readonly type = CONVERTE_MINUTA_EM_ANEXO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class ConverteMinutaEmAnexoFailed implements Action
{
    readonly type = CONVERTE_MINUTA_EM_ANEXO_FAILED;

    constructor(public payload: any)
    {
    }
}

export class AddDocumentoId implements Action
{
    readonly type = ADD_DOCUMENTO_ID;

    constructor(public payload: any)
    {
    }
}



/**
 * Create Componente Digital
 */
export class CreateComponenteDigital implements Action
{
    readonly type = CREATE_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Componente Digital Success
 */
export class CreateComponenteDigitalSuccess implements Action
{
    readonly type = CREATE_COMPONENTE_DIGITAL_SUCCESS;

    constructor()
    {
    }
}


/**
 * Save Componente Digital
 */
export class SaveComponenteDigitalMinuta implements Action
{
    readonly type = SAVE_COMPONENTE_DIGITAL_MINUTA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Success
 */
export class SaveComponenteDigitalMinutaSuccess implements Action
{
    readonly type = SAVE_COMPONENTE_DIGITAL_MINUTA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Failed
 */
export class SaveComponenteDigitalMinutaFailed implements Action
{
    readonly type = SAVE_COMPONENTE_DIGITAL_MINUTA_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Get Documento
 */
export class GetDocumento implements Action
{
    readonly type = GET_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documento Success
 */
export class GetDocumentoSuccess implements Action
{
    readonly type = GET_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documento Failed
 */
export class GetDocumentoFailed implements Action
{
    readonly type = GET_DOCUMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Visualizar Modelo
 */
export class VisualizarModelo implements Action
{
    readonly type = VISUALIZAR_MODELO;

    constructor(public payload: string)
    {
    }
}

/**
 * Visualizar Modelo Failed
 */
export class VisualizarModeloFailed implements Action
{
    readonly type = VISUALIZAR_MODELO_FAILED;

    constructor(public payload: string)
    {
    }
}

export class SetSavingMinutas implements Action
{
    readonly type = SET_SAVING_MINUTAS;
}

export type DocumentosActionsAll
    = GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | ChangeSelectedDocumentos
    | UnloadDocumentos
    | RemoveMinutasTarefa
    | UpdateDocumento
    | UpdateDocumentoSuccess
    | UpdateDocumentoFailed
    | ConverteMinutaEmAnexo
    | ConverteMinutaEmAnexoSuccess
    | ConverteMinutaEmAnexoFailed
    | AddDocumentoId
    | CreateComponenteDigital
    | CreateComponenteDigitalSuccess
    | SaveComponenteDigitalMinuta
    | SaveComponenteDigitalMinutaSuccess
    | SaveComponenteDigitalMinutaFailed
    | GetDocumento
    | GetDocumentoSuccess
    | GetDocumentoFailed
    | VisualizarModelo
    | VisualizarModeloFailed
    | SetSavingMinutas;
