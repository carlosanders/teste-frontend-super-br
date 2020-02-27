import { Action } from '@ngrx/store';

export const GET_SETORES = '[ADMIN SETORLIST] GET SETORES';
export const GET_SETORES_SUCCESS = '[ADMIN SETORLIST] GET SETORES SUCCESS';
export const GET_SETORES_FAILED = '[ADMIN SETORLIST] GET SETORES FAILED';

export const RELOAD_SETORES = '[ADMIN SETORLIST] RELOAD SETORES';

export const DELETE_SETOR= '[ADMIN SETORLIST] DELETE SETOR';
export const DELETE_SETOR_SUCCESS = '[ADMIN SETORLIST] DELETE SETOR SUCCESS';
export const DELETE_SETOR_FAILED = '[ADMIN SETORLIST] DELETE SETOR FAILED';

export const SAVE_SETOR= '[ADMIN SETOR] SAVE SETOR';
export const SAVE_SETOR_SUCCESS = '[ADMIN SETOR] SAVE SETOR SUCCESS';
export const SAVE_SETOR_FAILED = '[ADMIN SETOR] SAVE SETOR FAILED';

/**
 * Save Setor
 */
export class SaveSetor implements Action
{
    readonly type = SAVE_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Setor Success
 */
export class SaveSetorSuccess implements Action
{
    readonly type = SAVE_SETOR_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Setor Failed
 */
export class SaveSetorFailed implements Action
{
    readonly type = SAVE_SETOR_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Setores
 */
export class GetSetores implements Action
{
    readonly type = GET_SETORES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Setores Success
 */
export class GetSetoresSuccess implements Action
{
    readonly type = GET_SETORES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Setores Failed
 */
export class GetSetoresFailed implements Action
{
    readonly type = GET_SETORES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Setores
 */
export class ReloadSetores implements Action
{
    readonly type = RELOAD_SETORES;

    constructor()
    {
    }
}

/**
 * Delete Setor
 */
export class DeleteSetor implements Action
{
    readonly type = DELETE_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Setor Success
 */
export class DeleteSetorSuccess implements Action
{
    readonly type = DELETE_SETOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Setor Failed
 */
export class DeleteSetorFailed implements Action
{
    readonly type = DELETE_SETOR_FAILED;

    constructor(public payload: any)
    {
    }
}

export type SetorListActionsAll
    = GetSetores
    | GetSetoresSuccess
    | GetSetoresFailed
    | SaveSetor
    | SaveSetorSuccess
    | SaveSetorFailed
    | ReloadSetores
    | DeleteSetor
    | DeleteSetorSuccess
    | DeleteSetorFailed;

