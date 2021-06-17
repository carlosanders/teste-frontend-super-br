import {Action} from '@ngrx/store';

export const CREATE_VINCULACAO_ETIQUETA = '[VINCULACAO ETIQUETA CREATE BLOCO] CREATE VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[VINCULACAO ETIQUETA CREATE BLOCO] CREATE VINCULACAO ETIQUETA SUCCESS';

export const SAVE_VINCULACAO_ETIQUETA = '[VINCULACAO ETIQUETA CREATE BLOCO] SAVE VINCULACAO ETIQUETA';
export const SAVE_VINCULACAO_ETIQUETA_SUCCESS = '[VINCULACAO ETIQUETA CREATE BLOCO] SAVE VINCULACAO ETIQUETA SUCCESS';
export const SAVE_VINCULACAO_ETIQUETA_FAILED = '[VINCULACAO ETIQUETA CREATE BLOCO] SAVE VINCULACAO ETIQUETA FAILED';

/**
 * Save Vinculacao Etiqueta
 */
export class SaveVinculacaoEtiqueta implements Action
{
    readonly type = SAVE_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Vinculacao Etiqueta Success
 */
export class SaveVinculacaoEtiquetaSuccess implements Action
{
    readonly type = SAVE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Vinculacao Etiqueta Failed
 */
export class SaveVinculacaoEtiquetaFailed implements Action
{
    readonly type = SAVE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta
 */
export class CreateVinculacaoEtiqueta implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta Success
 */
export class CreateVinculacaoEtiquetaSuccess implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor()
    {
    }
}

export type VinculacaoEtiquetaCreateBlocoActionsAll
    = CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | SaveVinculacaoEtiqueta
    | SaveVinculacaoEtiquetaSuccess
    | SaveVinculacaoEtiquetaFailed;
