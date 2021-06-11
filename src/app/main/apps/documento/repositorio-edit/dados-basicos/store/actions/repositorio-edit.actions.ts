import {Action} from '@ngrx/store';

export const SAVE_REPOSITORIO = '[DOCUMENTO EDIT REPOSITORIO] SAVE REPOSITORIO';
export const SAVE_REPOSITORIO_SUCCESS = '[DOCUMENTO EDIT REPOSITORIO] SAVE REPOSITORIO SUCCESS';
export const SAVE_REPOSITORIO_FAILED = '[DOCUMENTO EDIT REPOSITORIO] SAVE REPOSITORIO FAILED';

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

export type RepositorioEditActionsAll
    = SaveRepositorio
    | SaveRepositorioSuccess
    | SaveRepositorioFailed;
