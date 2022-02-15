import {Action} from '@ngrx/store';

export const SET_LOADED = '[MODELO COMPONENTE DIGITAL BLOCO] SET LOADED';

export const CREATE_COMPONENTE_DIGITAL = '[MODELO COMPONENTE DIGITAL BLOCO] CREATE COMPONENTE DIGITAL';
export const CREATE_COMPONENTE_DIGITAL_SUCCESS = '[MODELO COMPONENTE DIGITAL BLOCO] CREATE COMPONENTE DIGITAL SUCCESS';

export const GET_COMPONENTES_DIGITAIS = '[MODELO COMPONENTE DIGITAL BLOCO] GET COMPONENTES DIGITAIS';
export const GET_COMPONENTES_DIGITAIS_SUCCESS = '[MODELO COMPONENTE DIGITAL BLOCO] GET COMPONENTES DIGITAIS SUCCESS';
export const GET_COMPONENTES_DIGITAIS_FAILED = '[MODELO COMPONENTE DIGITAL BLOCO] GET COMPONENTES DIGITAIS FAILED';

export const RELOAD_COMPONENTES_DIGITAIS = '[MODELO COMPONENTE DIGITAL BLOCO] RELOAD COMPONENTES DIGITAIS';

export const SAVE_COMPONENTE_DIGITAL = '[MODELO COMPONENTE DIGITAL BLOCO] SAVE COMPONENTE DIGITAL';
export const SAVE_COMPONENTE_DIGITAL_SUCCESS = '[MODELO COMPONENTE DIGITAL BLOCO] SAVE COMPONENTE DIGITAL SUCCESS';
export const SAVE_COMPONENTE_DIGITAL_FAILED = '[MODELO COMPONENTE DIGITAL BLOCO] SAVE COMPONENTE DIGITAL FAILED';

export const GET_DOCUMENTO = '[MODELO COMPONENTE DIGITAL BLOCO] GET DOCUMENTO';
export const GET_DOCUMENTO_SUCCESS = '[MODELO COMPONENTE DIGITAL BLOCO] GET DOCUMENTO SUCCESS';
export const GET_DOCUMENTO_FAILED = '[MODELO COMPONENTE DIGITAL BLOCO] GET DOCUMENTO FAILED';

export const UNLOAD_COMPONENTES_DIGITAIS = '[MODELO COMPONENTE DIGITAL BLOCO] UNLOAD COMPONENTES DIGITAIS';

/**
 * Get ComponentesDigitais
 */
export class GetComponentesDigitais implements Action
{
    readonly type = GET_COMPONENTES_DIGITAIS;

    constructor(public payload: any)
    {
    }
}

/**
 * Set Loaded
 */
export class SetLoaded implements Action
{
    readonly type = SET_LOADED;

    constructor(public payload: any)
    {
    }
}


/**
 * Get ComponentesDigitais Success
 */
export class GetComponentesDigitaisSuccess implements Action
{
    readonly type = GET_COMPONENTES_DIGITAIS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ComponentesDigitais Failed
 */
export class GetComponentesDigitaisFailed implements Action
{
    readonly type = GET_COMPONENTES_DIGITAIS_FAILED;

    constructor(public payload: string)
    {
    }
}

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
 * Reload ComponentesDigitais
 */
export class ReloadComponentesDigitais implements Action
{
    readonly type = RELOAD_COMPONENTES_DIGITAIS;

    constructor()
    {
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
 * Unload ComponentesDigitais
 */
export class UnloadComponentesDigitais implements Action
{
    readonly type = UNLOAD_COMPONENTES_DIGITAIS;

    constructor()
    {
    }
}

export type ComponentesDigitaisActionsAll
    = GetComponentesDigitais
    | GetComponentesDigitaisSuccess
    | GetComponentesDigitaisFailed
    | ReloadComponentesDigitais
    | SaveComponenteDigital
    | SaveComponenteDigitalSuccess
    | SaveComponenteDigitalFailed
    | GetDocumento
    | GetDocumentoSuccess
    | GetDocumentoFailed
    | CreateComponenteDigital
    | CreateComponenteDigitalSuccess
    | SetLoaded
    | UnloadComponentesDigitais;

