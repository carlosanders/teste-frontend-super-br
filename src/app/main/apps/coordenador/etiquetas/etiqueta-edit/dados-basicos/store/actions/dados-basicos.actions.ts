import { Action } from '@ngrx/store';

export const SAVE_ETIQUETA = '[ETIQUETA] SAVE COORDENADOR ETIQUETA';
export const SAVE_ETIQUETA_SUCCESS = '[ETIQUETA] SAVE ETIQUETA COORDENADOR SUCCESS';
export const SAVE_ETIQUETA_FAILED = '[ETIQUETA] SAVE ETIQUETA COORDENADOR FAILED';

/**
 * Save Etiqueta
 */
export class SaveEtiqueta implements Action
{
    readonly type = SAVE_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Etiqueta Success
 */
export class SaveEtiquetaSuccess implements Action
{
    readonly type = SAVE_ETIQUETA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Etiqueta Failed
 */
export class SaveEtiquetaFailed implements Action
{
    readonly type = SAVE_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type EtiquetaEditActionsAll
    = SaveEtiqueta
    | SaveEtiquetaSuccess
    | SaveEtiquetaFailed;
