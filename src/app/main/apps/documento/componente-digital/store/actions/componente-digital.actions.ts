import {Action} from '@ngrx/store';

export const UNLOAD_COMPONENTE_DIGITAL = '[COMPONENTE DIGITAL] UNLOAD COMPONENTE DIGITAL';

export const DOWNLOAD_COMPONENTE_DIGITAL = '[COMPONENTE DIGITAL] DOWNLOAD COMPONENTE DIGITAL';
export const DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS = '[COMPONENTE DIGITAL] DOWNLOAD COMPONENTE DIGITAL SUCCESS';
export const DOWNLOAD_COMPONENTE_DIGITAL_FAILED = '[COMPONENTE DIGITAL] DOWNLOAD COMPONENTE DIGITAL FAILED';

export const DOWNLOAD_AS_PDF_COMPONENTE_DIGITAL = '[COMPONENTE DIGITAL] DOWNLOAD AS PDF COMPONENTE DIGITAL';
export const DOWNLOAD_AS_PDF_COMPONENTE_DIGITAL_SUCCESS = '[COMPONENTE DIGITAL] AS PDF DOWNLOAD COMPONENTE DIGITAL SUCCESS';
export const DOWNLOAD_AS_PDF_COMPONENTE_DIGITAL_FAILED = '[COMPONENTE DIGITAL] AS PDF DOWNLOAD COMPONENTE DIGITAL FAILED';

export const VISUALIZAR_VERSAO_COMPONENTE_DIGITAL = '[COMPONENTE DIGITAL] VISUALIZAR VERSAO COMPONENTE DIGITAL';
export const VISUALIZAR_VERSAO_COMPONENTE_DIGITAL_SUCCESS = '[COMPONENTE DIGITAL] VISUALIZAR VERSAO COMPONENTE DIGITAL SUCCESS';
export const VISUALIZAR_VERSAO_COMPONENTE_DIGITAL_FAILED = '[COMPONENTE DIGITAL] VISUALIZAR VERSAO COMPONENTE DIGITAL FAILED';

export const COMPARAR_VERSAO_COMPONENTE_DIGITAL = '[COMPONENTE DIGITAL] COMPARAR VERSAO COMPONENTE DIGITAL';
export const COMPARAR_VERSAO_COMPONENTE_DIGITAL_SUCCESS = '[COMPONENTE DIGITAL] COMPARAR VERSAO COMPONENTE DIGITAL SUCCESS';
export const COMPARAR_VERSAO_COMPONENTE_DIGITAL_FAILED = '[COMPONENTE DIGITAL] COMPARAR VERSAO COMPONENTE DIGITAL FAILED';


export const SAVE_COMPONENTE_DIGITAL = '[COMPONENTE DIGITAL] SAVE COMPONENTE DIGITAL';
export const SAVE_COMPONENTE_DIGITAL_SUCCESS = '[COMPONENTE DIGITAL] SAVE COMPONENTE DIGITAL SUCCESS';
export const SAVE_COMPONENTE_DIGITAL_FAILED = '[COMPONENTE DIGITAL] SAVE COMPONENTE DIGITAL FAILED';

export const REVERT_COMPONENTE_DIGITAL = '[COMPONENTE DIGITAL] REVERT COMPONENTE DIGITAL';
export const REVERT_COMPONENTE_DIGITAL_SUCCESS = '[COMPONENTE DIGITAL] REVERT COMPONENTE DIGITAL SUCCESS';
export const REVERT_COMPONENTE_DIGITAL_FAILED = '[COMPONENTE DIGITAL] REVERT COMPONENTE DIGITAL FAILED';

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

/**
 * VisualizarVersao ComponenteDigital
 */
export class VisualizarVersaoComponenteDigital implements Action {
    readonly type = VISUALIZAR_VERSAO_COMPONENTE_DIGITAL;

    constructor(public payload: string) {
    }
}

/**
 * VisualizarVersao Success ComponenteDigital
 */
export class VisualizarVersaoComponenteDigitalSuccess implements Action {
    readonly type = VISUALIZAR_VERSAO_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: string) {
    }
}

/**
 * VisualizarVersao Failed ComponenteDigital
 */
export class VisualizarVersaoComponenteDigitalFailed implements Action {
    readonly type = VISUALIZAR_VERSAO_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * CompararVersao ComponenteDigital
 */
export class CompararVersaoComponenteDigital implements Action {
    readonly type = COMPARAR_VERSAO_COMPONENTE_DIGITAL;

    constructor(public payload: string) {
    }
}

/**
 * CompararVersao Success ComponenteDigital
 */
export class CompararVersaoComponenteDigitalSuccess implements Action {
    readonly type = COMPARAR_VERSAO_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: string) {
    }
}

/**
 * CompararVersao Failed ComponenteDigital
 */
export class CompararVersaoComponenteDigitalFailed implements Action {
    readonly type = COMPARAR_VERSAO_COMPONENTE_DIGITAL_FAILED;

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

/**
 * Revert ComponenteDigital
 */
export class RevertComponenteDigital implements Action {
    readonly type = REVERT_COMPONENTE_DIGITAL;

    constructor(public payload: any) {
    }
}

/**
 * Revert ComponenteDigital Success
 */
export class RevertComponenteDigitalSuccess implements Action {
    readonly type = REVERT_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save ComponenteDigital Failed
 */
export class RevertComponenteDigitalFailed implements Action {
    readonly type = REVERT_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: any) {
    }
}

export type ComponenteDigitalActionsAll
    = UnloadComponenteDigital
    | VisualizarVersaoComponenteDigital
    | VisualizarVersaoComponenteDigitalSuccess
    | VisualizarVersaoComponenteDigitalFailed
    | CompararVersaoComponenteDigital
    | CompararVersaoComponenteDigitalSuccess
    | CompararVersaoComponenteDigitalFailed
    | DownloadComponenteDigital
    | DownloadComponenteDigitalSuccess
    | DownloadComponenteDigitalFailed
    | DownloadAsPdfComponenteDigital
    | DownloadAsPdfComponenteDigitalSuccess
    | DownloadAsPdfComponenteDigitalFailed
    | SaveComponenteDigital
    | SaveComponenteDigitalSuccess
    | SaveComponenteDigitalFailed
    | RevertComponenteDigital
    | RevertComponenteDigitalSuccess
    | RevertComponenteDigitalFailed;
