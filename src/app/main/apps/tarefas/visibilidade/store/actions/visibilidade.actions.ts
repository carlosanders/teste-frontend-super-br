import {Action} from '@ngrx/store';

export const GET_VISIBILIDADES_PROCESSO = '[PROCESSO VISIBILIDADE] GET VISIBILIDADES';
export const GET_VISIBILIDADES_PROCESSO_SUCCESS = '[PROCESSO VISIBILIDADE] GET VISIBILIDADES SUCCESS';
export const GET_VISIBILIDADES_PROCESSO_FAILED = '[PROCESSO VISIBILIDADE] GET VISIBILIDADES FAILED';

export const RELOAD_VISIBILIDADES_PROCESSO = '[PROCESSO VISIBILIDADE] RELOAD VISIBILIDADES';

export const DELETE_VISIBILIDADE_PROCESSO = '[PROCESSO VISIBILIDADE] DELETE VISIBILIDADE';
export const DELETE_VISIBILIDADE_PROCESSO_SUCCESS = '[PROCESSO VISIBILIDADE] DELETE VISIBILIDADE SUCCESS';
export const DELETE_VISIBILIDADE_PROCESSO_FAILED = '[PROCESSO VISIBILIDADE] DELETE VISIBILIDADE FAILED';

export const GET_VISIBILIDADE_PROCESSO = '[PROCESSO VISIBILIDADE] GET VISIBILIDADE';
export const GET_VISIBILIDADE_PROCESSO_SUCCESS = '[PROCESSO VISIBILIDADE] GET VISIBILIDADE SUCCESS';
export const GET_VISIBILIDADE_PROCESSO_FAILED = '[PROCESSO VISIBILIDADE] GET VISIBILIDADE FAILED';

export const SAVE_VISIBILIDADE_PROCESSO = '[PROCESSO VISIBILIDADE] SAVE PROCESSO VISIBILIDADE';
export const SAVE_VISIBILIDADE_PROCESSO_SUCCESS = '[PROCESSO VISIBILIDADE] SAVE VISIBILIDADE PROCESSO SUCCESS';
export const SAVE_VISIBILIDADE_PROCESSO_FAILED = '[PROCESSO VISIBILIDADE] SAVE VISIBILIDADE PROCESSO FAILED';

/**
 * Get Visibilidades
 */
export class GetVisibilidades implements Action
{
    readonly type = GET_VISIBILIDADES_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidades Success
 */
export class GetVisibilidadesSuccess implements Action
{
    readonly type = GET_VISIBILIDADES_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidades Failed
 */
export class GetVisibilidadesFailed implements Action
{
    readonly type = GET_VISIBILIDADES_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Visibilidades
 */
export class ReloadVisibilidades implements Action
{
    readonly type = RELOAD_VISIBILIDADES_PROCESSO;

    constructor()
    {
    }
}

/**
 * Delete Visibilidade
 */
export class DeleteVisibilidade implements Action
{
    readonly type = DELETE_VISIBILIDADE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Visibilidade Success
 */
export class DeleteVisibilidadeSuccess implements Action
{
    readonly type = DELETE_VISIBILIDADE_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Visibilidade Failed
 */
export class DeleteVisibilidadeFailed implements Action
{
    readonly type = DELETE_VISIBILIDADE_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Get Visibilidade
 */
export class GetVisibilidade implements Action
{
    readonly type = GET_VISIBILIDADE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidade Success
 */
export class GetVisibilidadeSuccess implements Action
{
    readonly type = GET_VISIBILIDADE_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidade Failed
 */
export class GetVisibilidadeFailed implements Action
{
    readonly type = GET_VISIBILIDADE_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }
}


/**
 * Save VisibilidadeProcesso
 */
export class SaveVisibilidadeProcesso implements Action
{
    readonly type = SAVE_VISIBILIDADE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Visibilidade Success
 */
export class SaveVisibilidadeProcessoSuccess implements Action
{
    readonly type = SAVE_VISIBILIDADE_PROCESSO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Visibilidade Failed
 */
export class SaveVisibilidadeProcessoFailed implements Action
{
    readonly type = SAVE_VISIBILIDADE_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type VisibilidadeActionsAll
    = GetVisibilidades
    | GetVisibilidadesSuccess
    | GetVisibilidadesFailed
    | GetVisibilidade
    | GetVisibilidadeSuccess
    | GetVisibilidadeFailed
    | ReloadVisibilidades
    | DeleteVisibilidade
    | DeleteVisibilidadeSuccess
    | DeleteVisibilidadeFailed
    | SaveVisibilidadeProcesso
    | SaveVisibilidadeProcessoSuccess
    | SaveVisibilidadeProcessoFailed;

