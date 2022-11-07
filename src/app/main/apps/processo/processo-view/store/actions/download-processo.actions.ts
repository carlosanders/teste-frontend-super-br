import {Action} from '@ngrx/store';

export const DOWNLOAD_PROCESSO = '[PROCESSO VIEW] DOWNLOAD';
export const DOWNLOAD_PROCESSO_SUCCESS = '[PROCESSO VIEW] DOWNLOAD SUCCESS';
export const DOWNLOAD_PROCESSO_FAILED = '[PROCESSO VIEW] DOWNLOAD FAILED';

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

export type DownloadProcessoActionsAll
    = DownloadProcesso
    | DownloadProcessoSuccess
    | DownloadProcessoFailed
    ;
