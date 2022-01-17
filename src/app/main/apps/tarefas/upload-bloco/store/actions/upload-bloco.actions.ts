import {Action} from '@ngrx/store';

export const UPLOAD_INICIADO = '[UPLOAD BLOCO] UPLOAD INICIADO';
export const UPLOAD_CONCLUIDO = '[UPLOAD BLOCO] UPLOAD CONCLUIDO';

/**
 * Upload Iniciado
 */
export class UploadIniciado implements Action
{
    readonly type = UPLOAD_INICIADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Upload Concluido
 */
export class UploadConcluido implements Action
{
    readonly type = UPLOAD_CONCLUIDO;

    constructor(public payload: any)
    {
    }
}

export type UploadBlocoActionsAll
    = UploadIniciado
    | UploadConcluido;
