import {Action} from '@ngrx/store';

export const GET_ASSINATURAS_DOCUMENTO = '[DOCUMENTO EDIT ASSINATURA] GET ASSINATURAS';
export const GET_ASSINATURAS_DOCUMENTO_SUCCESS = '[DOCUMENTO EDIT ASSINATURA] GET ASSINATURAS SUCCESS';
export const GET_ASSINATURAS_DOCUMENTO_FAILED = '[DOCUMENTO EDIT ASSINATURA] GET ASSINATURAS FAILED';

export const RELOAD_ASSINATURAS_DOCUMENTO = '[DOCUMENTO EDIT ASSINATURA] RELOAD ASSINATURAS';

export const DELETE_ASSINATURA_DOCUMENTO = '[DOCUMENTO EDIT ASSINATURA] DELETE ASSINATURA';
export const DELETE_ASSINATURA_DOCUMENTO_SUCCESS = '[DOCUMENTO EDIT ASSINATURA] DELETE ASSINATURA SUCCESS';
export const DELETE_ASSINATURA_DOCUMENTO_FAILED = '[DOCUMENTO EDIT ASSINATURA] DELETE ASSINATURA FAILED';

export const GET_ASSINATURA_DOCUMENTO = '[DOCUMENTO EDIT ASSINATURA] GET ASSINATURA';
export const GET_ASSINATURA_DOCUMENTO_SUCCESS = '[DOCUMENTO EDIT ASSINATURA] GET ASSINATURA SUCCESS';
export const GET_ASSINATURA_DOCUMENTO_FAILED = '[DOCUMENTO EDIT ASSINATURA] GET ASSINATURA FAILED';

export const SAVE_ASSINATURA_DOCUMENTO = '[DOCUMENTO EDIT ASSINATURA] SAVE DOCUMENTO ASSINATURA';
export const SAVE_ASSINATURA_DOCUMENTO_SUCCESS = '[DOCUMENTO EDIT ASSINATURA] SAVE ASSINATURA DOCUMENTO SUCCESS';
export const SAVE_ASSINATURA_DOCUMENTO_FAILED = '[DOCUMENTO EDIT ASSINATURA] SAVE ASSINATURA DOCUMENTO FAILED';

export const UNLOAD_ASSINATURAS = '[DOCUMENTO EDIT ASSINATURA] UNLOAD ASSINATURAS';

/**
 * Get Assinaturas
 */
export class GetAssinaturas implements Action
{
    readonly type = GET_ASSINATURAS_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Assinaturas Success
 */
export class GetAssinaturasSuccess implements Action
{
    readonly type = GET_ASSINATURAS_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Assinaturas Failed
 */
export class GetAssinaturasFailed implements Action
{
    readonly type = GET_ASSINATURAS_DOCUMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Assinaturas
 */
export class ReloadAssinaturas implements Action
{
    readonly type = RELOAD_ASSINATURAS_DOCUMENTO;

    constructor()
    {
    }
}

/**
 * Delete Assinatura
 */
export class DeleteAssinatura implements Action
{
    readonly type = DELETE_ASSINATURA_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Assinatura Success
 */
export class DeleteAssinaturaSuccess implements Action
{
    readonly type = DELETE_ASSINATURA_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Assinatura Failed
 */
export class DeleteAssinaturaFailed implements Action
{
    readonly type = DELETE_ASSINATURA_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Get Assinatura
 */
export class GetAssinatura implements Action
{
    readonly type = GET_ASSINATURA_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Assinatura Success
 */
export class GetAssinaturaSuccess implements Action
{
    readonly type = GET_ASSINATURA_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Assinatura Failed
 */
export class GetAssinaturaFailed implements Action
{
    readonly type = GET_ASSINATURA_DOCUMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}


/**
 * Save AssinaturaDocumento
 */
export class SaveAssinaturaDocumento implements Action
{
    readonly type = SAVE_ASSINATURA_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Assinatura Success
 */
export class SaveAssinaturaDocumentoSuccess implements Action
{
    readonly type = SAVE_ASSINATURA_DOCUMENTO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Assinatura Failed
 */
export class SaveAssinaturaDocumentoFailed implements Action
{
    readonly type = SAVE_ASSINATURA_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Assinaturas
 */
export class UnloadAssinaturas implements Action
{
    readonly type = UNLOAD_ASSINATURAS;

    constructor() {
    }
}

export type AssinaturaActionsAll
    = GetAssinaturas
    | GetAssinaturasSuccess
    | GetAssinaturasFailed
    | GetAssinatura
    | GetAssinaturaSuccess
    | GetAssinaturaFailed
    | ReloadAssinaturas
    | DeleteAssinatura
    | DeleteAssinaturaSuccess
    | DeleteAssinaturaFailed
    | SaveAssinaturaDocumento
    | SaveAssinaturaDocumentoSuccess
    | SaveAssinaturaDocumentoFailed
    | UnloadAssinaturas;

