import {Action} from '@ngrx/store';

export const GET_UNIDADES = '[COORDENADOR UNIDADES LIST] GET UNIDADES';
export const GET_UNIDADES_SUCCESS = '[COORDENADOR UNIDADES LIST] GET UNIDADES SUCCESS';
export const GET_UNIDADES_FAILED = '[COORDENADOR UNIDADES LIST] GET UNIDADES FAILED';

export const RELOAD_UNIDADES = '[COORDENADOR UNIDADES LIST] RELOAD UNIDADES';
export const UNLOAD_UNIDADES = '[COORDENADOR UNIDADES LIST] UNLOAD UNIDADES';


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
 * Unload Unidades
 */
 export class UnloadUnidades implements Action
 {
     readonly type = UNLOAD_UNIDADES;

     constructor()
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


export type UnidadesOrgaoCentralListActionsAll
    = GetUnidades
    | GetUnidadesSuccess
    | GetUnidadesFailed
    | UnloadUnidades
    | ReloadUnidades;

