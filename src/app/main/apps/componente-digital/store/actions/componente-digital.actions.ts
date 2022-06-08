import {Action} from '@ngrx/store';

export const UNLOAD_COMPONENTE_DIGITAL = '[COMPONENTE DIGITAL LINK] UNLOAD COMPONENTE DIGITAL';
export const DOWNLOAD_COMPONENTE_DIGITAL = '[COMPONENTE DIGITAL LINK] DOWNLOAD COMPONENTE DIGITAL';
export const DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS = '[COMPONENTE DIGITAL LINK] DOWNLOAD COMPONENTE DIGITAL SUCCESS';
export const DOWNLOAD_COMPONENTE_DIGITAL_FAILED = '[COMPONENTE DIGITAL LINK] DOWNLOAD COMPONENTE DIGITAL FAILED';

/**
 * Unload ComponenteDigital
 */
export class UnloadComponenteDigital implements Action {
    readonly type = UNLOAD_COMPONENTE_DIGITAL;

    constructor() {
    }
}

/**
 * Download ComponenteDigital
 */
export class DownloadComponenteDigital implements Action {
    readonly type = DOWNLOAD_COMPONENTE_DIGITAL;

    constructor() {
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

export type ComponenteDigitalActionsAll
    = UnloadComponenteDigital
    | DownloadComponenteDigital
    | DownloadComponenteDigitalSuccess
    | DownloadComponenteDigitalFailed;
