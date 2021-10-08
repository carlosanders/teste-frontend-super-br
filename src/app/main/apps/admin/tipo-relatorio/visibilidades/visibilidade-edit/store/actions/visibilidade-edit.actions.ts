import {Action} from '@ngrx/store';

export const CREATE_VISIBILIDADE_TIPO_RELATORIO = '[VISIBILIDADE TIPO RELATORIO] CREATE VISIBILIDADE';
export const CREATE_VISIBILIDADE_TIPO_RELATORIO_SUCCESS = '[VISIBILIDADE TIPO RELATORIO] CREATE VISIBILIDADE SUCCESS';

export const SAVE_VISIBILIDADE_TIPO_RELATORIO = '[VISIBILIDADE TIPO RELATORIO] SAVE VISIBILIDADE';
export const SAVE_VISIBILIDADE_TIPO_RELATORIO_SUCCESS = '[VISIBILIDADE TIPO RELATORIO] SAVE VISIBILIDADE SUCCESS';
export const SAVE_VISIBILIDADE_TIPO_RELATORIO_FAILED = '[VISIBILIDADE TIPO RELATORIO] SAVE VISIBILIDADE FAILED';

export const GET_VISIBILIDADE_TIPO_RELATORIO = '[VISIBILIDADE TIPO RELATORIO] GET VISIBILIDADE';
export const GET_VISIBILIDADE_TIPO_RELATORIO_SUCCESS = '[VISIBILIDADE TIPO RELATORIO] GET VISIBILIDADE SUCCESS';
export const GET_VISIBILIDADE_TIPO_RELATORIO_FAILED = '[VISIBILIDADE TIPO RELATORIO] GET VISIBILIDADE FAILED';

export const UNLOAD_STORE = '[VISIBILIDADE-EDIT] UNLOAD STORE';

/**
 * Get Visibilidade
 */
export class GetVisibilidade implements Action
{
    readonly type = GET_VISIBILIDADE_TIPO_RELATORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidade Success
 */
export class GetVisibilidadeSuccess implements Action
{
    readonly type = GET_VISIBILIDADE_TIPO_RELATORIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidade Failed
 */
export class GetVisibilidadeFailed implements Action
{
    readonly type = GET_VISIBILIDADE_TIPO_RELATORIO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Visibilidade
 */
export class SaveVisibilidade implements Action
{
    readonly type = SAVE_VISIBILIDADE_TIPO_RELATORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Visibilidade Success
 */
export class SaveVisibilidadeSuccess implements Action
{
    readonly type = SAVE_VISIBILIDADE_TIPO_RELATORIO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Visibilidade Failed
 */
export class SaveVisibilidadeFailed implements Action
{
    readonly type = SAVE_VISIBILIDADE_TIPO_RELATORIO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Visibilidade
 */
export class CreateVisibilidade implements Action
{
    readonly type = CREATE_VISIBILIDADE_TIPO_RELATORIO;

    constructor()
    {
    }
}

/**
 * Create Visibilidade Success
 */
export class CreateVisibilidadeSuccess implements Action
{
    readonly type = CREATE_VISIBILIDADE_TIPO_RELATORIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Store
 */
export class UnloadStore implements Action
{
    readonly type = UNLOAD_STORE;

    constructor()
    {
    }
}

export type VisibilidadeEditActionsAll
    = CreateVisibilidade
    | CreateVisibilidadeSuccess
    | GetVisibilidade
    | GetVisibilidadeSuccess
    | GetVisibilidadeFailed
    | SaveVisibilidade
    | SaveVisibilidadeSuccess
    | SaveVisibilidadeFailed
    | UnloadStore;
