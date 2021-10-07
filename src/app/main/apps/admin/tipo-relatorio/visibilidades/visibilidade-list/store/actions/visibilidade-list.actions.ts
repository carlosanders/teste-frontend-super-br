import {Action} from '@ngrx/store';

export const GET_TIPO_RELATORIO_VISIBILIDADES = '[TIPO RELATORIO VISIBILIDADE LIST] GET TIPO RELATORIO VISIBILIDADES';
export const GET_TIPO_RELATORIO_VISIBILIDADES_SUCCESS = '[TIPO RELATORIO VISIBILIDADE LIST] GET TIPO RELATORIO VISIBILIDADES SUCCESS';
export const GET_TIPO_RELATORIO_VISIBILIDADES_FAILED = '[TIPO RELATORIO VISIBILIDADE LIST] GET TIPO RELATORIO VISIBILIDADES FAILED';

export const RELOAD_TIPO_RELATORIO_VISIBILIDADES = '[TIPO RELATORIO VISIBILIDADE LIST] RELOAD TIPO RELATORIO VISIBILIDADES';

export const DELETE_TIPO_RELATORIO_VISIBILIDADE = '[TIPO RELATORIO VISIBILIDADE LIST] DELETE TIPO RELATORIO VISIBILIDADE';
export const DELETE_TIPO_RELATORIO_VISIBILIDADE_SUCCESS = '[TIPO RELATORIO VISIBILIDADE LIST] DELETE TIPO RELATORIO VISIBILIDADE SUCCESS';
export const DELETE_TIPO_RELATORIO_VISIBILIDADE_FAILED = '[TIPO RELATORIO VISIBILIDADE LIST] DELETE TIPO RELATORIO VISIBILIDADE FAILED';

/**
 * Get Visibilidades
 */
export class GetVisibilidades implements Action
{
    readonly type = GET_TIPO_RELATORIO_VISIBILIDADES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidades Success
 */
export class GetVisibilidadesSuccess implements Action
{
    readonly type = GET_TIPO_RELATORIO_VISIBILIDADES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidades Failed
 */
export class GetVisibilidadesFailed implements Action
{
    readonly type = GET_TIPO_RELATORIO_VISIBILIDADES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Visibilidades
 */
export class ReloadVisibilidades implements Action
{
    readonly type = RELOAD_TIPO_RELATORIO_VISIBILIDADES;

    constructor()
    {
    }
}

/**
 * Delete Visibilidade
 */
export class DeleteVisibilidade implements Action
{
    readonly type = DELETE_TIPO_RELATORIO_VISIBILIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Visibilidade Success
 */
export class DeleteVisibilidadeSuccess implements Action
{
    readonly type = DELETE_TIPO_RELATORIO_VISIBILIDADE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Visibilidade Failed
 */
export class DeleteVisibilidadeFailed implements Action
{
    readonly type = DELETE_TIPO_RELATORIO_VISIBILIDADE_FAILED;

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

