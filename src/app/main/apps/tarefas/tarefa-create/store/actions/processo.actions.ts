import {Action} from '@ngrx/store';

export const GET_PROCESSO = '[TAREFA CREATE] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[TAREFA CREATE] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[TAREFA CREATE] GET PROCESSO FAILED';

export const UNLOAD_PROCESSO = '[TAREFA CREATE] UNLOAD PROCESSO';

export const GET_VISIBILIDADES_PROCESSO_TAREFA = '[PROCESSO TAREFA VISIBILIDADE] GET VISIBILIDADES';
export const GET_VISIBILIDADES_PROCESSO_TAREFA_SUCCESS = '[PROCESSO TAREFA VISIBILIDADE] GET VISIBILIDADES SUCCESS';
export const GET_VISIBILIDADES_PROCESSO_TAREFA_FAILED = '[PROCESSO TAREFA VISIBILIDADE] GET VISIBILIDADES FAILED';

/**
 * Get Processo
 */
export class GetProcesso implements Action
{
    readonly type = GET_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Processo
 */
export class UnloadProcesso implements Action
{
    readonly type = UNLOAD_PROCESSO;

    constructor()
    {
    }
}

/**
 * Get Processo Success
 */
export class GetProcessoSuccess implements Action
{
    readonly type = GET_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Failed
 */
export class GetProcessoFailed implements Action
{
    readonly type = GET_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Get Visibilidades
 */
export class GetVisibilidades implements Action
{
    readonly type = GET_VISIBILIDADES_PROCESSO_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidades Success
 */
export class GetVisibilidadesSuccess implements Action
{
    readonly type = GET_VISIBILIDADES_PROCESSO_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidades Failed
 */
export class GetVisibilidadesFailed implements Action
{
    readonly type = GET_VISIBILIDADES_PROCESSO_TAREFA_FAILED;

    constructor(public payload: string)
    {
    }
}

export type ProcessoActionsAll
    = GetProcesso
    | UnloadProcesso
    | GetProcessoSuccess
    | GetProcessoFailed
    | GetVisibilidades
    | GetVisibilidadesSuccess
    | GetVisibilidadesFailed;
