import {Action} from '@ngrx/store';

export const SAVE_MODELO = '[DOCUMENTO EDIT MODELO] SAVE MODELO';
export const SAVE_MODELO_SUCCESS = '[DOCUMENTO EDIT MODELO] SAVE MODELO SUCCESS';
export const SAVE_MODELO_FAILED = '[DOCUMENTO EDIT MODELO] SAVE MODELO FAILED';

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

export type ModeloEditActionsAll
    = SaveModelo
    | SaveModeloSuccess
    | SaveModeloFailed;
