import {Action} from '@ngrx/store';

export const SAVE_COMPONENTE_DIGITAL = '[DOCUMENTO AVULSO EDIT REPOSITORIO] SAVE COMPONENTE DIGITAL';
export const SAVE_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO AVULSO EDIT REPOSITORIO] SAVE COMPONENTE DIGITAL SUCCESS';
export const SAVE_COMPONENTE_DIGITAL_FAILED = '[DOCUMENTO AVULSO EDIT REPOSITORIO] SAVE COMPONENTE DIGITAL FAILED';

export const DOWNLOAD_COMPONENTE_DIGITAL = '[DOCUMENTO AVULSO EDIT REPOSITORIO] DOWNLOAD COMPONENTE DIGITAL';
export const DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO AVULSO EDIT REPOSITORIO] DOWNLOAD COMPONENTE DIGITAL SUCCESS';
export const DOWNLOAD_COMPONENTE_DIGITAL_FAILED = '[DOCUMENTO AVULSO EDIT REPOSITORIO] DOWNLOAD COMPONENTE DIGITAL FAILED';

export const SET_REPOSITORIO_COMPONENTE_DIGITAL = '[DOCUMENTO AVULSO EDIT REPOSITORIO] SET REPOSITORIO COMPONENTE DIGITAL';

export const APPROVE_COMPONENTE_DIGITAL = '[DOCUMENTO AVULSO EDIT REPOSITORIO] APPROVE COMPONENTE DIGITAL';
export const APPROVE_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO AVULSO EDIT REPOSITORIO] APPROVE COMPONENTE DIGITAL SUCCESS';
export const APPROVE_COMPONENTE_DIGITAL_FAILED = '[DOCUMENTO AVULSO EDIT REPOSITORIO] APPROVE COMPONENTE DIGITAL FAILED';

export const GET_COMPONENTES_DIGITAIS = '[DOCUMENTO AVULSO EDIT COMPONENTE DIGITAL] GET COMPONENTES DIGITAIS';
export const GET_COMPONENTES_DIGITAIS_SUCCESS = '[DOCUMENTO AVULSO EDIT COMPONENTE DIGITAL] GET COMPONENTES DIGITAIS SUCCESS';
export const GET_COMPONENTES_DIGITAIS_FAILED = '[DOCUMENTO AVULSO EDIT COMPONENTE DIGITAL] GET COMPONENTES DIGITAIS FAILED';

export const RELOAD_COMPONENTES_DIGITAIS = '[DOCUMENTO AVULSO EDIT COMPONENTE DIGITAL] RELOAD COMPONENTES DIGITAIS';

export const DELETE_COMPONENTE_DIGITAL = '[DOCUMENTO AVULSO EDIT ANEXOS COMPONENTE DIGITAL] DELETE COMPONENTE DIGITAL';
export const DELETE_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO AVULSO EDIT ANEXOS COMPONENTE DIGITAL] DELETE COMPONENTE DIGITAL SUCCESS';
export const DELETE_COMPONENTE_DIGITAL_FAILED = '[DOCUMENTO EDIT ANEXOS COMPONENTE DIGITAL] DELETE COMPONENTE DIGITAL FAILED';

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
    | DeleteComponenteDigitalFailed;
