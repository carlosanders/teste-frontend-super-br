import {Action} from '@ngrx/store';

export const CREATE_COMPONENTE_DIGITAL = '[DOCUMENTO MODELO BLOCO] CREATE COMPONENTE DIGITAL';
export const CREATE_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO MODELO BLOCO] CREATE COMPONENTE DIGITAL SUCCESS';

export const SAVE_COMPONENTE_DIGITAL = '[DOCUMENTO MODELO BLOCO] SAVE COMPONENTE DIGITAL';
export const SAVE_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO MODELO BLOCO] SAVE COMPONENTE DIGITAL SUCCESS';
export const SAVE_COMPONENTE_DIGITAL_FAILED = '[DOCUMENTO MODELO BLOCO] SAVE COMPONENTE DIGITAL FAILED';

export const GET_DOCUMENTO = '[DOCUMENTO MODELO BLOCO] GET DOCUMENTO';
export const GET_DOCUMENTO_SUCCESS = '[DOCUMENTO MODELO BLOCO] GET DOCUMENTO SUCCESS';
export const GET_DOCUMENTO_FAILED = '[DOCUMENTO MODELO BLOCO] GET DOCUMENTO FAILED';

export const VISUALIZAR_MODELO = '[DOCUMENTO MODELO BLOCO] VISUALIZAR MODELO';
export const VISUALIZAR_MODELO_FAILED = '[DOCUMENTO MODELO BLOCO] VISUALIZAR MODELO FAILED';

/**
 * Save Componente Digital
 */
export class SaveComponenteDigital implements Action {
    readonly type = SAVE_COMPONENTE_DIGITAL;

    constructor(public payload: any) {
    }
}

/**
 * Save Componente Digital Success
 */
export class SaveComponenteDigitalSuccess implements Action {
    readonly type = SAVE_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Componente Digital Failed
 */
export class SaveComponenteDigitalFailed implements Action {
    readonly type = SAVE_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Componente Digital
 */
export class CreateComponenteDigital implements Action {
    readonly type = CREATE_COMPONENTE_DIGITAL;

    constructor(public payload: any) {
    }
}

/**
 * Create Componente Digital Success
 */
export class CreateComponenteDigitalSuccess implements Action {
    readonly type = CREATE_COMPONENTE_DIGITAL_SUCCESS;

    constructor() {
    }
}

/**
 * Get Documento
 */
export class GetDocumento implements Action {
    readonly type = GET_DOCUMENTO;

    constructor(public payload: any) {
    }
}

/**
 * Get Documento Success
 */
export class GetDocumentoSuccess implements Action {
    readonly type = GET_DOCUMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Documento Failed
 */
export class GetDocumentoFailed implements Action {
    readonly type = GET_DOCUMENTO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Visualizar Modelo
 */
export class VisualizarModelo implements Action {
    readonly type = VISUALIZAR_MODELO;

    constructor(public payload: string) {
    }
}

/**
 * Visualizar Modelo Failed
 */
export class VisualizarModeloFailed implements Action {
    readonly type = VISUALIZAR_MODELO_FAILED;

    constructor(public payload: string) {
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
