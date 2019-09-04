import { Action } from '@ngrx/store';

export const SAVE_COMPONENTE_DIGITAL = '[DOCUMENTO REPOSITORIO] SAVE COMPONENTE DIGITAL';
export const SAVE_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO REPOSITORIO] SAVE COMPONENTE DIGITAL SUCCESS';
export const SAVE_COMPONENTE_DIGITAL_FAILED = '[DOCUMENTO REPOSITORIO] SAVE COMPONENTE DIGITAL FAILED';

export const DOWNLOAD_COMPONENTE_DIGITAL = '[DOCUMENTO REPOSITORIO] DOWNLOAD COMPONENTE DIGITAL';
export const DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO REPOSITORIO] DOWNLOAD COMPONENTE DIGITAL SUCCESS';
export const DOWNLOAD_COMPONENTE_DIGITAL_FAILED = '[DOCUMENTO REPOSITORIO] DOWNLOAD COMPONENTE DIGITAL FAILED';

export const SET_REPOSITORIO_COMPONENTE_DIGITAL = '[DOCUMENTO REPOSITORIO] SET REPOSITORIO COMPONENTE DIGITAL';

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
 * Set Repositorio Componente Digital
 */
export class SetRepositorioComponenteDigital implements Action
{
    readonly type = SET_REPOSITORIO_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

export type ComponenteDigitalActionsAll
    = DownloadComponenteDigital
    | DownloadComponenteDigitalSuccess
    | DownloadComponenteDigitalFailed
    | SaveComponenteDigital
    | SaveComponenteDigitalSuccess
    | SaveComponenteDigitalFailed
    | SetRepositorioComponenteDigital;
