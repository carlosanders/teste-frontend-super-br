import { Action } from '@ngrx/store';

export const GET_DOCUMENTO = '[DOCUMENTO] GET DOCUMENTO';
export const GET_DOCUMENTO_SUCCESS = '[DOCUMENTO] GET DOCUMENTO SUCCESS';
export const GET_DOCUMENTO_FAILED = '[DOCUMENTO] GET DOCUMENTO FAILED';

export const UNLOAD_DOCUMENTO = '[DOCUMENTO] UNLOAD DOCUMENTO';

export const SET_CURRENT_STEP = '[DOCUMENTO] SET CURRENT STEP';
export const SET_CURRENT_STEP_SUCCESS = '[DOCUMENTO] SET CURRENT STEP SUCCESS';
export const SET_CURRENT_STEP_FAILED = '[DOCUMENTO] SET CURRENT STEP FAILED';

export const ASSINA_DOCUMENTO = '[DOCUMENTO] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_SUCCESS = '[DOCUMENTO] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_FAILED = '[DOCUMENTO] ASSINA DOCUMENTO FAILED';

/**
 * Get Documento
 */
export class GetDocumento implements Action
{
    readonly type = GET_DOCUMENTO;

    constructor()
    {
    }
}

/**
 * Get Documento Success
 */
export class GetDocumentoSuccess implements Action
{
    readonly type = GET_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documento Failed
 */
export class GetDocumentoFailed implements Action
{
    readonly type = GET_DOCUMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload Documento
 */
export class UnloadDocumento implements Action
{
    readonly type = UNLOAD_DOCUMENTO;

    constructor()
    {
    }
}

/**
 * Set Current Step
 */
export class SetCurrentStep implements Action {
    readonly type = SET_CURRENT_STEP;

    constructor(public payload: any) {
    }
}

/**
 * Set Current Step Success
 */
export class SetCurrentStepSuccess implements Action {
    readonly type = SET_CURRENT_STEP_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Set Current Step Failed
 */
export class SetCurrentStepFailed implements Action {
    readonly type = SET_CURRENT_STEP_FAILED;

    constructor(public payload: any) {
    }
}

export type DocumentoActionsAll
    = GetDocumento
    | GetDocumentoSuccess
    | GetDocumentoFailed
    | UnloadDocumento
    | SetCurrentStep
    | SetCurrentStepSuccess
    | SetCurrentStepFailed;
