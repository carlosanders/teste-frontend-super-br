import { Action } from '@ngrx/store';

export const SAVE_DOCUMENTO_AVULSO = '[DOCUMENTO] SAVE DOCUMENTO AVULSO';
export const SAVE_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO] SAVE DOCUMENTO AVULSO SUCCESS';
export const SAVE_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO] SAVE DOCUMENTO AVULSO FAILED';

export const REMETER_DOCUMENTO_AVULSO = '[DOCUMENTO] REMETER DOCUMENTO AVULSO';
export const REMETER_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO] REMETER DOCUMENTO AVULSO SUCCESS';
export const REMETER_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO] REMETER DOCUMENTO AVULSO FAILED';

export const TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO = '[DOCUMENTO] TOGGLE ENCERRAMENTO DOCUMENTO AVULSO';
export const TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO] TOGGLE ENCERRAMENTO DOCUMENTO AVULSO SUCCESS';
export const TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO] TOGGLE ENCERRAMENTO DOCUMENTO AVULSO FAILED';

/**
 * Save Documento Avulso
 */
export class SaveDocumentoAvulso implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Documento Avulso Success
 */
export class SaveDocumentoAvulsoSuccess implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Documento Avulso Failed
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

    constructor()
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

export type DocumentoAvulsoActionsAll
    = SaveDocumentoAvulso
    | SaveDocumentoAvulsoSuccess
    | SaveDocumentoAvulsoFailed
    | ToggleEncerramentoDocumentoAvulso
    | ToggleEncerramentoDocumentoAvulsoSuccess
    | ToggleEncerramentoDocumentoAvulsoFailed
    | RemeterDocumentoAvulso
    | RemeterDocumentoAvulsoSuccess
    | RemeterDocumentoAvulsoFailed;
