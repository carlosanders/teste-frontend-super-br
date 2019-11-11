import { Action } from '@ngrx/store';

export const DOWNLOAD_AS_PDF_PROCESSO = '[PROCESSO DOWNLOAD] DOWNLOAD AS PDF';
export const DOWNLOAD_AS_PDF_PROCESSO_SUCCESS = '[PROCESSO DOWNLOAD] DOWNLOAD AS PDF PROCESSO SUCCESS';
export const DOWNLOAD_AS_PDF_PROCESSO_FAILED = '[PROCESSO DOWNLOAD] DOWNLOAD AS PDF PROCESSO FAILED';

export const DOWNLOAD_AS_ZIP_PROCESSO = '[PROCESSO DOWNLOAD] DOWNLOAD AS ZIP';
export const DOWNLOAD_AS_ZIP_PROCESSO_SUCCESS = '[PROCESSO DOWNLOAD] DOWNLOAD AS ZIP PROCESSO SUCCESS';
export const DOWNLOAD_AS_ZIP_PROCESSO_FAILED = '[PROCESSO DOWNLOAD] DOWNLOAD AS ZIP PROCESSO FAILED';

/**
 * DownloadAsPdf Processo
 */
export class DownloadAsPdfProcesso implements Action
{
    readonly type = DOWNLOAD_AS_PDF_PROCESSO;

    constructor(public payload: any)
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

/**
 * DownloadAsZip Processo
 */
export class DownloadAsZipProcesso implements Action
{
    readonly type = DOWNLOAD_AS_ZIP_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * DownloadAsZip Processo Success
 */
export class DownloadAsZipProcessoSuccess implements Action
{
    readonly type = DOWNLOAD_AS_ZIP_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * DownloadAsZip Processo Failed
 */
export class DownloadAsZipProcessoFailed implements Action
{
    readonly type = DOWNLOAD_AS_ZIP_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }
}

export type ProcessoDownloadActionsAll
    =  DownloadAsPdfProcesso
    | DownloadAsPdfProcessoSuccess
    | DownloadAsPdfProcessoFailed
    | DownloadAsZipProcesso
    | DownloadAsZipProcessoSuccess
    | DownloadAsZipProcessoFailed;
