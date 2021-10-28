import {Action} from '@ngrx/store';

export const GET_VISIBILIDADES = '[CLASSIFICACAO VISIBILIDADE LIST] GET VISIBILIDADES';
export const GET_VISIBILIDADES_SUCCESS = '[CLASSIFICACAO VISIBILIDADE LIST] GET VISIBILIDADES SUCCESS';
export const GET_VISIBILIDADES_FAILED = '[CLASSIFICACAO VISIBILIDADE LIST] GET VISIBILIDADES FAILED';

export const RELOAD_VISIBILIDADES = '[CLASSIFICACAO VISIBILIDADE LIST] RELOAD VISIBILIDADES';

export const DELETE_VISIBILIDADE = '[CLASSIFICACAO VISIBILIDADE LIST] DELETE VISIBILIDADE';
export const DELETE_VISIBILIDADE_SUCCESS = '[CLASSIFICACAO VISIBILIDADE LIST] DELETE VISIBILIDADE SUCCESS';
export const DELETE_VISIBILIDADE_FAILED = '[CLASSIFICACAO VISIBILIDADE LIST] DELETE VISIBILIDADE FAILED';

/**
 * Get Visibilidades
 */
export class GetVisibilidades implements Action
{
    readonly type = GET_VISIBILIDADES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidades Success
 */
export class GetVisibilidadesSuccess implements Action
{
    readonly type = GET_VISIBILIDADES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidades Failed
 */
export class GetVisibilidadesFailed implements Action
{
    readonly type = GET_VISIBILIDADES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Visibilidades
 */
export class ReloadVisibilidades implements Action
{
    readonly type = RELOAD_VISIBILIDADES;

    constructor()
    {
    }
}

/**
 * Delete Visibilidade
 */
export class DeleteVisibilidade implements Action
{
    readonly type = DELETE_VISIBILIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Visibilidade Success
 */
export class DeleteVisibilidadeSuccess implements Action
{
    readonly type = DELETE_VISIBILIDADE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Visibilidade Failed
 */
export class DeleteVisibilidadeFailed implements Action
{
    readonly type = DELETE_VISIBILIDADE_FAILED;

    constructor(public payload: any)
    {
    }
}

export type VisibilidadeListActionsAll
    = GetVisibilidades
    | GetVisibilidadesSuccess
    | GetVisibilidadesFailed
    | ReloadVisibilidades
    | DeleteVisibilidade
    | DeleteVisibilidadeSuccess
    | DeleteVisibilidadeFailed;

