import {Action} from '@ngrx/store';

export const DOWNLOAD_PROCESSO = '[PROCESSO DOWNLOAD] DOWNLOAD';
export const DOWNLOAD_PROCESSO_SUCCESS = '[PROCESSO DOWNLOAD] DOWNLOAD SUCCESS';
export const DOWNLOAD_PROCESSO_FAILED = '[PROCESSO DOWNLOAD] DOWNLOAD FAILED';

export class DownloadProcesso implements Action
{
    readonly type = DOWNLOAD_PROCESSO;

    constructor(public payload: any)
    {
    }
}

export class DownloadProcessoSuccess implements Action
{
    readonly type = DOWNLOAD_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class DownloadProcessoFailed implements Action
{
    readonly type = DOWNLOAD_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ProcessoDownloadActionsAll
    =  DownloadProcesso
    | DownloadProcessoSuccess
    | DownloadProcessoFailed
    ;
