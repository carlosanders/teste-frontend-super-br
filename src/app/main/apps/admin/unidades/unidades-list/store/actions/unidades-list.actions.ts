import { Action } from '@ngrx/store';

export const GET_UNIDADES = '[ADMIN UNIDADES LIST] GET UNIDADES';
export const GET_UNIDADES_SUCCESS = '[ADMIN UNIDADES LIST] GET UNIDADES SUCCESS';
export const GET_UNIDADES_FAILED = '[ADMIN UNIDADES LIST] GET UNIDADES FAILED';

export const RELOAD_UNIDADES = '[ADMIN UNIDADES LIST] RELOAD UNIDADES';

/**
 * Get Unidades
 */
export class GetUnidades implements Action
{
    readonly type = GET_UNIDADES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Unidades Success
 */
export class GetUnidadesSuccess implements Action
{
    readonly type = GET_UNIDADES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Unidades Failed
 */
export class GetUnidadesFailed implements Action
{
    readonly type = GET_UNIDADES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Unidades
 */
export class ReloadUnidades implements Action
{
    readonly type = RELOAD_UNIDADES;

    constructor()
    {
    }
}


export type UnidadesListActionsAll
    = GetUnidades
    | GetUnidadesSuccess
    | GetUnidadesFailed
    | ReloadUnidades;

