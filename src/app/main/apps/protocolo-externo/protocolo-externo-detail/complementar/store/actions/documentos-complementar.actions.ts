import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS_COMPLEMENTARES = '[COMPLEMENTAR DOCUMENTOS] GET DOCUMENTOS COMPLEMENTARES';
export const GET_DOCUMENTOS_COMPLEMENTARES_SUCCESS = '[COMPLEMENTAR DOCUMENTOS] GET DOCUMENTOS COMPLEMENTARRES SUCCESS';
export const GET_DOCUMENTOS_COMPLEMENTARES_FAILED = '[COMPLEMENTAR DOCUMENTOS] GET DOCUMENTOS COMPLEMENTARES FAILED';


/**
 * Get Documentos
 */
export class GetDocumentosComplementares implements Action
{
    readonly type = GET_DOCUMENTOS_COMPLEMENTARES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Success
 */
export class GetDocumentosCompelemtaresSuccess implements Action
{
    readonly type = GET_DOCUMENTOS_COMPLEMENTARES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Failed
 */
export class GetDocumentosComplementaresFailed implements Action
{
    readonly type = GET_DOCUMENTOS_COMPLEMENTARES_FAILED;

    constructor(public payload: string)
    {
    }
}

export type DocumentosComplementaresActionsAll
    = GetDocumentosComplementares
    | GetDocumentosCompelemtaresSuccess
    | GetDocumentosComplementaresFailed;
