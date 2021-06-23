import {Action} from '@ngrx/store';

export const CREATE_DOCUMENTO_COPIA = '[DOCUMENTO COPIA CREATE BLOCO] CREATE DOCUMENTO COPIA';
export const CREATE_DOCUMENTO_COPIA_SUCCESS = '[DOCUMENTO COPIA CREATE BLOCO] CREATE DOCUMENTO COPIA SUCCESS';

export const SAVE_DOCUMENTO_COPIA = '[DOCUMENTO COPIA CREATE BLOCO] SAVE DOCUMENTO COPIA';
export const SAVE_DOCUMENTO_COPIA_SUCCESS = '[DOCUMENTO COPIA CREATE BLOCO] SAVE DOCUMENTO COPIA SUCCESS';
export const SAVE_DOCUMENTO_COPIA_FAILED = '[DOCUMENTO COPIA CREATE BLOCO] SAVE DOCUMENTO COPIA FAILED';

/**
 * Save DocumentoCopia
 */
export class SaveDocumentoCopia implements Action
{
    readonly type = SAVE_DOCUMENTO_COPIA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DocumentoCopia Success
 */
export class SaveDocumentoCopiaSuccess implements Action
{
    readonly type = SAVE_DOCUMENTO_COPIA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DocumentoCopia Failed
 */
export class SaveDocumentoCopiaFailed implements Action
{
    readonly type = SAVE_DOCUMENTO_COPIA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create DocumentoCopia
 */
export class CreateDocumentoCopia implements Action
{
    readonly type = CREATE_DOCUMENTO_COPIA;

    constructor(public payload: any)
    {
    }
}

/**
 * Create DocumentoCopia Success
 */
export class CreateDocumentoCopiaSuccess implements Action
{
    readonly type = CREATE_DOCUMENTO_COPIA_SUCCESS;

    constructor()
    {
    }
}

export type DocumentoCopiaCreateBlocoActionsAll
    = CreateDocumentoCopia
    | CreateDocumentoCopiaSuccess
    | SaveDocumentoCopia
    | SaveDocumentoCopiaSuccess
    | SaveDocumentoCopiaFailed;
