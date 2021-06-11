import {Action} from '@ngrx/store';

export const GET_MODALIDADE_ACAO_ETIQUETA = '[SUPERADMIN ESPECIE PROCESSO LIST] GET MODALIDADE_ACAO_ETIQUETA';
export const GET_MODALIDADE_ACAO_ETIQUETA_SUCCESS = '[SUPERADMIN ESPECIE PROCESSO LIST] GET MODALIDADE_ACAO_ETIQUETA SUCCESS';
export const GET_MODALIDADE_ACAO_ETIQUETA_FAILED = '[SUPERADMIN ESPECIE PROCESSO LIST] GET MODALIDADE_ACAO_ETIQUETA FAILED';

export const RELOAD_MODALIDADE_ACAO_ETIQUETA = '[SUPERADMIN ESPECIE PROCESSO LIST] RELOAD MODALIDADE_ACAO_ETIQUETA';

export const DELETE_MODALIDADE_ACAO_ETIQUETA = '[SUPERADMIN ESPECIE PROCESSO LIST] DELETE MODALIDADE_ACAO_ETIQUETA';
export const DELETE_MODALIDADE_ACAO_ETIQUETA_SUCCESS = '[SUPERADMIN ESPECIE PROCESSO LIST] DELETE MODALIDADE_ACAO_ETIQUETA SUCCESS';
export const DELETE_MODALIDADE_ACAO_ETIQUETA_FAILED = '[SUPERADMIN ESPECIE PROCESSO LIST] DELETE MODALIDADE_ACAO_ETIQUETA FAILED';

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
 * Reload ModalidadeAcaoEtiqueta
 */
export class ReloadModalidadeAcaoEtiqueta implements Action
{
    readonly type = RELOAD_MODALIDADE_ACAO_ETIQUETA;

    constructor()
    {
    }
}

/**
 * Delete ModalidadeAcaoEtiqueta
 */
export class DeleteModalidadeAcaoEtiqueta implements Action
{
    readonly type = DELETE_MODALIDADE_ACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete ModalidadeAcaoEtiqueta Success
 */
export class DeleteModalidadeAcaoEtiquetaSuccess implements Action
{
    readonly type = DELETE_MODALIDADE_ACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete ModalidadeAcaoEtiqueta Failed
 */
export class DeleteModalidadeAcaoEtiquetaFailed implements Action
{
    readonly type = DELETE_MODALIDADE_ACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ModalidadeAcaoEtiquetaListActionsAll
    = GetModalidadeAcaoEtiqueta
    | GetModalidadeAcaoEtiquetaSuccess
    | GetModalidadeAcaoEtiquetaFailed
    | ReloadModalidadeAcaoEtiqueta
    | DeleteModalidadeAcaoEtiqueta
    | DeleteModalidadeAcaoEtiquetaSuccess
    | DeleteModalidadeAcaoEtiquetaFailed;

