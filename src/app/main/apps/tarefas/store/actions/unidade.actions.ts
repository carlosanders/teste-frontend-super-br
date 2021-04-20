import {Action} from '@ngrx/store';

export const GET_UNIDADES = '[TAREFAS COORDENADORES LIST] GET UNIDADES';
export const GET_UNIDADES_SUCCESS = '[TAREFAS COORDENADORES LIST] GET UNIDADES SUCCESS';
export const GET_UNIDADES_FAILED = '[TAREFAS COORDENADORES LIST] GET UNIDADES FAILED';

export const UNLOAD_UNIDADES = '[TAREFAS COORDENADORES LIST] UNLOAD UNIDADES';

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

export type RootUnidadeActionsAll
    = GetUnidades
    | GetUnidadesSuccess
    | GetUnidadesFailed
    | UnloadUnidades;
