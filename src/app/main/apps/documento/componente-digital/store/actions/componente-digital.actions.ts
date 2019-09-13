import {Action} from '@ngrx/store';

export const DOWNLOAD_COMPONENTE_DIGITAL = '[COMPONENTE DIGITAL] DOWNLOAD COMPONENTE DIGITAL';
export const DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS = '[COMPONENTE DIGITAL] DOWNLOAD COMPONENTE DIGITAL SUCCESS';
export const DOWNLOAD_COMPONENTE_DIGITAL_FAILED = '[COMPONENTE DIGITAL] DOWNLOAD COMPONENTE DIGITAL FAILED';

export const DOWNLOAD_AS_PDF_COMPONENTE_DIGITAL = '[COMPONENTE DIGITAL] DOWNLOAD AS PDF COMPONENTE DIGITAL';
export const DOWNLOAD_AS_PDF_COMPONENTE_DIGITAL_SUCCESS = '[COMPONENTE DIGITAL] AS PDF DOWNLOAD COMPONENTE DIGITAL SUCCESS';
export const DOWNLOAD_AS_PDF_COMPONENTE_DIGITAL_FAILED = '[COMPONENTE DIGITAL] AS PDF DOWNLOAD COMPONENTE DIGITAL FAILED';

export const SAVE_COMPONENTE_DIGITAL = '[COMPONENTE DIGITAL] SAVE COMPONENTE DIGITAL';
export const SAVE_COMPONENTE_DIGITAL_SUCCESS = '[COMPONENTE DIGITAL] SAVE COMPONENTE DIGITAL SUCCESS';
export const SAVE_COMPONENTE_DIGITAL_FAILED = '[COMPONENTE DIGITAL] SAVE COMPONENTE DIGITAL FAILED';

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

/**
 * DownloadAsPdf ComponenteDigital
 */
export class DownloadAsPdfComponenteDigital implements Action {
    readonly type = DOWNLOAD_AS_PDF_COMPONENTE_DIGITAL;

    constructor() {
    }
}

/**
 * DownloadAsPdf ComponenteDigital Success
 */
export class DownloadAsPdfComponenteDigitalSuccess implements Action {
    readonly type = DOWNLOAD_AS_PDF_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * DownloadAsPdf ComponenteDigital Failed
 */
export class DownloadAsPdfComponenteDigitalFailed implements Action {
    readonly type = DOWNLOAD_AS_PDF_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save ComponenteDigital
 */
export class SaveComponenteDigital implements Action {
    readonly type = SAVE_COMPONENTE_DIGITAL;

    constructor(public payload: any) {
    }
}

/**
 * Save ComponenteDigital Success
 */
export class SaveComponenteDigitalSuccess implements Action {
    readonly type = SAVE_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save ComponenteDigital Failed
 */
export class SaveComponenteDigitalFailed implements Action {
    readonly type = SAVE_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: any) {
    }
}

export type ComponenteDigitalActionsAll
    = DownloadComponenteDigital
    | DownloadComponenteDigitalSuccess
    | DownloadComponenteDigitalFailed
    | DownloadAsPdfComponenteDigital
    | DownloadAsPdfComponenteDigitalSuccess
    | DownloadAsPdfComponenteDigitalFailed
    | SaveComponenteDigital
    | SaveComponenteDigitalSuccess
    | SaveComponenteDigitalFailed;
