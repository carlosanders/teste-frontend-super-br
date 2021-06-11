import {Action} from '@ngrx/store';

export const CREATE_MODALIDADE_ACAO_ETIQUETA = '[ADMIN MODALIDADE_ACAO_ETIQUETA EDIT] CREATE MODALIDADE_ACAO_ETIQUETA';
export const CREATE_MODALIDADE_ACAO_ETIQUETA_SUCCESS = '[ADMIN MODALIDADE_ACAO_ETIQUETA EDIT] CREATE MODALIDADE_ACAO_ETIQUETA SUCCESS';

export const SAVE_MODALIDADE_ACAO_ETIQUETA = '[ADMIN MODALIDADE_ACAO_ETIQUETA EDIT] SAVE MODALIDADE_ACAO_ETIQUETA';
export const SAVE_MODALIDADE_ACAO_ETIQUETA_SUCCESS = '[ADMIN MODALIDADE_ACAO_ETIQUETA EDIT] SAVE MODALIDADE_ACAO_ETIQUETA SUCCESS';
export const SAVE_MODALIDADE_ACAO_ETIQUETA_FAILED = '[ADMIN MODALIDADE_ACAO_ETIQUETA EDIT] SAVE MODALIDADE_ACAO_ETIQUETA FAILED';

export const UPDATE_MODALIDADE_ACAO_ETIQUETA = '[ADMIN MODALIDADE_ACAO_ETIQUETA EDIT] UPDATE MODALIDADE_ACAO_ETIQUETA';
export const UPDATE_MODALIDADE_ACAO_ETIQUETA_SUCCESS = '[ADMIN MODALIDADE_ACAO_ETIQUETA EDIT] UPDATE MODALIDADE_ACAO_ETIQUETA SUCCESS';
export const UPDATE_MODALIDADE_ACAO_ETIQUETA_FAILED = '[ADMIN MODALIDADE_ACAO_ETIQUETA EDIT] UPDATE MODALIDADE_ACAO_ETIQUETA FAILED';

export const GET_MODALIDADE_ACAO_ETIQUETA = '[ADMIN MODALIDADE_ACAO_ETIQUETA EDIT] GET MODALIDADE_ACAO_ETIQUETA';
export const GET_MODALIDADE_ACAO_ETIQUETA_SUCCESS = '[ADMIN MODALIDADE_ACAO_ETIQUETA EDIT] GET MODALIDADE_ACAO_ETIQUETA SUCCESS';
export const GET_MODALIDADE_ACAO_ETIQUETA_FAILED = '[ADMIN MODALIDADE_ACAO_ETIQUETA EDIT] GET MODALIDADE_ACAO_ETIQUETA FAILED';

export const SAVE_COLABORADOR = '[ADMIN MODALIDADE_ACAO_ETIQUETA EDIT] SAVE COLABORADOR';
export const SAVE_COLABORADOR_SUCCESS = '[ADMIN MODALIDADE_ACAO_ETIQUETA EDIT] SAVE COLABORADOR SUCCESS';
export const SAVE_COLABORADOR_FAILED = '[ADMIN MODALIDADE_ACAO_ETIQUETA EDIT] SAVE COLABORADOR FAILED';

/**
 * Get ModalidadeAcaoEtiqueta
 */
export class GetModalidadeAcaoEtiqueta implements Action
{
    readonly type = GET_MODALIDADE_ACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ModalidadeAcaoEtiqueta Success
 */
export class GetModalidadeAcaoEtiquetaSuccess implements Action
{
    readonly type = GET_MODALIDADE_ACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ModalidadeAcaoEtiqueta Failed
 */
export class GetModalidadeAcaoEtiquetaFailed implements Action
{
    readonly type = GET_MODALIDADE_ACAO_ETIQUETA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save ModalidadeAcaoEtiqueta
 */
export class SaveModalidadeAcaoEtiqueta implements Action
{
    readonly type = SAVE_MODALIDADE_ACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ModalidadeAcaoEtiqueta
 */
export class UpdateModalidadeAcaoEtiqueta implements Action
{
    readonly type = UPDATE_MODALIDADE_ACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save ModalidadeAcaoEtiqueta Success
 */
export class SaveModalidadeAcaoEtiquetaSuccess implements Action
{
    readonly type = SAVE_MODALIDADE_ACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save ModalidadeAcaoEtiqueta Failed
 */
export class SaveModalidadeAcaoEtiquetaFailed implements Action
{
    readonly type = SAVE_MODALIDADE_ACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ModalidadeAcaoEtiqueta Success
 */
export class UpdateModalidadeAcaoEtiquetaSuccess implements Action
{
    readonly type = UPDATE_MODALIDADE_ACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ModalidadeAcaoEtiqueta Failed
 */
export class UpdateModalidadeAcaoEtiquetaFailed implements Action
{
    readonly type = UPDATE_MODALIDADE_ACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create ModalidadeAcaoEtiqueta
 */
export class CreateModalidadeAcaoEtiqueta implements Action
{
    readonly type = CREATE_MODALIDADE_ACAO_ETIQUETA;

    constructor()
    {
    }
}

/**
 * Create ModalidadeAcaoEtiqueta Success
 */
export class CreateModalidadeAcaoEtiquetaSuccess implements Action
{
    readonly type = CREATE_MODALIDADE_ACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Colaborador
 */
export class SaveColaborador implements Action
{
    readonly type = SAVE_COLABORADOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Colaborador Success
 */
export class SaveColaboradorSuccess implements Action
{
    readonly type = SAVE_COLABORADOR_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Colaborador Failed
 */
export class SaveColaboradorFailed implements Action
{
    readonly type = SAVE_COLABORADOR_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ModalidadeAcaoEtiquetaEditActionsAll
    = CreateModalidadeAcaoEtiqueta
    | CreateModalidadeAcaoEtiquetaSuccess
    | GetModalidadeAcaoEtiqueta
    | GetModalidadeAcaoEtiquetaSuccess
    | GetModalidadeAcaoEtiquetaFailed
    | SaveModalidadeAcaoEtiqueta
    | SaveModalidadeAcaoEtiquetaSuccess
    | SaveModalidadeAcaoEtiquetaFailed
    | UpdateModalidadeAcaoEtiqueta
    | UpdateModalidadeAcaoEtiquetaSuccess
    | UpdateModalidadeAcaoEtiquetaFailed
    | SaveColaborador
    | SaveColaboradorSuccess
    | SaveColaboradorFailed;
