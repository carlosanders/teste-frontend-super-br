import {Action} from '@ngrx/store';

export const CREATE_COMPONENTE_DIGITAL = '[PROCESSO VIEW] CREATE COMPONENTE DIGITAL';
export const CREATE_COMPONENTE_DIGITAL_SUCCESS = '[PROCESSO VIEW] CREATE COMPONENTE DIGITAL SUCCESS';

export const SAVE_COMPONENTE_DIGITAL = '[PROCESSO VIEW] SAVE COMPONENTE DIGITAL';
export const SAVE_COMPONENTE_DIGITAL_SUCCESS = '[PROCESSO VIEW] SAVE COMPONENTE DIGITAL SUCCESS';
export const SAVE_COMPONENTE_DIGITAL_FAILED = '[PROCESSO VIEW] SAVE COMPONENTE DIGITAL FAILED';

export const DOWNLOAD_COMPONENTE_DIGITAL = '[PROCESSO VIEW] DOWNLOAD COMPONENTE DIGITAL';
export const DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS = '[PROCESSO VIEW] DOWNLOAD COMPONENTE DIGITAL SUCCESS';
export const DOWNLOAD_COMPONENTE_DIGITAL_FAILED = '[PROCESSO VIEW] DOWNLOAD COMPONENTE DIGITAL FAILED';

export const APROVAR_COMPONENTE_DIGITAL = '[PROCESSO VIEW] APROVAR COMPONENTE DIGITAL';
export const APROVAR_COMPONENTE_DIGITAL_SUCCESS = '[PROCESSO VIEW] APROVAR COMPONENTE DIGITAL SUCCESS';
export const APROVAR_COMPONENTE_DIGITAL_FAILED = '[PROCESSO VIEW] APROVAR COMPONENTE DIGITAL FAILED';

export const GET_DOCUMENTO = '[PROCESSO VIEW] GET DOCUMENTO';
export const GET_DOCUMENTO_SUCCESS = '[PROCESSO VIEW] GET DOCUMENTO SUCCESS';
export const GET_DOCUMENTO_FAILED = '[PROCESSO VIEW] GET DOCUMENTO FAILED';

export const VISUALIZAR_MODELO = '[PROCESSO VIEW] VISUALIZAR MODELO';
export const VISUALIZAR_MODELO_FAILED = '[PROCESSO VIEW] VISUALIZAR MODELO FAILED';

export const VISUALIZAR_JUNTADA = '[PROCESSO VIEW] VISUALIZAR JUNTADA';
export const VISUALIZAR_JUNTADA_FAILED = '[PROCESSO VIEW] VISUALIZAR JUNTADA FAILED';

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
 * Visualizar Juntada
 */
 export class VisualizarJuntada implements Action
 {
     readonly type = VISUALIZAR_JUNTADA;

     constructor(public payload: any)
     {
     }
 }

 /**
  * Visualizar Juntada Failed
  */
 export class VisualizarJuntadaFailed implements Action
 {
     readonly type = VISUALIZAR_JUNTADA_FAILED;

     constructor(public payload: any)
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

export class AprovarComponenteDigital implements Action {
    readonly type = APROVAR_COMPONENTE_DIGITAL;

    constructor(public payload: any) {
    }
}

export class AprovarComponenteDigitalSuccess implements Action {
    readonly type = APROVAR_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any) {
    }
}

export class AprovarComponenteDigitalFailed implements Action {
    readonly type = APROVAR_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: any) {
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
    | VisualizarJuntada
    | VisualizarJuntadaFailed
    | DownloadComponenteDigital
    | DownloadComponenteDigitalSuccess
    | DownloadComponenteDigitalFailed
    | AprovarComponenteDigital
    | AprovarComponenteDigitalSuccess
    | AprovarComponenteDigitalFailed;
