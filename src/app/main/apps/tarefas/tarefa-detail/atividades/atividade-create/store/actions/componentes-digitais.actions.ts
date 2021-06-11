import {Action} from '@ngrx/store';

export const CREATE_COMPONENTE_DIGITAL = '[ATIVIDADE CREATE MODELO] CREATE COMPONENTE DIGITAL';
export const CREATE_COMPONENTE_DIGITAL_SUCCESS = '[ATIVIDADE CREATE MODELO] CREATE COMPONENTE DIGITAL SUCCESS';

export const SAVE_COMPONENTE_DIGITAL = '[ATIVIDADE CREATE MODELO] SAVE COMPONENTE DIGITAL';
export const SAVE_COMPONENTE_DIGITAL_SUCCESS = '[ATIVIDADE CREATE MODELO] SAVE COMPONENTE DIGITAL SUCCESS';
export const SAVE_COMPONENTE_DIGITAL_FAILED = '[ATIVIDADE CREATE MODELO] SAVE COMPONENTE DIGITAL FAILED';

export const GET_DOCUMENTO = '[ATIVIDADE CREATE MODELO] GET DOCUMENTO';
export const GET_DOCUMENTO_SUCCESS = '[ATIVIDADE CREATE MODELO] GET DOCUMENTO SUCCESS';
export const GET_DOCUMENTO_FAILED = '[ATIVIDADE CREATE MODELO] GET DOCUMENTO FAILED';

export const VISUALIZAR_MODELO = '[ATIVIDADE CREATE MODELO] VISUALIZAR MODELO';
export const VISUALIZAR_MODELO_FAILED = '[ATIVIDADE CREATE MODELO] VISUALIZAR MODELO FAILED';

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
    | VisualizarModeloFailed;
