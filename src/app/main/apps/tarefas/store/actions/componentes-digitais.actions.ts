import {Action} from '@ngrx/store';

export const CREATE_COMPONENTE_DIGITAL = '[TAREFAS] CREATE COMPONENTE DIGITAL';
export const CREATE_COMPONENTE_DIGITAL_SUCCESS = '[TAREFAS] CREATE COMPONENTE DIGITAL SUCCESS';

export const SAVE_COMPONENTE_DIGITAL = '[TAREFAS] SAVE COMPONENTE DIGITAL';
export const SAVE_COMPONENTE_DIGITAL_SUCCESS = '[TAREFAS] SAVE COMPONENTE DIGITAL SUCCESS';
export const SAVE_COMPONENTE_DIGITAL_FAILED = '[TAREFAS] SAVE COMPONENTE DIGITAL FAILED';

export const DOWNLOAD_COMPONENTE_DIGITAL = '[TAREFAS] DOWNLOAD COMPONENTE DIGITAL';
export const DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS = '[TAREFAS] DOWNLOAD COMPONENTE DIGITAL SUCCESS';
export const DOWNLOAD_COMPONENTE_DIGITAL_FAILED = '[TAREFAS] DOWNLOAD COMPONENTE DIGITAL FAILED';

export const GET_DOCUMENTO = '[TAREFAS] GET DOCUMENTO';
export const GET_DOCUMENTO_SUCCESS = '[TAREFAS] GET DOCUMENTO SUCCESS';
export const GET_DOCUMENTO_FAILED = '[TAREFAS] GET DOCUMENTO FAILED';

export const VISUALIZAR_MODELO = '[TAREFAS] VISUALIZAR MODELO';
export const VISUALIZAR_MODELO_FAILED = '[TAREFAS] VISUALIZAR MODELO FAILED';

export const APROVAR_DOCUMENTO = '[TAREFAS] APROVAR DOCUMENTO';
export const APROVAR_DOCUMENTO_SUCCESS = '[TAREFAS] APROVAR DOCUMENTO SUCCESS';
export const APROVAR_DOCUMENTO_FAILED = '[TAREFAS] APROVAR DOCUMENTO FAILED';

/**
 * Save Componente Digital
 */
export class SaveComponenteDigital implements Action
{
    readonly type = SAVE_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Success
 */
export class SaveComponenteDigitalSuccess implements Action
{
    readonly type = SAVE_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Failed
 */
export class SaveComponenteDigitalFailed implements Action
{
    readonly type = SAVE_COMPONENTE_DIGITAL_FAILED;

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

/**
 * Download ComponenteDigital
 */
export class DownloadComponenteDigital implements Action {
    readonly type = DOWNLOAD_COMPONENTE_DIGITAL;

    constructor(public payload: any) {
    }
}

/**
 * Download ComponenteDigital Success
 */
export class DownloadComponenteDigitalSuccess implements Action {
    readonly type = DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Download ComponenteDigital Failed
 */
export class DownloadComponenteDigitalFailed implements Action {
    readonly type = DOWNLOAD_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Aprovar Documento
 */

export class AprovarDocumento implements Action
{
    readonly type = APROVAR_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

export class AprovarDocumentoSuccess implements Action
{
    readonly type = APROVAR_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class AprovarDocumentoFailed implements Action
{
    readonly type = APROVAR_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ComponenteDigitalActionsAll
    = CreateComponenteDigital
    | CreateComponenteDigitalSuccess
    | SaveComponenteDigital
    | SaveComponenteDigitalSuccess
    | SaveComponenteDigitalFailed
    | GetDocumento
    | GetDocumentoSuccess
    | GetDocumentoFailed
    | VisualizarModelo
    | VisualizarModeloFailed
    | DownloadComponenteDigital
    | DownloadComponenteDigitalSuccess
    | DownloadComponenteDigitalFailed
    | AprovarDocumento
    | AprovarDocumentoSuccess
    | AprovarDocumentoFailed;
