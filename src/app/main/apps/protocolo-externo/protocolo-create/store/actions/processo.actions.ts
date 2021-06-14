import {Action} from '@ngrx/store';

export const GET_PROCESSO = '[PROTOCOLO CREATE] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[PROTOCOLO CREATE] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[PROTOCOLO CREATE] GET PROCESSO FAILED';

export const GET_VISIBILIDADES_PROCESSO_TAREFA = '[PROTOCOLO VISIBILIDADE] GET VISIBILIDADES';
export const GET_VISIBILIDADES_PROCESSO_TAREFA_SUCCESS = '[PROTOCOLO VISIBILIDADE] GET VISIBILIDADES SUCCESS';
export const GET_VISIBILIDADES_PROCESSO_TAREFA_FAILED = '[PROTOCOLO VISIBILIDADE] GET VISIBILIDADES FAILED';

export const UNLOAD_PROCESSO = '[PROTOCOLO CREATE] UNLOAD PROCESSO';

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

export type ProcessoActionsAll
    = GetProcesso
    | GetProcessoSuccess
    | GetProcessoFailed
    | GetVisibilidades
    | GetVisibilidadesSuccess
    | GetVisibilidadesFailed
    | UnloadProcesso;
