import { Action } from '@ngrx/store';


export const CREATE_PROCESSO = '[PROCESSO] CREATE PROCESSO';

export const GET_PROCESSO = '[PROCESSO] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[PROCESSO] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[PROCESSO] GET PROCESSO FAILED';

export const DOWNLOAD_AS_PDF_PROCESSO = '[PROCESSO] DOWNLOAD AS PDF PROCESSO';
export const DOWNLOAD_AS_PDF_PROCESSO_SUCCESS = '[PROCESSO] DOWNLOAD AS PDF PROCESSO SUCCESS';
export const DOWNLOAD_AS_PDF_PROCESSO_FAILED = '[PROCESSO] DOWNLOAD AS PDF PROCESSO FAILED';

/**
 * Create Processo
 */
export class CreateProcesso implements Action
{
    readonly type = CREATE_PROCESSO;

    constructor()
    {
    }
}

/**
 * Get Processo
 */
export class GetProcesso implements Action
{
    readonly type = GET_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Success
 */
export class GetProcessoSuccess implements Action
{
    readonly type = GET_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Failed
 */
export class GetProcessoFailed implements Action
{
    readonly type = GET_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * DownloadAsPdf Processo
 */
export class DownloadAsPdfProcesso implements Action
{
    readonly type = DOWNLOAD_AS_PDF_PROCESSO;

    constructor()
    {
    }
}

/**
 * DownloadAsPdf Processo Success
 */
export class DownloadAsPdfProcessoSuccess implements Action
{
    readonly type = DOWNLOAD_AS_PDF_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * DownloadAsPdf Processo Failed
 */
export class DownloadAsPdfProcessoFailed implements Action
{
    readonly type = DOWNLOAD_AS_PDF_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }
}

export type ProcessoActionsAll
    = CreateProcesso
    | GetProcesso
    | GetProcessoSuccess
    | GetProcessoFailed
    | DownloadAsPdfProcesso
    | DownloadAsPdfProcessoSuccess
    | DownloadAsPdfProcessoFailed;
