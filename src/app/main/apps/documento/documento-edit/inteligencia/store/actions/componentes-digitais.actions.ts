import {Action} from '@ngrx/store';

export const DOWNLOAD_COMPONENTE_DIGITAL = '[DOCUMENTO EDIT REPOSITORIO] DOWNLOAD COMPONENTE DIGITAL';
export const DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS = '[DOCUMENTO EDIT REPOSITORIO] DOWNLOAD COMPONENTE DIGITAL SUCCESS';
export const DOWNLOAD_COMPONENTE_DIGITAL_FAILED = '[DOCUMENTO EDIT REPOSITORIO] DOWNLOAD COMPONENTE DIGITAL FAILED';

export const SET_REPOSITORIO_COMPONENTE_DIGITAL = '[DOCUMENTO EDIT REPOSITORIO] SET REPOSITORIO COMPONENTE DIGITAL';

export const GET_COMPONENTES_DIGITAIS = '[DOCUMENTO EDIT COMPONENTE DIGITAL] GET COMPONENTES DIGITAIS';
export const GET_COMPONENTES_DIGITAIS_SUCCESS = '[DOCUMENTO EDIT COMPONENTE DIGITAL] GET COMPONENTES DIGITAIS SUCCESS';
export const GET_COMPONENTES_DIGITAIS_FAILED = '[DOCUMENTO EDIT COMPONENTE DIGITAL] GET COMPONENTES DIGITAIS FAILED';

export const RELOAD_COMPONENTES_DIGITAIS = '[DOCUMENTO EDIT COMPONENTE DIGITAL] RELOAD COMPONENTES DIGITAIS';

export const UNLOAD_REPOSITORIO_COMPONENTE_DIGITAL = '[DOCUMENTO EDIT COMPONENTE DIGITAL] UNLOAD COMPONENTE DIGITAL';

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
 * Unload Componente Digital
 */
export class UnloadComponenteDigital implements Action
{
    readonly type = UNLOAD_REPOSITORIO_COMPONENTE_DIGITAL;

    constructor()
    {
    }
}

export type ComponenteDigitalActionsAll
    = DownloadComponenteDigital
    | DownloadComponenteDigitalSuccess
    | DownloadComponenteDigitalFailed
    | SetRepositorioComponenteDigital
    | GetComponentesDigitais
    | GetComponentesDigitaisFailed
    | GetComponentesDigitaisSuccess
    | ReloadComponentesDigitais
    | UnloadComponenteDigital;
