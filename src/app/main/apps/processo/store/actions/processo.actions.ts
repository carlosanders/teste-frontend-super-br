import { Action } from '@ngrx/store';


export const CREATE_PROCESSO = '[PROCESSO] CREATE PROCESSO';

export const GET_PROCESSO = '[PROCESSO] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[PROCESSO] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[PROCESSO] GET PROCESSO FAILED';

export const DOWNLOAD_AS_PDF_PROCESSO = '[PROCESSO] DOWNLOAD AS PDF PROCESSO';
export const DOWNLOAD_AS_PDF_PROCESSO_SUCCESS = '[PROCESSO] DOWNLOAD AS PDF PROCESSO SUCCESS';
export const DOWNLOAD_AS_PDF_PROCESSO_FAILED = '[PROCESSO] DOWNLOAD AS PDF PROCESSO FAILED';

export const CREATE_VINCULACAO_ETIQUETA = '[PROCESSO] VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[PROCESSO] VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[PROCESSO] VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[PROCESSO] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[PROCESSO] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[PROCESSO] DELETE VINCULACAO_ETIQUETA FAILED';

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

/**
 * Delete Vinculacao Etiqueta
 */
export class DeleteVinculacaoEtiqueta implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Vinculacao Etiqueta Success
 */
export class DeleteVinculacaoEtiquetaSuccess implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Vinculacao Etiqueta Failed
 */
export class DeleteVinculacaoEtiquetaFailed implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta
 */
export class CreateVinculacaoEtiqueta implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta Success
 */
export class CreateVinculacaoEtiquetaSuccess implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta Failed
 */
export class CreateVinculacaoEtiquetaFailed implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ProcessoActionsAll
    = CreateProcesso
    | GetProcesso
    | GetProcessoSuccess
    | GetProcessoFailed
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed
    | DownloadAsPdfProcesso
    | DownloadAsPdfProcessoSuccess
    | DownloadAsPdfProcessoFailed;
