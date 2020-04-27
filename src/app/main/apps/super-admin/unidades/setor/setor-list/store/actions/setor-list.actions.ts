import { Action } from '@ngrx/store';

export const GET_SETORES = '[SUPER-ADMIN SETOR LIST] GET SETORES';
export const GET_SETORES_SUCCESS = '[SUPER-ADMIN SETOR LIST] GET SETORES SUCCESS';
export const GET_SETORES_FAILED = '[SUPER-ADMIN SETOR LIST] GET SETORES FAILED';

export const RELOAD_SETORES = '[SUPER-ADMIN SETOR LIST] RELOAD SETORES';

export const DELETE_SETOR= '[SUPER-ADMIN SETOR LIST] DELETE SETOR';
export const DELETE_SETOR_SUCCESS = '[SUPER-ADMIN SETOR LIST] DELETE SETOR SUCCESS';
export const DELETE_SETOR_FAILED = '[SUPER-ADMIN SETOR LIST] DELETE SETOR FAILED';

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
    | ReloadSetores
    | DeleteSetor
    | DeleteSetorSuccess
    | DeleteSetorFailed;

