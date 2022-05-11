import {Action} from '@ngrx/store';

export const SAVE_COMPONENTE_DIGITAL = '[DOCUMENTO EDIT COMPONENTE DIGITAL REPOSITORIO] SAVE COMPONENTE DIGITAL';
export const SAVE_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO EDIT COMPONENTE DIGITAL REPOSITORIO] SAVE COMPONENTE DIGITAL SUCCESS';
export const SAVE_COMPONENTE_DIGITAL_FAILED = '[DOCUMENTO EDIT COMPONENTE DIGITAL REPOSITORIO] SAVE COMPONENTE DIGITAL FAILED';

export const DOWNLOAD_COMPONENTE_DIGITAL = '[DOCUMENTO EDIT COMPONENTE DIGITAL REPOSITORIO] DOWNLOAD COMPONENTE DIGITAL';
export const DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO EDIT COMPONENTE DIGITAL REPOSITORIO] DOWNLOAD COMPONENTE DIGITAL SUCCESS';
export const DOWNLOAD_COMPONENTE_DIGITAL_FAILED = '[DOCUMENTO EDIT COMPONENTE DIGITAL REPOSITORIO] DOWNLOAD COMPONENTE DIGITAL FAILED';

export const SET_REPOSITORIO_COMPONENTE_DIGITAL = '[DOCUMENTO EDIT COMPONENTE DIGITAL REPOSITORIO] SET REPOSITORIO COMPONENTE DIGITAL';

export const APPROVE_COMPONENTE_DIGITAL = '[DOCUMENTO EDIT COMPONENTE DIGITAL] APPROVE COMPONENTE DIGITAL';
export const APPROVE_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO EDIT COMPONENTE DIGITAL] APPROVE COMPONENTE DIGITAL SUCCESS';
export const APPROVE_COMPONENTE_DIGITAL_FAILED = '[DOCUMENTO EDIT COMPONENTE DIGITAL] APPROVE COMPONENTE DIGITAL FAILED';

export const GET_COMPONENTES_DIGITAIS = '[DOCUMENTO EDIT COMPONENTE DIGITAL] GET COMPONENTE DIGITAL';
export const GET_COMPONENTES_DIGITAIS_SUCCESS = '[DOCUMENTO EDIT COMPONENTE DIGITAL] GET COMPONENTE DIGITAL SUCCESS';
export const GET_COMPONENTES_DIGITAIS_FAILED = '[DOCUMENTO EDIT COMPONENTE DIGITAL] GET COMPONENTE DIGITAL FAILED';

export const RELOAD_COMPONENTES_DIGITAIS = '[DOCUMENTO EDIT COMPONENTE DIGITAL] RELOAD COMPONENTE DIGITAL';

export const DELETE_COMPONENTE_DIGITAL = '[DOCUMENTO EDIT COMPONENTE DIGITAL] DELETE COMPONENTE DIGITAL';
export const DELETE_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO EDIT COMPONENTE DIGITAL] DELETE COMPONENTE DIGITAL SUCCESS';
export const DELETE_COMPONENTE_DIGITAL_FAILED = '[DOCUMENTO EDIT COMPONENTE DIGITAL] DELETE COMPONENTE DIGITAL FAILED';

export const GET_COMPONENTE_DIGITAL = '[DOCUMENTO COMPONENTE DIGITAL] GET COMPONENTE DIGITAL';
export const GET_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO COMPONENTE DIGITAL] GET COMPONENTE DIGITAL SUCCESS';
export const GET_COMPONENTE_DIGITAL_FAILED = '[DOCUMENTO COMPONENTE DIGITAL] GET COMPONENTE DIGITAL FAILED';

export const PATCH_COMPONENTE_DIGITAL = '[DOCUMENTO EDIT COMPONENTE DIGITAL REPOSITORIO] PATCH COMPONENTE DIGITAL';
export const PATCH_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO EDIT COMPONENTE DIGITAL REPOSITORIO] PATCH COMPONENTE DIGITAL SUCCESS';
export const PATCH_COMPONENTE_DIGITAL_FAILED = '[DOCUMENTO EDIT COMPONENTE DIGITAL REPOSITORIO] PATCH COMPONENTE DIGITAL FAILED';


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
 * Delete ComponenteDigital
 */
export class DeleteComponenteDigital implements Action
{
    readonly type = DELETE_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete ComponenteDigital Success
 */
export class DeleteComponenteDigitalSuccess implements Action
{
    readonly type = DELETE_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete ComponenteDigital Failed
 */
export class DeleteComponenteDigitalFailed implements Action
{
    readonly type = DELETE_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: any)
    {
    }
}

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

/**
 * Approve Componente Digital
 */
export class ApproveComponenteDigital implements Action
{
    readonly type = APPROVE_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Approve Componente Digital Success
 */
export class ApproveComponenteDigitalSuccess implements Action
{
    readonly type = APPROVE_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Approve Componente Digital Failed
 */
export class ApproveComponenteDigitalFailed implements Action
{
    readonly type = APPROVE_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Get ComponenteDigital
 */
export class GetComponenteDigital implements Action
{
    readonly type = GET_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ComponenteDigital Success
 */
export class GetComponenteDigitalSuccess implements Action
{
    readonly type = GET_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ComponenteDigital Failed
 */
export class GetComponenteDigitalFailed implements Action
{
    readonly type = GET_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Patch Componente Digital
 */
export class PatchComponenteDigital implements Action
{
    readonly type = PATCH_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Patch Componente Digital Success
 */
export class PatchComponenteDigitalSuccess implements Action
{
    readonly type = PATCH_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Patch Componente Digital Failed
 */
export class PatchComponenteDigitalFailed implements Action
{
    readonly type = PATCH_COMPONENTE_DIGITAL_FAILED;

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
    | SetRepositorioComponenteDigital
    | ApproveComponenteDigital
    | ApproveComponenteDigitalSuccess
    | ApproveComponenteDigitalFailed
    | GetComponentesDigitais
    | GetComponentesDigitaisFailed
    | GetComponentesDigitaisSuccess
    | ReloadComponentesDigitais
    | DeleteComponenteDigital
    | DeleteComponenteDigitalSuccess
    | DeleteComponenteDigitalFailed
    | GetComponenteDigital
    | GetComponenteDigitalFailed
    | GetComponenteDigitalSuccess
    | PatchComponenteDigital
    | PatchComponenteDigitalSuccess
    | PatchComponenteDigitalFailed;
