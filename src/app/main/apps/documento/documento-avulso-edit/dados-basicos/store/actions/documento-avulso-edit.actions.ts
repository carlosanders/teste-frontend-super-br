import {Action} from '@ngrx/store';

export const SAVE_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO EDIT] SAVE DOCUMENTO AVULSO';
export const SAVE_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO AVULSO EDIT] SAVE DOCUMENTO AVULSO SUCCESS';
export const SAVE_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO AVULSO EDIT] SAVE DOCUMENTO AVULSO FAILED';

export const REMETER_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO EDIT] REMETER DOCUMENTO AVULSO';
export const REMETER_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO AVULSO EDIT] REMETER DOCUMENTO AVULSO SUCCESS';
export const REMETER_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO AVULSO EDIT] REMETER DOCUMENTO AVULSO FAILED';

export const TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO EDIT] TOGGLE ENCERRAMENTO DOCUMENTO AVULSO';
export const TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO AVULSO EDIT] TOGGLE ENCERRAMENTO DOCUMENTO AVULSO SUCCESS';
export const TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO AVULSO EDIT] TOGGLE ENCERRAMENTO DOCUMENTO AVULSO FAILED';

export const UNLOAD_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO EDIT] UNLOAD DOCUMENTO AVULSO';

/**
 * Unload DocumentoAvulso
 */
export class UnloadDocumentoAvulso implements Action
{
    readonly type = UNLOAD_DOCUMENTO_AVULSO;

    constructor()
    {
    }
}

/**
 * Save DocumentoAvulso
 */
export class SaveDocumentoAvulso implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DocumentoAvulso Success
 */
export class SaveDocumentoAvulsoSuccess implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save DocumentoAvulso Failed
 */
export class SaveDocumentoAvulsoFailed implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Remeter Documento Avulso
 */
export class RemeterDocumentoAvulso implements Action
{
    readonly type = REMETER_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Remeter Documento Avulso Success
 */
export class RemeterDocumentoAvulsoSuccess implements Action
{
    readonly type = REMETER_DOCUMENTO_AVULSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Remeter Documento Avulso Failed
 */
export class RemeterDocumentoAvulsoFailed implements Action
{
    readonly type = REMETER_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Encerramento Documento Avulso
 */
export class ToggleEncerramentoDocumentoAvulso implements Action
{
    readonly type = TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Encerramento Documento Avulso Success
 */
export class ToggleEncerramentoDocumentoAvulsoSuccess implements Action
{
    readonly type = TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Toggle Encerramento Documento Avulso Failed
 */
export class ToggleEncerramentoDocumentoAvulsoFailed implements Action
{
    readonly type = TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type DocumentoAvulsoEditActionsAll
    = SaveDocumentoAvulso
    | SaveDocumentoAvulsoSuccess
    | SaveDocumentoAvulsoFailed
    | ToggleEncerramentoDocumentoAvulso
    | ToggleEncerramentoDocumentoAvulsoSuccess
    | ToggleEncerramentoDocumentoAvulsoFailed
    | RemeterDocumentoAvulso
    | RemeterDocumentoAvulsoSuccess
    | RemeterDocumentoAvulsoFailed
    | UnloadDocumentoAvulso;
