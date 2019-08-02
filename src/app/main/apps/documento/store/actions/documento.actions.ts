import { Action } from '@ngrx/store';

export const GET_DOCUMENTO = '[DOCUMENTO] GET DOCUMENTO';
export const GET_DOCUMENTO_SUCCESS = '[DOCUMENTO] GET DOCUMENTO SUCCESS';
export const GET_DOCUMENTO_FAILED = '[DOCUMENTO] GET DOCUMENTO FAILED';

export const SAVE_DOCUMENTO = '[DOCUMENTO] SAVE DOCUMENTO';
export const SAVE_DOCUMENTO_SUCCESS = '[DOCUMENTO] SAVE DOCUMENTO SUCCESS';
export const SAVE_DOCUMENTO_FAILED = '[DOCUMENTO] SAVE DOCUMENTO FAILED';

export const SAVE_DOCUMENTO_AVULSO = '[DOCUMENTO] SAVE DOCUMENTO AVULSO';
export const SAVE_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO] SAVE DOCUMENTO AVULSO SUCCESS';
export const SAVE_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO] SAVE DOCUMENTO AVULSO FAILED';

export const SAVE_MODELO = '[MODELO] SAVE MODELO';
export const SAVE_MODELO_SUCCESS = '[MODELO] SAVE MODELO SUCCESS';
export const SAVE_MODELO_FAILED = '[MODELO] SAVE MODELO FAILED';

export const SAVE_REPOSITORIO = '[REPOSITORIO] SAVE REPOSITORIO';
export const SAVE_REPOSITORIO_SUCCESS = '[REPOSITORIO] SAVE REPOSITORIO SUCCESS';
export const SAVE_REPOSITORIO_FAILED = '[REPOSITORIO] SAVE REPOSITORIO FAILED';

export const REMETER_DOCUMENTO_AVULSO = '[DOCUMENTO] REMETER DOCUMENTO AVULSO';
export const REMETER_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO] REMETER DOCUMENTO AVULSO SUCCESS';
export const REMETER_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO] REMETER DOCUMENTO AVULSO FAILED';

export const SET_CURRENT_STEP = '[DOCUMENTO] SET CURRENT STEP';
export const SET_CURRENT_STEP_SUCCESS = '[DOCUMENTO] SET CURRENT STEP SUCCESS';
export const SET_CURRENT_STEP_FAILED = '[DOCUMENTO] SET CURRENT STEP FAILED';

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
 * Save Documento
 */
export class SaveDocumento implements Action
{
    readonly type = SAVE_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Documento Success
 */
export class SaveDocumentoSuccess implements Action
{
    readonly type = SAVE_DOCUMENTO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Documento Failed
 */
export class SaveDocumentoFailed implements Action
{
    readonly type = SAVE_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Modelo
 */
export class SaveModelo implements Action
{
    readonly type = SAVE_MODELO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Modelo Success
 */
export class SaveModeloSuccess implements Action
{
    readonly type = SAVE_MODELO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Modelo Failed
 */
export class SaveModeloFailed implements Action
{
    readonly type = SAVE_MODELO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Repositorio
 */
export class SaveRepositorio implements Action
{
    readonly type = SAVE_REPOSITORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Repositorio Success
 */
export class SaveRepositorioSuccess implements Action
{
    readonly type = SAVE_REPOSITORIO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Repositorio Failed
 */
export class SaveRepositorioFailed implements Action
{
    readonly type = SAVE_REPOSITORIO_FAILED;

    constructor(public payload: any)
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

export type DocumentoActionsAll
    = GetDocumento
    | GetDocumentoSuccess
    | GetDocumentoFailed
    | SaveDocumento
    | SaveDocumentoSuccess
    | SaveDocumentoFailed
    | SaveModelo
    | SaveModeloSuccess
    | SaveModeloFailed
    | SaveRepositorio
    | SaveRepositorioSuccess
    | SaveRepositorioFailed
    | SaveDocumentoAvulso
    | SaveDocumentoAvulsoSuccess
    | SaveDocumentoAvulsoFailed
    | RemeterDocumentoAvulso
    | RemeterDocumentoAvulsoSuccess
    | RemeterDocumentoAvulsoFailed
    | SetCurrentStep
    | SetCurrentStepSuccess
    | SetCurrentStepFailed;
